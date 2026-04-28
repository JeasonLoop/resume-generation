import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { MiddlewareHandler } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { and, count, desc, eq, inArray, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { resumes, resumeVersions, templates, tokenBlacklist, users, verificationCodes } from "./db/schema";

type Variables = {
  user: {
    id: number;
    email: string;
    name: string;
    isPremium: boolean;
    avatarUrl: string | null;
  };
};

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  NODE_ENV?: string;
  ALLOWED_ORIGINS?: string;
  SILICONFLOW_API_KEY?: string;
  OPENAI_API_KEY?: string;
};

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const ErrorCode = {
  SUCCESS: 0,
  BAD_REQUEST: 10001,
  UNAUTHORIZED: 10002,
  NOT_FOUND: 10004,
  VALIDATION_ERROR: 10005,
  USER_EXISTS: 20001,
  INVALID_CREDENTIALS: 20002,
  TOKEN_EXPIRED: 20003,
  TOKEN_INVALID: 20004,
  FORBIDDEN: 10003,
  THIRD_PARTY_ERROR: 50002,
  TOO_MANY_REQUESTS: 10006,
  USER_NOT_FOUND: 20005,
  INTERNAL_ERROR: 50000,
} as const;

const DEFAULT_BASE_URL = "https://api.siliconflow.cn/v1";
const DEFAULT_MODEL = "THUDM/GLM-Z1-9B-0414";
const FREE_USAGE_LIMIT = 20;
const MAX_CONTENT_LEN = 5000;

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("/api/*", async (c, next) => {
  const allowedOrigins = c.env.ALLOWED_ORIGINS
    ? c.env.ALLOWED_ORIGINS.split(",").map((item) => item.trim())
    : ["http://localhost:5173", "http://localhost:3000"];

  return cors({
    origin: (origin) => {
      if (!origin) {
        return allowedOrigins[0] ?? "*";
      }
      return allowedOrigins.includes(origin) ? origin : "";
    },
    credentials: true,
  })(c, next);
});

const success = (data: unknown = null, message = "操作成功") => {
  return { code: ErrorCode.SUCCESS, message, data };
};

const fail = (code: number, message: string, data: unknown = null) => {
  return { code, message, data };
};

const getDb = (c: { env: Bindings }) => drizzle(c.env.DB);
const isValidApiKey = (key?: string | null) => Boolean(key && key.length >= 20 && !key.startsWith("your_"));
const randomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const auth: MiddlewareHandler<{ Bindings: Bindings; Variables: Variables }> = async (c, next) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return c.json(fail(ErrorCode.UNAUTHORIZED, "未提供认证 Token"));
  }

  try {
    const db = getDb(c);
    const blacklisted = await db
      .select({ id: tokenBlacklist.id })
      .from(tokenBlacklist)
      .where(
        and(
          eq(tokenBlacklist.token, token),
          sql`datetime(${tokenBlacklist.expiresAt}) > datetime('now')`,
        ),
      )
      .limit(1);

    if (blacklisted.length > 0) {
      return c.json(fail(ErrorCode.TOKEN_INVALID, "Token 已失效"));
    }

    const decoded = jwt.verify(token, c.env.JWT_SECRET) as { id: number; email: string };
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        isPremium: users.isPremium,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, decoded.id))
      .limit(1);

    if (!user) {
      return c.json(fail(ErrorCode.TOKEN_INVALID, "用户不存在"));
    }

    c.set("user", user);
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return c.json(fail(ErrorCode.TOKEN_EXPIRED, "Token 已过期"));
    }
    return c.json(fail(ErrorCode.TOKEN_INVALID, "Token 无效"));
  }
};

app.get("/api/health", (c) => {
  return c.json(success({ status: "ok", timestamp: new Date().toISOString() }));
});

app.get("/api/templates", async (c) => {
  const db = getDb(c);
  const list = await db.select().from(templates).orderBy(templates.id);
  return c.json(success(list));
});

app.get("/api/templates/:id", async (c) => {
  const db = getDb(c);
  const id = Number(c.req.param("id"));
  const [item] = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
  if (!item) {
    return c.json(fail(ErrorCode.NOT_FOUND, "模板不存在"));
  }
  return c.json(success(item));
});

app.post("/api/auth/register", async (c) => {
  const db = getDb(c);
  const body: { email?: string; password?: string; name?: string } =
    await c.req.json<{ email?: string; password?: string; name?: string }>().catch(() => ({}));
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  const name = body.name?.trim() ?? "";

  if (!email || !password || !name) {
    return c.json(fail(ErrorCode.BAD_REQUEST, "请提供邮箱、密码和昵称"));
  }
  if (password.length < 6 || password.length > 64) {
    return c.json(fail(ErrorCode.VALIDATION_ERROR, "密码长度需为 6-64 位"));
  }

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    return c.json(fail(ErrorCode.USER_EXISTS, "用户已存在"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const inserted = await db
    .insert(users)
    .values({
      email,
      passwordHash: hashedPassword,
      name,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      isPremium: users.isPremium,
      avatarUrl: users.avatarUrl,
    });

  const user = inserted[0];
  const accessToken = jwt.sign({ id: user.id, email: user.email }, c.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user.id, email: user.email, type: "refresh" }, c.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  setCookie(c, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/api/auth/refresh",
  });

  return c.json(success({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      is_premium: user.isPremium,
      avatar_url: user.avatarUrl,
    },
    access_token: accessToken,
    expires_in: 15 * 60,
  }, "用户注册成功"));
});

app.post("/api/auth/login", async (c) => {
  const db = getDb(c);
  const body: { email?: string; password?: string } =
    await c.req.json<{ email?: string; password?: string }>().catch(() => ({}));
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return c.json(fail(ErrorCode.BAD_REQUEST, "请提供邮箱和密码"));
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return c.json(fail(ErrorCode.INVALID_CREDENTIALS, "凭证无效"));
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return c.json(fail(ErrorCode.INVALID_CREDENTIALS, "凭证无效"));
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, c.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user.id, email: user.email, type: "refresh" }, c.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  setCookie(c, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/api/auth/refresh",
  });

  return c.json(success({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      is_premium: user.isPremium,
      avatar_url: user.avatarUrl,
    },
    access_token: accessToken,
    expires_in: 15 * 60,
  }, "登录成功"));
});

app.post("/api/auth/refresh", async (c) => {
  const refreshToken = getCookie(c, "refresh_token");
  if (!refreshToken) {
    return c.json(fail(ErrorCode.UNAUTHORIZED, "Refresh Token不存在"));
  }

  try {
    const decoded = jwt.verify(refreshToken, c.env.JWT_SECRET) as { id: number; type?: string; email: string };
    if (decoded.type !== "refresh") {
      return c.json(fail(ErrorCode.TOKEN_INVALID, "无效的Refresh Token"));
    }

    const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, c.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    return c.json(success({
      access_token: accessToken,
      expires_in: 15 * 60,
    }));
  } catch (error) {
    deleteCookie(c, "refresh_token", { path: "/api/auth/refresh" });
    if (error instanceof jwt.TokenExpiredError) {
      return c.json(fail(ErrorCode.TOKEN_EXPIRED, "Refresh Token已过期，请重新登录"));
    }
    return c.json(fail(ErrorCode.TOKEN_INVALID, "无效的Refresh Token"));
  }
});

app.get("/api/auth/me", auth, async (c) => {
  const user = c.get("user");
  return c.json(success({
    id: user.id,
    email: user.email,
    name: user.name,
    is_premium: user.isPremium,
    avatar_url: user.avatarUrl,
  }));
});

app.post("/api/auth/logout", auth, async (c) => {
  const db = getDb(c);
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (token) {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (decoded?.exp) {
      await db.insert(tokenBlacklist).values({
        token,
        expiresAt: new Date(decoded.exp * 1000).toISOString(),
      }).onConflictDoUpdate({
        target: tokenBlacklist.token,
        set: { expiresAt: new Date(decoded.exp * 1000).toISOString() },
      });
    }
  }
  deleteCookie(c, "refresh_token", { path: "/api/auth/refresh" });
  return c.json(success(null, "退出登录成功"));
});

app.post("/api/auth/send-reset-code", async (c) => {
  const db = getDb(c);
  const body: { email?: string } = await c.req.json<{ email?: string }>().catch(() => ({}));
  const email = body.email?.trim() ?? "";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(email)) {
    return c.json(fail(ErrorCode.VALIDATION_ERROR, "请输入有效的邮箱地址"));
  }

  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (!user) {
    return c.json(fail(ErrorCode.USER_NOT_FOUND, "该邮箱未注册"));
  }

  const recent = await db.select({ id: verificationCodes.id })
    .from(verificationCodes)
    .where(and(
      eq(verificationCodes.email, email),
      eq(verificationCodes.type, "password_reset"),
      eq(verificationCodes.used, false),
      sql`datetime(${verificationCodes.createdAt}) > datetime('now', '-1 minute')`,
    ))
    .limit(1);
  if (recent.length > 0) {
    return c.json(fail(ErrorCode.TOO_MANY_REQUESTS, "验证码发送过于频繁，请1分钟后再试"));
  }

  await db.update(verificationCodes).set({ used: true })
    .where(and(
      eq(verificationCodes.email, email),
      eq(verificationCodes.type, "password_reset"),
      eq(verificationCodes.used, false),
      sql`datetime(${verificationCodes.expiresAt}) > datetime('now')`,
    ));

  const code = randomCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  await db.insert(verificationCodes).values({ email, code, type: "password_reset", expiresAt, used: false });

  // Workers 默认不内建 SMTP；若配置 RESEND_API_KEY 可接入邮件服务。当前先保留统一成功响应。
  console.log(`[password_reset_code] ${email}: ${code}`);
  return c.json(success(null, "验证码已发送到您的邮箱，请注意查收"));
});

app.post("/api/auth/reset-password", async (c) => {
  const db = getDb(c);
  const body: { email?: string; code?: string; new_password?: string } =
    await c.req.json<{ email?: string; code?: string; new_password?: string }>().catch(() => ({}));
  const email = body.email?.trim() ?? "";
  const code = body.code?.trim() ?? "";
  const newPassword = body.new_password ?? "";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRe.test(email)) return c.json(fail(ErrorCode.VALIDATION_ERROR, "请输入有效的邮箱地址"));
  if (!code || code.length !== 6) return c.json(fail(ErrorCode.VALIDATION_ERROR, "请输入有效的6位验证码"));
  if (!newPassword || newPassword.length < 6 || newPassword.length > 64) return c.json(fail(ErrorCode.VALIDATION_ERROR, "密码长度需为6-64位"));

  const [vc] = await db.select({ id: verificationCodes.id })
    .from(verificationCodes)
    .where(and(
      eq(verificationCodes.email, email),
      eq(verificationCodes.code, code),
      eq(verificationCodes.type, "password_reset"),
      eq(verificationCodes.used, false),
      sql`datetime(${verificationCodes.expiresAt}) > datetime('now')`,
    ))
    .limit(1);
  if (!vc) return c.json(fail(ErrorCode.VALIDATION_ERROR, "验证码无效或已过期"));

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.update(users).set({ passwordHash: hashed }).where(eq(users.email, email));
  await db.update(verificationCodes).set({ used: true }).where(eq(verificationCodes.id, vc.id));
  return c.json(success(null, "密码重置成功，请使用新密码登录"));
});

app.get("/api/resumes", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const page = Math.max(1, Number(c.req.query("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(c.req.query("limit") ?? 10)));
  const offset = (page - 1) * limit;

  const list = await db
    .select({
      id: resumes.id,
      user_id: resumes.userId,
      template_id: resumes.templateId,
      title: resumes.title,
      content_json: resumes.contentJson,
      content_markdown: resumes.contentMarkdown,
      is_public: resumes.isPublic,
      created_at: resumes.createdAt,
      updated_at: resumes.updatedAt,
    })
    .from(resumes)
    .where(eq(resumes.userId, user.id))
    .orderBy(desc(resumes.updatedAt))
    .limit(limit)
    .offset(offset);

  const [{ total }] = await db
    .select({ total: count() })
    .from(resumes)
    .where(eq(resumes.userId, user.id));

  return c.json(success({
    list: list.map((item) => ({
      ...item,
      content_json: (() => {
        try {
          return JSON.parse(item.content_json);
        } catch {
          return item.content_json;
        }
      })(),
    })),
    pagination: {
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    },
  }));
});

app.get("/api/resumes/:id", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const [resume] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)))
    .limit(1);

  if (!resume) {
    return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));
  }

  return c.json(success({
    ...resume,
    content_json: (() => {
      try {
        return JSON.parse(resume.contentJson);
      } catch {
        return resume.contentJson;
      }
    })(),
  }));
});

app.post("/api/resumes", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const body: {
    title?: string;
    template_id?: number | null;
    content_json?: unknown;
    content_markdown?: string | null;
    is_public?: boolean;
  } = await c.req.json<{
    title?: string;
    template_id?: number | null;
    content_json?: unknown;
    content_markdown?: string | null;
    is_public?: boolean;
  }>().catch(() => ({}));

  const title = body.title?.trim() ?? "";
  if (!title) {
    return c.json(fail(ErrorCode.VALIDATION_ERROR, "请提供简历标题"));
  }

  if (body.template_id) {
    const [template] = await db.select({ id: templates.id }).from(templates).where(eq(templates.id, body.template_id)).limit(1);
    if (!template) {
      return c.json(fail(ErrorCode.NOT_FOUND, "模板不存在"));
    }
  }

  const inserted = await db.insert(resumes).values({
    userId: user.id,
    title,
    templateId: body.template_id ?? null,
    contentJson: JSON.stringify(body.content_json ?? {}),
    contentMarkdown: body.content_markdown ?? null,
    isPublic: body.is_public ?? false,
  }).returning();

  return c.json(success(inserted[0], "简历创建成功"));
});

app.put("/api/resumes/:id", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));
  const body: {
    title?: string;
    template_id?: number | null;
    content_json?: unknown;
    content_markdown?: string | null;
    is_public?: boolean;
  } = await c.req.json<{
    title?: string;
    template_id?: number | null;
    content_json?: unknown;
    content_markdown?: string | null;
    is_public?: boolean;
  }>().catch(() => ({}));

  const [current] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)))
    .limit(1);

  if (!current) {
    return c.json(fail(ErrorCode.NOT_FOUND, "简历不存在"));
  }

  if (body.template_id) {
    const [template] = await db.select({ id: templates.id }).from(templates).where(eq(templates.id, body.template_id)).limit(1);
    if (!template) {
      return c.json(fail(ErrorCode.NOT_FOUND, "模板不存在"));
    }
  }

  await db.update(resumes).set({
    title: body.title?.trim() || current.title,
    templateId: body.template_id ?? current.templateId,
    contentJson: body.content_json !== undefined ? JSON.stringify(body.content_json) : current.contentJson,
    contentMarkdown: body.content_markdown !== undefined ? body.content_markdown : current.contentMarkdown,
    isPublic: body.is_public !== undefined ? body.is_public : current.isPublic,
    updatedAt: new Date().toISOString(),
  }).where(eq(resumes.id, id));

  const [updated] = await db.select().from(resumes).where(eq(resumes.id, id)).limit(1);
  return c.json(success(updated, "简历更新成功"));
});

app.delete("/api/resumes/:id", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const [exists] = await db.select({ id: resumes.id }).from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, user.id))).limit(1);
  if (!exists) {
    return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));
  }

  await db.delete(resumes).where(eq(resumes.id, id));
  return c.json(success(null, "简历删除成功"));
});

app.post("/api/resumes/batch-delete", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const body: { ids?: number[] } = await c.req.json<{ ids?: number[] }>().catch(() => ({}));
  const ids = body.ids ?? [];

  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 100) {
    return c.json(fail(ErrorCode.BAD_REQUEST, "未提供有效的简历ID"));
  }
  if (!ids.every((id) => Number.isInteger(id) && id > 0)) {
    return c.json(fail(ErrorCode.VALIDATION_ERROR, "ID 列表格式不正确"));
  }

  await db.delete(resumes).where(and(eq(resumes.userId, user.id), inArray(resumes.id, ids)));
  return c.json(success({ deletedCount: ids.length }, `成功删除 ${ids.length} 份简历`));
});

app.get("/api/resumes/:id/versions", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));
  const [resume] = await db.select({ id: resumes.id }).from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, user.id))).limit(1);
  if (!resume) return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));

  const versions = await db.select({
    id: resumeVersions.id,
    version_number: resumeVersions.versionNumber,
    title: resumeVersions.title,
    template_id: resumeVersions.templateId,
    created_at: resumeVersions.createdAt,
  }).from(resumeVersions).where(eq(resumeVersions.resumeId, id)).orderBy(desc(resumeVersions.versionNumber));
  return c.json(success(versions));
});

app.get("/api/resumes/:id/versions/:versionId", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));
  const versionId = Number(c.req.param("versionId"));
  const [resume] = await db.select({ id: resumes.id }).from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, user.id))).limit(1);
  if (!resume) return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));

  const [version] = await db.select().from(resumeVersions)
    .where(and(eq(resumeVersions.id, versionId), eq(resumeVersions.resumeId, id))).limit(1);
  if (!version) return c.json(fail(ErrorCode.NOT_FOUND, "未找到版本"));

  return c.json(success({
    ...version,
    content_json: (() => {
      try { return JSON.parse(version.contentJson); } catch { return version.contentJson; }
    })(),
  }));
});

app.post("/api/resumes/:id/versions/:versionId/restore", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));
  const versionId = Number(c.req.param("versionId"));
  const [resume] = await db.select().from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, user.id))).limit(1);
  if (!resume) return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));
  const [version] = await db.select().from(resumeVersions).where(and(eq(resumeVersions.id, versionId), eq(resumeVersions.resumeId, id))).limit(1);
  if (!version) return c.json(fail(ErrorCode.NOT_FOUND, "未找到版本"));

  const [{ maxVersion }] = await db.select({ maxVersion: sql<number>`coalesce(max(${resumeVersions.versionNumber}),0)` })
    .from(resumeVersions).where(eq(resumeVersions.resumeId, id));
  await db.insert(resumeVersions).values({
    resumeId: id,
    title: resume.title,
    contentMarkdown: resume.contentMarkdown,
    contentJson: resume.contentJson,
    templateId: resume.templateId,
    versionNumber: maxVersion + 1,
  });
  await db.update(resumes).set({
    title: version.title,
    contentMarkdown: version.contentMarkdown,
    contentJson: version.contentJson,
    templateId: version.templateId,
    updatedAt: new Date().toISOString(),
  }).where(eq(resumes.id, id));
  return c.json(success(null, `已恢复到版本 ${version.versionNumber}`));
});

app.delete("/api/resumes/:id/versions/:versionId", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const id = Number(c.req.param("id"));
  const versionId = Number(c.req.param("versionId"));
  const [resume] = await db.select({ id: resumes.id }).from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, user.id))).limit(1);
  if (!resume) return c.json(fail(ErrorCode.NOT_FOUND, "未找到简历"));
  await db.delete(resumeVersions).where(and(eq(resumeVersions.id, versionId), eq(resumeVersions.resumeId, id)));
  return c.json(success(null, "版本已删除"));
});

app.get("/api/public/resume/:id", async (c) => {
  const db = getDb(c);
  const id = Number(c.req.param("id"));
  if (!id) return c.json(fail(ErrorCode.BAD_REQUEST, "无效的简历ID"));

  const [row] = await db.select({
    id: resumes.id,
    user_id: resumes.userId,
    template_id: resumes.templateId,
    title: resumes.title,
    content_json: resumes.contentJson,
    content_markdown: resumes.contentMarkdown,
    is_public: resumes.isPublic,
    created_at: resumes.createdAt,
    updated_at: resumes.updatedAt,
    template: templates,
  }).from(resumes).leftJoin(templates, eq(resumes.templateId, templates.id))
    .where(and(eq(resumes.id, id), eq(resumes.isPublic, true))).limit(1);
  if (!row) return c.json(fail(ErrorCode.NOT_FOUND, "简历不存在或未公开"));

  return c.json(success({
    ...row,
    content_json: (() => { try { return JSON.parse(row.content_json); } catch { return row.content_json; } })(),
  }));
});

const parseAiError = (resp: Response, bodyText: string) => {
  if (resp.status === 401 || resp.status === 403) return "API Key 无效或已过期，请检查配置";
  if (resp.status === 404) return "模型不可用，请检查模型名称是否正确";
  if (resp.status === 429) return "AI 请求过于频繁，请稍后重试";
  if (bodyText) return `AI 服务错误: ${bodyText.slice(0, 200)}`;
  return "AI 服务暂时不可用，请稍后重试";
};

const callAi = async (baseUrl: string, apiKey: string, model: string, messages: { role: string; content: string }[], maxTokens = 800) => {
  const resp = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature: 0.7 }),
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(parseAiError(resp, text));
  const data = JSON.parse(text) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
};

app.get("/api/ai/status", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  if (!dbUser) return c.json(fail(ErrorCode.USER_NOT_FOUND, "用户不存在"));
  const hasCustomKey = isValidApiKey(dbUser.customApiKey);
  return c.json(success({
    usageCount: dbUser.aiUsageCount,
    limit: FREE_USAGE_LIMIT,
    remaining: hasCustomKey ? null : Math.max(0, FREE_USAGE_LIMIT - dbUser.aiUsageCount),
    hasCustomKey,
    customBaseUrl: dbUser.customBaseUrl ?? "",
    customModel: dbUser.customModel ?? "",
  }));
});

app.put("/api/ai/config", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const body: { apiKey?: string; baseUrl?: string; model?: string } = await c.req.json().catch(() => ({}));
  if (body.apiKey !== undefined && body.apiKey !== "" && !isValidApiKey(body.apiKey)) {
    return c.json(fail(ErrorCode.VALIDATION_ERROR, "API Key 格式无效（至少 20 个字符）"));
  }
  if (body.baseUrl !== undefined && body.baseUrl !== "") {
    try { new URL(body.baseUrl); } catch { return c.json(fail(ErrorCode.VALIDATION_ERROR, "Base URL 格式无效")); }
  }
  await db.update(users).set({
    customApiKey: body.apiKey !== undefined ? (body.apiKey || null) : sql`${users.customApiKey}`,
    customBaseUrl: body.baseUrl !== undefined ? (body.baseUrl || null) : sql`${users.customBaseUrl}`,
    customModel: body.model !== undefined ? (body.model || null) : sql`${users.customModel}`,
  }).where(eq(users.id, user.id));
  return c.json(success(null, "更新配置成功"));
});

app.post("/api/ai/optimize", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const body: { content?: string; type?: string; industry?: string } = await c.req.json().catch(() => ({}));
  const content = body.content ?? "";
  if (!content || typeof content !== "string") return c.json(fail(ErrorCode.BAD_REQUEST, "请提供需要优化的内容"));
  if (content.length > MAX_CONTENT_LEN) return c.json(fail(ErrorCode.VALIDATION_ERROR, `内容过长，最多支持 ${MAX_CONTENT_LEN} 个字符`));

  const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  if (!dbUser) return c.json(fail(ErrorCode.USER_NOT_FOUND, "用户不存在"));
  const hasCustom = isValidApiKey(dbUser.customApiKey);
  const apiKey = hasCustom ? dbUser.customApiKey! : (c.env.SILICONFLOW_API_KEY ?? c.env.OPENAI_API_KEY ?? "");
  const baseUrl = hasCustom ? (dbUser.customBaseUrl || DEFAULT_BASE_URL) : DEFAULT_BASE_URL;
  const model = hasCustom ? (dbUser.customModel || DEFAULT_MODEL) : DEFAULT_MODEL;

  if (!hasCustom && dbUser.aiUsageCount >= FREE_USAGE_LIMIT) {
    return c.json(fail(ErrorCode.FORBIDDEN, `内置 AI 免费额度已用完（${FREE_USAGE_LIMIT} 次），请配置自己的 API Key`));
  }
  if (!isValidApiKey(apiKey)) {
    return c.json(success({ optimized: `[AI 模拟结果]\n\n${content}`, isMock: true }));
  }

  try {
    const optimized = await callAi(baseUrl, apiKey, model, [
      { role: "system", content: "你是一位专业的简历优化专家。请直接输出优化后的内容，保持 Markdown 格式。只用中文回答。" },
      { role: "user", content: `请优化以下内容：\n${content}` },
    ]);
    if (!hasCustom) {
      await db.update(users).set({ aiUsageCount: dbUser.aiUsageCount + 1 }).where(eq(users.id, user.id));
    }
    return c.json(success({ optimized }));
  } catch (error) {
    return c.json(fail(ErrorCode.THIRD_PARTY_ERROR, error instanceof Error ? error.message : "AI 服务暂时不可用"));
  }
});

app.post("/api/ai/suggest", auth, async (c) => {
  const db = getDb(c);
  const user = c.get("user");
  const body: { prompt?: string; context?: unknown } = await c.req.json().catch(() => ({}));
  const prompt = body.prompt ?? "";
  if (!prompt || typeof prompt !== "string") return c.json(fail(ErrorCode.BAD_REQUEST, "请提供提示内容"));
  if (prompt.length > MAX_CONTENT_LEN) return c.json(fail(ErrorCode.VALIDATION_ERROR, `内容过长，最多支持 ${MAX_CONTENT_LEN} 个字符`));

  const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  if (!dbUser) return c.json(fail(ErrorCode.USER_NOT_FOUND, "用户不存在"));
  const hasCustom = isValidApiKey(dbUser.customApiKey);
  const apiKey = hasCustom ? dbUser.customApiKey! : (c.env.SILICONFLOW_API_KEY ?? c.env.OPENAI_API_KEY ?? "");
  const baseUrl = hasCustom ? (dbUser.customBaseUrl || DEFAULT_BASE_URL) : DEFAULT_BASE_URL;
  const model = hasCustom ? (dbUser.customModel || DEFAULT_MODEL) : DEFAULT_MODEL;
  if (!hasCustom && dbUser.aiUsageCount >= FREE_USAGE_LIMIT) {
    return c.json(fail(ErrorCode.FORBIDDEN, `内置 AI 免费额度已用完（${FREE_USAGE_LIMIT} 次），请配置自己的 API Key`));
  }
  if (!isValidApiKey(apiKey)) {
    return c.json(success({ suggestion: `[AI 模拟建议]\n\n- ${prompt}\n- 建议补充量化成果`, isMock: true }));
  }

  try {
    const suggestion = await callAi(baseUrl, apiKey, model, [
      { role: "system", content: "你是一位专业的简历写作顾问。请直接给出具体、可操作的建议，使用 Markdown 列表格式。只用中文回答。" },
      { role: "user", content: `上下文：${JSON.stringify(body.context ?? {}).slice(0, 1000)}\n用户请求：${prompt}` },
    ], 600);
    if (!hasCustom) {
      await db.update(users).set({ aiUsageCount: dbUser.aiUsageCount + 1 }).where(eq(users.id, user.id));
    }
    return c.json(success({ suggestion }));
  } catch (error) {
    return c.json(fail(ErrorCode.THIRD_PARTY_ERROR, error instanceof Error ? error.message : "AI 服务暂时不可用"));
  }
});

app.notFound((c) => c.json(fail(ErrorCode.NOT_FOUND, "接口不存在")));

app.onError((error, c) => {
  console.error("Worker error:", error);
  return c.json(fail(ErrorCode.INTERNAL_ERROR, "服务器内部错误"));
});

export default app;

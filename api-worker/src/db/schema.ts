import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  aiUsageCount: integer("ai_usage_count").notNull().default(0),
  customApiKey: text("custom_api_key"),
  customBaseUrl: text("custom_base_url"),
  customModel: text("custom_model"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const templates = sqliteTable("templates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  style: text("style").notNull(),
  cssStyles: text("css_styles").notNull(),
  structureJson: text("structure_json").notNull(),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  usageCount: integer("usage_count").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const resumes = sqliteTable("resumes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  templateId: integer("template_id").references(() => templates.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  contentJson: text("content_json").notNull(),
  contentMarkdown: text("content_markdown"),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const resumeVersions = sqliteTable("resume_versions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  resumeId: integer("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  contentMarkdown: text("content_markdown"),
  contentJson: text("content_json").notNull(),
  templateId: integer("template_id").references(() => templates.id, { onDelete: "set null" }),
  versionNumber: integer("version_number").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const tokenBlacklist = sqliteTable("token_blacklist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  token: text("token").notNull().unique(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const verificationCodes = sqliteTable("verification_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  code: text("code").notNull(),
  type: text("type").notNull().default("password_reset"),
  expiresAt: text("expires_at").notNull(),
  used: integer("used", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

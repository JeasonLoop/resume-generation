# Cloudflare Worker API (D1 + Drizzle)

这个目录是新的 Cloudflare 后端（最小迁移版本），用于替代原 `api`（Express + Sequelize + SQLite）。

## 1) 安装依赖

```bash
cd api-worker
npm install
```

## 2) 创建 D1 数据库

```bash
npx wrangler d1 create resume_generation
```

把输出里的 `database_id` 填到 `wrangler.toml` 的 `[[d1_databases]]` 配置中。

## 3) 配置环境变量

使用 Cloudflare Worker Secrets：

```bash
npx wrangler secret put JWT_SECRET
```

可选变量：
- `ALLOWED_ORIGINS`，例如：`https://your-pages-domain.pages.dev,https://your-custom-domain.com`
- `SILICONFLOW_API_KEY`（可选，未配置时 AI 接口返回模拟结果）
- `OPENAI_API_KEY`（可选，和上面二选一）

## 4) 执行迁移

本地迁移：

```bash
npm run db:migrate:local
```

远端迁移：

```bash
npm run db:migrate:remote
```

## 5) 本地调试与部署

本地调试：

```bash
npm run dev
```

部署：

```bash
npm run deploy
```

一键部署（包含远端迁移 + Worker 部署）：

```bash
npm run deploy:one-click
```

## 6) 前端对接建议

- 前端继续部署到 Cloudflare Pages（静态站点）
- API 部署到 Worker（本目录）
- 前端 API Base URL 指向 Worker 域名（如 `https://resume-generation-api.<subdomain>.workers.dev`）

## 当前已迁移接口

- `GET /api/health`
- `GET /api/templates`
- `GET /api/templates/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/auth/send-reset-code`
- `POST /api/auth/reset-password`
- `GET /api/resumes`
- `GET /api/resumes/:id`
- `POST /api/resumes`
- `PUT /api/resumes/:id`
- `DELETE /api/resumes/:id`
- `POST /api/resumes/batch-delete`
- `GET /api/resumes/:id/versions`
- `GET /api/resumes/:id/versions/:versionId`
- `POST /api/resumes/:id/versions/:versionId/restore`
- `DELETE /api/resumes/:id/versions/:versionId`
- `GET /api/public/resume/:id`
- `GET /api/ai/status`
- `PUT /api/ai/config`
- `POST /api/ai/optimize`
- `POST /api/ai/suggest`

## 说明

- `send-reset-code` 在 Worker 环境下默认不直接连 SMTP，当前行为是生成验证码并按成功响应返回（验证码会打印到 Worker 日志）。
- 生产环境建议接入邮件服务（Resend/MailChannels）后替换该逻辑。

## SQLite 到 D1 数据导入

1. 生成导入 SQL：

```bash
npm run worker:import:sql
```

会生成：`api-worker/migrations/9000_import_from_sqlite.sql`

2. 导入到 D1（远端）：

```bash
cd api-worker
npx wrangler d1 execute resume_generation --remote --file ./migrations/9000_import_from_sqlite.sql
```

> 注意：导入脚本用于首次迁移历史数据，不建议重复执行（会遇到主键冲突）。

## 尚未迁移（可选优化）

- 邮件服务生产级接入（验证码发送）
- AI 请求审计与更细粒度限流

## 全项目一键发布

在项目根目录设置 Pages 项目名环境变量后，可一键发布后端 Worker + 前端 Pages：

```bash
set CF_PAGES_PROJECT_NAME=your-pages-project-name
npm run release:all
```

说明：
- `release:all` 会先执行后端 `worker:one-click`（迁移 + deploy）
- 然后执行前端 `build` + `wrangler pages deploy dist`

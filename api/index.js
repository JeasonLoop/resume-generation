
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { sequelize, Template, User } from './models/index.js';
import bcrypt from 'bcryptjs';
import { getTemplates } from './data/templates.js';
import { errorHandler } from './utils/response.js';
import { authenticateToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars - 指定 api/.env 路径
dotenv.config({ path: path.join(__dirname, '.env') });

const NODE_ENV = process.env.NODE_ENV || 'development';

// 生产环境必须配置 JWT_SECRET，且不能使用示例值
const JWT_SECRET = process.env.JWT_SECRET;
if (NODE_ENV === 'production') {
  if (!JWT_SECRET || JWT_SECRET.includes('change_in_production') || JWT_SECRET.length < 32) {
    console.error('FATAL: 生产环境必须设置 JWT_SECRET，且为至少 32 位的随机字符串。');
    process.exit(1);
  }
} else if (!JWT_SECRET || JWT_SECRET.includes('change_in_production')) {
  console.warn('[dev] 未设置 JWT_SECRET 或仍为示例值，登录/注册可能异常，请在 api/.env 中配置。');
}


const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - Nginx 反向代理需要此配置
// app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production', // 生产环境启用 CSP
  hsts: NODE_ENV === 'production',                  // 生产环境启用 HSTS
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 更严格的限流：登录/注册接口，防止暴力破解
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: '登录尝试次数过多，请15分钟后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});

// AI接口限流，防止滥用
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP/user to 10 requests per windowMs
  message: { message: 'AI调用过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
  // 已登录用户按用户ID限流，未登录用户按IP限流
  keyGenerator: (req) => {
    if (req.user?.id) {
      return `user:${req.user.id}`;
    }
    return req.ip;
  }
});

app.use('/api/', apiLimiter);

// CORS：仅在后端统一配置（Nginx 不添加 CORS 头，避免重复）
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:3000',
      'http://jeasonloop.online',
      'https://jeasonloop.online',
      'http://www.jeasonloop.online',
      'https://www.jeasonloop.online',
      'http://resumegen.jeasonloop.online',
      'https://resumegen.jeasonloop.online'
    ];

app.use(cors({
  origin: (origin, callback) => {
    // 开发环境允许无Origin头请求，方便调试
    if (NODE_ENV === 'development') {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // 生产环境严格校验Origin必须存在且在允许列表
      if (origin && allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false
}));

// 解析Cookie
app.use(cookieParser());

// 兼容多种 Content-Type，解决 Nginx 代理后 req.body 未解析问题
app.use(express.json({
  limit: '50mb',
  type: (req) => {
    const ct = (req.headers['content-type'] || '').toLowerCase();
    return ct.includes('application/json') || ct.includes('text/plain') || !ct;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 调试：记录到达后端的请求头（便于排查 Nginx 是否转发 body/Content-Type）
app.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.path.startsWith('/api')) {
    const ct = req.headers['content-type'];
    const cl = req.headers['content-length'];
    console.log(`[API ${req.method}] Content-Type: ${ct ?? '(empty)'}, Content-Length: ${cl ?? '(empty)'}`);
  }
  next();
});

// Request logging middleware - sanitize sensitive data
const sanitizeBody = (body) => {
  if (!body) return body;
  const sanitized = { ...body };
  if (sanitized.password) sanitized.password = '***REDACTED***';
  return sanitized;
};

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', JSON.stringify(sanitizeBody(req.body), null, 2));
  }
  next();
});

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ message: '无效的 JSON 格式' });
  }
  next();
});

// Static files: uploads 目录（支持环境变量 UPLOADS_PATH，便于 Docker 挂载）
const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// 健康检查（供 Docker / Nginx 使用）
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import aiRoutes from './routes/ai.js';
import templateRoutes from './routes/template.js';
import publicRoutes from './routes/public.js';

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', authenticateToken, aiLimiter, aiRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/public', publicRoutes);

// 生产环境：提供 Vite 构建的前端静态资源 + SPA 回退
if (NODE_ENV === 'production') {
  const distPath = process.env.DIST_PATH || path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const seedTemplates = async () => {
  const templates = getTemplates();
  console.log(`Syncing ${templates.length} templates...`);

  // 先将所有简历关联的模板 ID 置空，防止外键约束报错
  await sequelize.query('UPDATE resumes SET template_id = NULL');

  // 先清空旧模板，避免重复
  await Template.destroy({ where: {} });
  // 重置自增ID (SQLite)
  try {
    await sequelize.query('DELETE FROM sqlite_sequence WHERE name="templates"');
  } catch (e) {
    // 忽略错误
  }

  for (const t of templates) {
    await Template.create(t);
  }

  console.log('Templates synced');
};

const seedDefaultUser = async () => {
  if (NODE_ENV === 'production') {
    return;
  }

  const existingUser = await User.findOne({ where: { email: 'test@example.com' } });
  if (existingUser) {
    console.log('Default test user already exists, skipping seed');
    return;
  }

  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = await User.create({
    name: '测试用户',
    email: 'test@example.com',
    password_hash: hashedPassword,
    is_premium: true
  });

  console.log(`[dev] Test user created (id: ${user.id}) — test@example.com / 123456`);
};

// Database sync and server start
const shouldForceReset = NODE_ENV === 'development' && process.env.RESET_DB === 'true';
// SQLite 不支持复杂的 alter 操作，开发环境下如果同步失败，建议手动设置 RESET_DB=true 重置
// 生产环境关闭 alter，避免自动变更导致数据风险（请使用迁移工具管理 schema 变更）
const shouldAlter = false;

// 错误处理中间件（必须放在所有路由之后）
app.use(errorHandler);

sequelize.sync({ force: shouldForceReset, alter: shouldAlter })
  .then(async () => {
    console.log('Database synced', shouldForceReset ? '(force reset)' : shouldAlter ? '(with alter)' : '');
    await seedTemplates();
    await seedDefaultUser();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (${NODE_ENV})`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });


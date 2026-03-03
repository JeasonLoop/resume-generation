
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { sequelize, Template, User } from './models/index.js';
import bcrypt from 'bcryptjs';
import { getTemplates } from './data/templates.js';
import { errorHandler } from './utils/response.js';

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
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:3000',
      'http://resumegen.jeasonloop.online',
      'https://resumegen.jeasonloop.online'
    ];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 兼容多种 Content-Type，解决 Nginx 代理后 req.body 未解析问题
app.use(express.json({
  limit: '50mb',
  type: (req) => {
    const ct = (req.headers['content-type'] || '').toLowerCase();
    return ct.includes('application/json') || ct.includes('text/plain') || !ct;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/templates', templateRoutes);

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
  // 获取现有模板的名称列表
  const existingTemplates = await Template.findAll({ attributes: ['name'] });
  const existingNames = new Set(existingTemplates.map(t => t.name));

  const templates = getTemplates();
  const newTemplates = templates.filter(t => !existingNames.has(t.name));

  if (newTemplates.length === 0) {
    console.log('All templates already exist, skipping seed');
    return;
  }

  console.log(`Seeding ${newTemplates.length} new templates...`);
  await Template.bulkCreate(newTemplates);
  console.log('Templates seeded');
};

const seedDefaultUser = async () => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: 'test@example.com' } });
  if (existingUser) {
    console.log('Default user already exists, skipping seed');
    console.log('Test login: test@example.com / 123456');
    return;
  }

  console.log('Seeding default user...');

  const hashedPassword = await bcrypt.hash('123456', 10);
  console.log('Hashed password:', hashedPassword.substring(0, 20) + '...');

  const user = await User.create({
    name: '测试用户',
    email: 'test@example.com',
    password_hash: hashedPassword,
    is_premium: true
  });

  console.log('Default user created with ID:', user.id);
  console.log('Test login credentials:');
  console.log('  Email: test@example.com');
  console.log('  Password: 123456');
};

// Database sync and server start
const shouldForceReset = NODE_ENV === 'development' && process.env.RESET_DB === 'true';
const shouldAlter = NODE_ENV === 'production';

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


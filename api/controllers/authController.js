import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { success, fail, ErrorCode } from '../utils/response.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

// 获取 JWT_SECRET，确保在运行时读取
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET 未配置');
  }
  return secret;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
  try {
    const body = req.body ?? {};
    if (!body.email || !body.password || !body.name) {
      return fail(res, ErrorCode.BAD_REQUEST, '请提供邮箱、密码和昵称');
    }
    const { email, password, name } = body;

    if (!EMAIL_RE.test(email)) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '邮箱格式不正确');
    }
    if (password.length < 6 || password.length > 64) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '密码长度需为 6-64 位');
    }
    if (name.trim().length < 1 || name.length > 50) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '昵称长度需为 1-50 个字符');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return fail(res, ErrorCode.USER_EXISTS, '用户已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      name
    });

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: '24h' });

    return success(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium
      },
      token
    }, '用户注册成功');
  } catch (error) {
    console.error('Register error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body ?? {};
    if (!body.email || !body.password) {
      return fail(res, ErrorCode.BAD_REQUEST, '请提供邮箱和密码');
    }
    const { email, password } = body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return fail(res, ErrorCode.INVALID_CREDENTIALS, '凭证无效');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return fail(res, ErrorCode.INVALID_CREDENTIALS, '凭证无效');
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: '24h' });

    return success(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium,
        avatar_url: user.avatar_url
      },
      token
    }, '登录成功');
  } catch (error) {
    console.error('Login error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return success(res, {
      id: user.id,
      email: user.email,
      name: user.name,
      is_premium: user.is_premium,
      avatar_url: user.avatar_url
    });
  } catch (error) {
    console.error('GetMe error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

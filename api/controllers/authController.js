import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, TokenBlacklist, VerificationCode } from '../models/index.js';
import { success, fail, ErrorCode } from '../utils/response.js';
import { sendPasswordResetCode } from '../utils/emailService.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

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

    // Generate tokens
    const accessToken = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign({ id: user.id, email: user.email, type: 'refresh' }, getJwtSecret(), { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    // 将refresh token设置到HttpOnly Cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      path: '/api/auth/refresh'
    });

    return success(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium
      },
      access_token: accessToken,
      expires_in: 15 * 60 // 15分钟
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

    // Generate tokens
    const accessToken = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign({ id: user.id, email: user.email, type: 'refresh' }, getJwtSecret(), { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    // 将refresh token设置到HttpOnly Cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      path: '/api/auth/refresh'
    });

    return success(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium,
        avatar_url: user.avatar_url
      },
      access_token: accessToken,
      expires_in: 15 * 60 // 15分钟
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

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        // 解析Token获取过期时间
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000);

        // 将Token加入黑名单
        await TokenBlacklist.add(token, expiresAt);
      } catch (error) {
        console.error('添加Token到黑名单失败:', error);
      }
    }

    // 清除refresh token cookie
    res.clearCookie('refresh_token', {
      path: '/api/auth/refresh',
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return success(res, null, '退出登录成功');
  } catch (error) {
    console.error('Logout error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

// 刷新Token接口
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return fail(res, ErrorCode.UNAUTHORIZED, 'Refresh Token不存在');
    }

    try {
      const decoded = jwt.verify(refreshToken, getJwtSecret());

      // 验证是refresh token
      if (decoded.type !== 'refresh') {
        return fail(res, ErrorCode.TOKEN_INVALID, '无效的Refresh Token');
      }

      // 查找用户
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return fail(res, ErrorCode.USER_NOT_FOUND, '用户不存在');
      }

      // 生成新的access token
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        getJwtSecret(),
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
      );

      return success(res, {
        access_token: accessToken,
        expires_in: 15 * 60 // 15分钟
      });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Refresh Token也过期了，需要重新登录
        res.clearCookie('refresh_token', {
          path: '/api/auth/refresh',
          httpOnly: true,
          secure: NODE_ENV === 'production',
          sameSite: 'strict'
        });
        return fail(res, ErrorCode.TOKEN_EXPIRED, 'Refresh Token已过期，请重新登录');
      }
      return fail(res, ErrorCode.TOKEN_INVALID, '无效的Refresh Token');
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

// 发送密码重置验证码
export const sendResetCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_RE.test(email)) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '请输入有效的邮箱地址');
    }

    // 检查用户是否存在
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return fail(res, ErrorCode.USER_NOT_FOUND, '该邮箱未注册');
    }

    // 检查发送频率，1分钟内只能发送一次
    const recentCode = await VerificationCode.findOne({
      where: {
        email,
        type: 'password_reset',
        created_at: {
          [sequelize.Op.gt]: new Date(Date.now() - 60 * 1000)
        }
      }
    });

    if (recentCode) {
      return fail(res, ErrorCode.TOO_MANY_REQUESTS, '验证码发送过于频繁，请1分钟后再试');
    }

    // 生成验证码
    const code = await VerificationCode.generate(email, 'password_reset');

    // 发送邮件
    const sendSuccess = await sendPasswordResetCode(email, code);

    if (!sendSuccess) {
      return fail(res, ErrorCode.INTERNAL_ERROR, '验证码发送失败，请稍后重试');
    }

    return success(res, null, '验证码已发送到您的邮箱，请注意查收');
  } catch (error) {
    console.error('Send reset code error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

// 重置密码
export const resetPassword = async (req, res) => {
  try {
    const { email, code, new_password } = req.body;

    if (!email || !EMAIL_RE.test(email)) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '请输入有效的邮箱地址');
    }

    if (!code || code.length !== 6) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '请输入有效的6位验证码');
    }

    if (!new_password || new_password.length < 6 || new_password.length > 64) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '密码长度需为6-64位');
    }

    // 验证验证码
    const isValid = await VerificationCode.verify(email, code, 'password_reset');
    if (!isValid) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '验证码无效或已过期');
    }

    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return fail(res, ErrorCode.USER_NOT_FOUND, '用户不存在');
    }

    // 哈希新密码
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await user.update({ password_hash: hashedPassword });

    // 清除该用户所有有效的Token（强制重新登录）
    // 这里简化处理：如果有更完善的用户Token管理，可以清理所有相关Token

    return success(res, null, '密码重置成功，请使用新密码登录');
  } catch (error) {
    console.error('Reset password error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

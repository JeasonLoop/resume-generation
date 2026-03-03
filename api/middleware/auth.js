import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { fail, ErrorCode } from '../utils/response.js';

// 获取 JWT_SECRET，确保在运行时读取
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET 未配置');
  }
  return secret;
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return fail(res, ErrorCode.UNAUTHORIZED, '未提供认证 Token');
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const dbUser = await User.findByPk(decoded.id);
    if (!dbUser) {
      return fail(res, ErrorCode.TOKEN_INVALID, '用户不存在');
    }
    req.user = dbUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return fail(res, ErrorCode.TOKEN_EXPIRED, 'Token 已过期');
    }
    if (err.name === 'JsonWebTokenError') {
      return fail(res, ErrorCode.TOKEN_INVALID, 'Token 无效');
    }
    console.error('Auth middleware error:', err);
    return fail(res, ErrorCode.INTERNAL_ERROR, '认证过程出错');
  }
};

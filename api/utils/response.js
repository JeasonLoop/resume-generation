/**
 * 统一响应工具
 * 标准格式: { code: number, message: string, data: any }
 */

// 错误码定义
export const ErrorCode = {
  SUCCESS: 0,
  
  // 客户端错误 1xxxx
  BAD_REQUEST: 10001,
  UNAUTHORIZED: 10002,
  FORBIDDEN: 10003,
  NOT_FOUND: 10004,
  VALIDATION_ERROR: 10005,
  
  // 业务错误 2xxxx
  USER_EXISTS: 20001,
  INVALID_CREDENTIALS: 20002,
  TOKEN_EXPIRED: 20003,
  TOKEN_INVALID: 20004,
  
  // 服务端错误 5xxxx
  INTERNAL_ERROR: 50000,
  DATABASE_ERROR: 50001,
  THIRD_PARTY_ERROR: 50002,
};

// 错误码对应的默认消息
const ErrorMessage = {
  [ErrorCode.SUCCESS]: '操作成功',
  [ErrorCode.BAD_REQUEST]: '请求参数错误',
  [ErrorCode.UNAUTHORIZED]: '未授权，请先登录',
  [ErrorCode.FORBIDDEN]: '无权限访问',
  [ErrorCode.NOT_FOUND]: '资源不存在',
  [ErrorCode.VALIDATION_ERROR]: '数据验证失败',
  [ErrorCode.USER_EXISTS]: '用户已存在',
  [ErrorCode.INVALID_CREDENTIALS]: '凭证无效',
  [ErrorCode.TOKEN_EXPIRED]: 'Token 已过期',
  [ErrorCode.TOKEN_INVALID]: 'Token 无效',
  [ErrorCode.INTERNAL_ERROR]: '服务器内部错误',
  [ErrorCode.DATABASE_ERROR]: '数据库错误',
  [ErrorCode.THIRD_PARTY_ERROR]: '第三方服务错误',
};

/**
 * 成功响应
 */
export const success = (res, data = null, message = '操作成功', code = ErrorCode.SUCCESS) => {
  return res.json({
    code,
    message,
    data,
  });
};

/**
 * 失败响应
 */
export const fail = (res, code = ErrorCode.INTERNAL_ERROR, message = null, data = null) => {
  const responseMessage = message || ErrorMessage[code] || '未知错误';
  return res.json({
    code,
    message: responseMessage,
    data,
  });
};

/**
 * 分页响应
 */
export const paginated = (res, list, total, page, pageSize) => {
  return res.json({
    code: ErrorCode.SUCCESS,
    message: '操作成功',
    data: {
      list,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    },
  });
};

/**
 * Express 错误处理中间件
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // JWT 错误处理
  if (err.name === 'JsonWebTokenError') {
    return fail(res, ErrorCode.TOKEN_INVALID, 'Token 无效');
  }
  if (err.name === 'TokenExpiredError') {
    return fail(res, ErrorCode.TOKEN_EXPIRED, 'Token 已过期');
  }
  
  // 验证错误
  if (err.name === 'ValidationError') {
    return fail(res, ErrorCode.VALIDATION_ERROR, err.message);
  }
  
  // 其他错误
  const message = process.env.NODE_ENV === 'production' 
    ? '服务器内部错误' 
    : err.message;
  
  return fail(res, ErrorCode.INTERNAL_ERROR, message);
};

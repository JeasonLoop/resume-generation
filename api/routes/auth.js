import express from 'express';
import { register, login, getMe, logout, refreshToken, sendResetCode, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/logout', authenticateToken, logout);
router.post('/refresh', refreshToken); // 刷新Token接口，不需要认证，依赖Cookie
router.post('/send-reset-code', sendResetCode); // 发送密码重置验证码
router.post('/reset-password', resetPassword); // 重置密码

export default router;

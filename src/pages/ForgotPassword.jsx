import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import axios from '../utils/axios';
import { toast } from '../components/Toast';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: 输入邮箱, 2: 输入验证码和新密码
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // 发送验证码
  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/send-reset-code', { email });
      toast.success('验证码已发送到您的邮箱');
      setStep(2);
      // 开始60秒倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('发送验证码失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 重新发送验证码
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      await axios.post('/auth/send-reset-code', { email });
      toast.success('验证码已重新发送');
      // 开始60秒倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('重发验证码失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 重置密码
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      toast.error('请输入有效的6位验证码');
      return;
    }

    if (!newPassword || newPassword.length < 6 || newPassword.length > 64) {
      toast.error('密码长度需为6-64位');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('两次输入的密码不一致');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/reset-password', {
        email,
        code,
        new_password: newPassword
      });
      toast.success('密码重置成功，请使用新密码登录');
      navigate('/login');
    } catch (error) {
      console.error('重置密码失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-transparent">
      {/* Left Side - Editorial Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Office Minimal"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white">
          <p className="font-serif text-5xl mb-4 italic">工作的艺术。</p>
          <p className="uppercase tracking-[0.3em] text-xs font-light">专业简历构建器 v1.0</p>
        </div>
      </div>

      {/* Right Side - Minimal Form */}
      <div className="flex-1 flex items-center justify-center p-12 lg:p-24 relative">
        <div className="w-full max-w-md space-y-12 bg-white/50 backdrop-blur-md p-10 rounded-2xl border border-white shadow-xl">
          <div className="space-y-2">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-black transition-colors mb-4">
              <ArrowLeft size={12} />
              返回登录
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">重置密码</span>
            <h2 className="text-4xl font-serif text-black tracking-tight">
              {step === 1 ? '找回密码' : '设置新密码'}
            </h2>
          </div>

          {step === 1 ? (
            <form className="space-y-10" onSubmit={handleSendCode}>
              <div className="space-y-8">
                <div className="group">
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                    注册邮箱地址
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="chic-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link to="/register" className="chic-link text-gray-500">
                  创建新账号
                </Link>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="chic-btn flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <>
                      <span>发送验证码</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-10" onSubmit={handleResetPassword}>
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    className="chic-input bg-gray-50"
                    value={email}
                    disabled
                  />
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="code" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                      验证码
                    </label>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={countdown > 0 || isLoading}
                      className="text-[10px] text-blue-500 hover:text-blue-600 disabled:text-gray-400 transition-colors"
                    >
                      {countdown > 0 ? `${countdown}秒后重发` : '重新发送'}
                    </button>
                  </div>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    maxLength={6}
                    required
                    className="chic-input"
                    placeholder="请输入6位验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div className="group">
                  <label htmlFor="newPassword" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                    新密码
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="chic-input"
                    placeholder="请输入新密码（至少6位）"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                    确认新密码
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="chic-input"
                    placeholder="请再次输入新密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="chic-btn flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <>
                      <span>重置密码</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

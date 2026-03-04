import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else if (result.shouldRegister) {
      // 用户不存在，跳转到注册页面，并预填邮箱
      navigate('/register', { state: { email } });
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
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">欢迎回来</span>
            <h2 className="text-4xl font-serif text-black tracking-tight">登录</h2>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="group">
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                  邮箱地址
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

              <div className="group">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                    密码
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="chic-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs uppercase tracking-wider border-l-2 border-red-500 pl-3 py-1">
                {error}
              </div>
            )}

            <div className="pt-2 text-xs text-gray-400">
              <p>如果账号不存在，将自动跳转到注册页面</p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link to="/register" className="chic-link text-gray-500">
                创建账号
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
                    <span>进入</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={1} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

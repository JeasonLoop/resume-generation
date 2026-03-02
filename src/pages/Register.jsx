import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 从登录页面传来的邮箱
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-transparent">
      {/* Left Side - Editorial Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Minimal Workspace"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white">
          <p className="font-serif text-5xl mb-4 italic">设计你的未来。</p>
          <p className="uppercase tracking-[0.3em] text-xs font-light">加入专业人士网络</p>
        </div>
      </div>

      {/* Right Side - Minimal Form */}
      <div className="flex-1 flex items-center justify-center p-12 lg:p-24 relative">
        <div className="w-full max-w-md space-y-12 bg-white/50 backdrop-blur-md p-10 rounded-2xl border border-white shadow-xl">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">新会员注册</span>
            <h2 className="text-4xl font-serif text-black tracking-tight">注册</h2>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="group">
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                  全名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="chic-input"
                  placeholder="张三"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
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

            <div className="pt-4 flex items-center justify-between">
              <Link to="/login" className="chic-link text-gray-500">
                已有账号？
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
                    <span>加入</span>
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

export default Register;

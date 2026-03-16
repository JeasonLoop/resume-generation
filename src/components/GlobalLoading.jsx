import React from 'react';
import useAppStore from '../store/useAppStore';

const GlobalLoading = () => {
  const loadingCount = useAppStore((state) => state.loadingCount);
  const isLoading = loadingCount > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-6 border border-white/50">
        {/* 极简旋转加载动画 */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>

        {/* 文字使用项目统一的衬线字体，符合整体风格 */}
        <p className="text-gray-800 font-serif text-lg font-light tracking-wide">加载中</p>
      </div>
    </div>
  );
};

export default GlobalLoading;

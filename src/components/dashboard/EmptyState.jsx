import React from 'react';
import { Plus } from 'lucide-react';

const EmptyState = ({ searchQuery, onNewProject }) => {
  if (searchQuery) {
    return (
      <div className="border-t border-gray-200 py-32 text-center animate-fade-in-up">
        <h3 className="text-2xl font-serif text-gray-400 mb-2 italic">未找到相关项目</h3>
        <p className="text-gray-400 text-sm">尝试搜索其他关键词</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 py-32 text-center animate-fade-in-up">
      <h3 className="text-2xl font-serif text-gray-400 mb-6 italic">画板是空的。</h3>
      <button
        onClick={onNewProject}
        className="chic-link text-black">
        开始您的第一个项目
      </button>
    </div>
  );
};

export const CreateNewCard = ({ onClick, delay }) => (
  <button
    onClick={onClick}
    className="aspect-[3/4] border border-dashed border-gray-300 flex items-center justify-center group hover:border-black transition-colors duration-300 rounded-2xl bg-white/30 backdrop-blur-sm animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}>
    <div className="text-center">
      <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mx-auto mb-4 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
        <Plus size={20} strokeWidth={1} />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">新建</span>
    </div>
  </button>
);

export default EmptyState;

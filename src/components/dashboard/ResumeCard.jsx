import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowUpRight, CheckSquare, Square } from 'lucide-react';

const ResumeCard = ({ resume, index, viewMode, isSelected, onToggleSelection, onDelete }) => {
  const handleToggleSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSelection(resume.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(resume.id);
  };

  if (viewMode === 'grid') {
    return (
      <Link
        to={`/editor/${resume.id}`}
        className="group block animate-fade-in-up"
        style={{ animationDelay: `${index * 50 + 200}ms` }}
      >
        <div className={`aspect-[3/4] bg-white/90 backdrop-blur-md border ${isSelected ? 'border-black ring-1 ring-black' : 'border-gray-200'} p-8 mb-6 transition-all duration-500 shadow-sm hover:shadow-2xl hover:border-black/10 hover:bg-white flex flex-col justify-between relative overflow-hidden rounded-2xl`}>
          <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

          {/* Selection Checkbox */}
          <button
            onClick={handleToggleSelection}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-black transition-colors"
          >
            {isSelected ? (
              <CheckSquare size={20} className="text-black" fill="white" />
            ) : (
              <Square size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              {new Date(resume.updated_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h3 className="text-2xl font-serif text-black group-hover:underline decoration-1 underline-offset-4 decoration-gray-300 transition-all line-clamp-2">
              {resume.title}
            </h3>
          </div>

          <div className="relative z-10 flex justify-between items-end opacity-100 transition-opacity duration-500 translate-y-0">
            <span className="text-[10px] uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              活跃
            </span>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="删除"
              >
                <Trash2 size={16} strokeWidth={1} />
              </button>
              <span className="text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                <ArrowUpRight size={16} strokeWidth={1} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List view
  return (
    <Link
      to={`/editor/${resume.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 50 + 200}ms` }}
    >
      <div className={`bg-white/90 backdrop-blur-md border ${isSelected ? 'border-black ring-1 ring-black' : 'border-gray-200'} p-6 mb-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:border-black/10 hover:bg-white rounded-xl flex items-center justify-between group`}>
        <div className="flex items-center space-x-6">
          {/* Selection Checkbox */}
          <button
            onClick={handleToggleSelection}
            className="text-gray-400 hover:text-black transition-colors"
          >
            {isSelected ? (
              <CheckSquare size={20} className="text-black" fill="white" />
            ) : (
              <Square size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
            <span className="font-serif text-lg italic text-gray-400 group-hover:text-black transition-colors">{resume.title.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-serif text-black group-hover:underline decoration-1 underline-offset-4 decoration-gray-300 transition-all">
              {resume.title}
            </h3>
            <div className="text-xs uppercase tracking-[0.1em] text-gray-400 mt-1">
              Last Edited: {new Date(resume.updated_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-[10px] uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            活跃
          </span>
          <button
            onClick={handleDelete}
            className="text-gray-300 hover:text-red-500 transition-colors p-2"
            title="删除"
          >
            <Trash2 size={16} strokeWidth={1} />
          </button>
          <ArrowUpRight size={18} strokeWidth={1} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;

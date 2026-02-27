import React from 'react';
import { CheckSquare, Trash2, X } from 'lucide-react';

const SelectionBar = ({ count, onBatchDelete, onClearSelection }) => {
  if (count === 0) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-6 animate-fade-in-up">
      <div className="flex items-center space-x-2">
        <CheckSquare size={18} />
        <span className="font-medium text-sm">已选择 {count} 项</span>
      </div>
      <div className="h-4 w-px bg-gray-700"></div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onBatchDelete}
          className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium flex items-center">
          <Trash2 size={14} className="mr-1.5" />
          批量删除
        </button>
        <button
          onClick={onClearSelection}
          className="text-gray-400 hover:text-white transition-colors ml-4">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default SelectionBar;

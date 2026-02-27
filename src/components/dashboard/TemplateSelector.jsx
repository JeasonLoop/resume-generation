import React, { useRef } from 'react';
import { FileText, Upload } from 'lucide-react';
import Modal from '../Modal';

const TemplateSelector = ({ isOpen, onClose, templates, onTemplateSelect, onImport }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImport(file);
      onClose();
    }
    e.target.value = '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="开始新项目">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".md,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900 mb-2">导入文件</h4>

          <button
            onClick={handleImportClick}
            className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left group">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
              <Upload size={20} className="text-gray-500 group-hover:text-black" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">导入 Markdown 文件</h4>
              <p className="text-xs text-gray-500 mt-1">从 .md 或 .txt 文件导入</p>
            </div>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-gray-500 uppercase tracking-widest">或者选择模板</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          <button
            onClick={() => onTemplateSelect(null)}
            className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left group">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
              <FileText size={20} className="text-gray-500 group-hover:text-black" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">空白模板 (Default)</h4>
              <p className="text-xs text-gray-500 mt-1">使用默认的极简商务布局。</p>
            </div>
          </button>

          {templates.slice(0, 5).map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateSelect(t.id)}
              className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
                <span className="font-serif font-bold text-gray-500 group-hover:text-black">{t.name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{t.category} • {t.style}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TemplateSelector;

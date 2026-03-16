import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Loader2, ChevronDown, CheckCircle, Upload, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import TemplatePreview from '../dashboard/TemplatePreview';

const Toolbar = ({ onOpenPrintModal, onSave, title, onTitleChange, isSaving, onTemplateChange, templateId, templates, onContentChange, onInsertText, onEditorSelection, onFileUpload }) => {
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (templates) {
      setShowSaveSuccess(false);
    }
  }, [templates]);

  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }
  };

  const handlePrint = () => {
    onOpenPrintModal?.();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onContentChange(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePreviewCurrentTemplate = () => {
    const currentTemplate = templates?.find(t => t.id === templateId);
    if (currentTemplate) {
      setIsPreviewOpen(true);
    }
  };

  const syncSelection = () => {
    const ta = document.querySelector('textarea');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    if (onEditorSelection) {
      onEditorSelection({ start, end, text: ta.value.substring(start, end) });
    }
  };

  useEffect(() => {
    const ta = document.querySelector('textarea');
    if (ta) {
      ta.addEventListener('select', syncSelection);
      ta.addEventListener('keyup', syncSelection);
      ta.addEventListener('click', syncSelection);
      return () => {
        ta?.removeEventListener('select', syncSelection);
        ta?.removeEventListener('keyup', syncSelection);
        ta?.removeEventListener('click', syncSelection);
      };
    };
  }, [onEditorSelection]);

  if (!title) return null;

  return (
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 z-30 relative font-sans">
      <div className="flex items-center space-x-6">
        <Link
          to="/dashboard"
          className="text-black hover:opacity-50 transition-opacity"
          title="返回作品集"
        >
          <ArrowLeft size={20} strokeWidth={1} />
        </Link>

        <div className="h-4 w-px bg-gray-300"></div>

        <div className="flex items-center group relative">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg font-serif font-bold text-black border-none focus:ring-0 px-0 py-1 transition-all w-64 truncate bg-transparent placeholder-gray-300"
            placeholder="未命名项目"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".md,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-xs uppercase tracking-[0.2em] font-medium text-black hover:text-gray-500 transition-colors flex items-center"
          title="导入 Markdown 文件"
        >
          <Upload className="h-3 w-3 mr-2" />
          导入
        </button>

        {/* Template Selector with Preview */}
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <select
              value={templateId || ''}
              onChange={(e) => onTemplateChange(e.target.value)}
              className="appearance-none bg-transparent text-xs uppercase tracking-[0.1em] font-medium text-gray-500 py-2 pl-0 outline-none cursor-pointer group-hover:text-black transition-colors"
              title="切换简历布局"
            >
              <option value="" disabled>选择布局</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-2.5 h-3 w-3 text-gray-400 group-hover:text-black pointer-events-none transition-colors" strokeWidth={1} />
          </div>

          {/* Preview Current Template Button */}
          <button
            onClick={handlePreviewCurrentTemplate}
            className="p-1.5 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            title="预览当前模板样式"
          >
            <Eye size={16} />
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${showSaveSuccess ? 'text-green-600' : 'text-black hover:text-gray-500'}`}
          title="保存当前进度 (自动保存已启用)"
        >
          {isSaving ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : showSaveSuccess ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : null}
          {isSaving ? '保存中...' : showSaveSuccess ? '已保存' : '保存作品'}
        </button>

        <button
          onClick={handlePrint}
          className="chic-btn px-6 py-2.5 text-[10px]"
          title="下载为 PDF、图片或 Markdown 格式"
        >
          导出作品
        </button>
      </div>

      {/* Template Preview Modal */}
      <TemplatePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={templates.find(t => t.id === templateId)}
        content={null}
        title={title}
        onTemplateSelect={onTemplateChange}
      />
    </div>
  );
};

export default Toolbar;

import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useResumeStore from '../../store/useResumeStore';
import { ArrowLeft, Loader2, ChevronDown, CheckCircle, Upload, Eye } from 'lucide-react';
import TemplatePreview from '../dashboard/TemplatePreview';

const Toolbar = ({ onOpenPrintModal }) => {
  const { resume, updateTitle, updateContent, updateTemplateId, saveResume, isSaving, templates, fetchTemplates } = useResumeStore();
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSave = async () => {
    const success = await saveResume();
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
      updateContent(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePreviewCurrentTemplate = () => {
    const currentTemplate = templates.find(t => t.id === resume.template_id);
    if (currentTemplate) {
      setIsPreviewOpen(true);
    }
  };


  if (!resume) return null;

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
            value={resume.title}
            onChange={(e) => updateTitle(e.target.value)}
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
              value={resume.template_id || ''}
              onChange={(e) => updateTemplateId(e.target.value)}
              className="appearance-none bg-transparent text-xs uppercase tracking-[0.1em] font-medium text-gray-500 py-2 pl-0 pr-6 outline-none cursor-pointer group-hover:text-black transition-colors"
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
          className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 disabled:opacity-50 flex items-center ${showSaveSuccess ? 'text-green-600' : 'text-black hover:text-gray-500'}`}
          title="保存当前进度 (自动保存已启用)"
        >
          {isSaving ? (
            <Loader2 className="animate-spin h-3 w-3 mr-2" />
          ) : showSaveSuccess ? (
            <CheckCircle className="h-3 w-3 mr-2" />
          ) : null}
          {isSaving ? '保存中...' : showSaveSuccess ? '已保存' : '保存作品'}
        </button>

        <button
          onClick={handlePrint}
          className="chic-btn px-6 py-2.5 text-[10px]"
          title="下载为 PDF 格式"
        >
          导出 PDF
        </button>
      </div>

      {/* Template Preview Modal */}
      <TemplatePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={templates.find(t => t.id === resume.template_id)}
        content={resume.content_markdown}
      />
    </div>
  );
};

export default Toolbar;

import { useRef, useState, useMemo } from 'react';
import { FileText, Upload, Eye, Crown } from 'lucide-react';
import Modal from '../Modal';
import TemplatePreview from './TemplatePreview';

const STYLE_PALETTE = {
  minimal:     { bg: '#f5f5f5', accent: '#1a1a1a', text: '#666' },
  modern:      { bg: '#faf9f7', accent: '#c9a96e', text: '#888' },
  clean:       { bg: '#f8fafc', accent: '#3b82f6', text: '#64748b' },
  traditional: { bg: '#fefefe', accent: '#1a1a1a', text: '#777' },
  nature:      { bg: '#f0fdf4', accent: '#22c55e', text: '#6b7280' },
  bold:        { bg: '#18181b', accent: '#a1a1aa', text: '#52525b' },
  elegant:     { bg: '#faf5ff', accent: '#8b5cf6', text: '#9ca3af' },
  professional:{ bg: '#eff6ff', accent: '#3b82f6', text: '#64748b' },
  warm:        { bg: '#fffbeb', accent: '#fbbf24', text: '#a8a29e' },
  futuristic:  { bg: '#09090b', accent: '#22d3ee', text: '#52525b' },
  editorial:   { bg: '#fff', accent: '#c8102e', text: '#999' },
  geometric:   { bg: '#f8f9fa', accent: '#6c5ce7', text: '#636e72' },
  vintage:     { bg: '#faf8f5', accent: '#1a1a1a', text: '#999' },
  luxury:      { bg: '#0a0a0a', accent: '#d4af37', text: '#52525b' },
  soft:        { bg: '#fdf2f8', accent: '#d4a574', text: '#a8a29e' },
  fresh:       { bg: '#e0f2fe', accent: '#0ea5e9', text: '#64748b' },
};

const getTemplatePalette = (style) => STYLE_PALETTE[style] || STYLE_PALETTE.minimal;

const TemplateSwatch = ({ style }) => {
  const p = getTemplatePalette(style);
  return (
    <div
      className="w-10 h-10 rounded-lg flex-shrink-0 flex flex-col items-center justify-center gap-[3px] border border-gray-100 shadow-sm"
      style={{ background: p.bg }}
    >
      <div className="w-5 h-[3px] rounded-full" style={{ background: p.accent }} />
      <div className="w-4 h-[2px] rounded-full" style={{ background: p.text }} />
      <div className="w-3 h-[2px] rounded-full" style={{ background: p.text, opacity: 0.5 }} />
    </div>
  );
};

const TemplateSelector = ({ isOpen, onClose, templates, onTemplateSelect, onImport }) => {
  const fileInputRef = useRef(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(templates.map(t => t.category));
    return ['all', ...cats];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    if (activeFilter === 'all') return templates;
    return templates.filter(t => t.category === activeFilter);
  }, [templates, activeFilter]);

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

  const handlePreview = (e, template) => {
    e.stopPropagation();
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="开始新项目">
      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
        <input
          type="file"
          ref={fileInputRef}
          accept=".md,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex gap-2">
          <button
            onClick={handleImportClick}
            className="flex-1 flex items-center p-3 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left group">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
              <Upload size={16} className="text-gray-500 group-hover:text-black" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-900">导入文件</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">.md / .txt</p>
            </div>
          </button>
          <button
            onClick={() => onTemplateSelect(null)}
            className="flex-1 flex items-center p-3 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left group">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
              <FileText size={16} className="text-gray-500 group-hover:text-black" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-900">空白模板</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">从零开始</p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className="flex items-center p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <button
                onClick={() => onTemplateSelect(t.id)}
                className="flex items-center flex-1 text-left min-w-0"
              >
                <TemplateSwatch style={t.style} />
                <div className="ml-3 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">{t.name}</h4>
                    {t.is_premium && <Crown size={12} className="text-amber-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{t.category} / {t.style}</p>
                </div>
              </button>
              <button
                onClick={(e) => handlePreview(e, t)}
                className="ml-2 p-2 rounded-lg text-gray-300 hover:text-black hover:bg-gray-100 transition-colors flex-shrink-0"
                title="预览模板"
              >
                <Eye size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <TemplatePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={previewTemplate}
      />
    </Modal>
  );
};

export default TemplateSelector;

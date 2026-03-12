import React, { useRef, useState, useEffect } from 'react';
import useResumeStore from '../../store/useResumeStore';
import { PenTool, Bold, Italic, List, Heading1, Heading2, Quote, Link as LinkIcon, HelpCircle, Sticker } from 'lucide-react';
import Modal from '../Modal';
import IconPicker from '../IconPicker';

const MarkdownEditor = () => {
  const { resume, updateContent, saveResume, setEditorSelection } = useResumeStore();
  const textareaRef = useRef(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const lastSaveTimeRef = useRef(0);

  // 在首次渲染后初始化时间，确保 render 过程是纯净的
  useEffect(() => {
    lastSaveTimeRef.current = Date.now();
  }, []);

  const syncSelection = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    setEditorSelection({ start, end, text: ta.value.substring(start, end) });
  };

  // 基于内容变化的防抖自动保存
  useEffect(() => {
    if (!resume?.content_markdown) return;

    const timer = setTimeout(() => {
      const timeSinceLastSave = Date.now() - lastSaveTimeRef.current;
      if (timeSinceLastSave >= 2000) { // 至少间隔2秒
        setSaveStatus('saving');
        saveResume().then(success => {
          if (success) {
            setSaveStatus('saved');
            lastSaveTimeRef.current = Date.now();
          } else {
            setSaveStatus('error');
          }
        });
      }
    }, 1500); // 停止输入1.5秒后自动保存

    return () => clearTimeout(timer);
  }, [resume?.content_markdown, saveResume]);

  const insertText = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);

    updateContent(newText);
    setSaveStatus('unsaved'); // Mark as unsaved on change

    // Restore cursor position/selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleChange = (e) => {
    updateContent(e.target.value);
    setSaveStatus('unsaved'); // Mark as unsaved on change
  };

  const handleIconSelect = (iconName) => {
    // Lucide icons via Iconify API for markdown images
    const iconMarkdown = `![${iconName}](https://api.iconify.design/lucide:${iconName.toLowerCase()}.svg) `;
    insertText(iconMarkdown);
    setIsIconPickerOpen(false);
  };

  if (!resume) return null;

  return (
    <div className="h-full flex flex-col bg-transparent font-sans">
      {/* Editor Toolbar */}
      <div className="flex items-center px-4 py-3 bg-white/50 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-1 mr-6 border-r border-gray-200 pr-6">
          <PenTool className="w-4 h-4 mr-2 text-black" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Editor</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar flex-1">
          <button onClick={() => insertText('**', '**')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Bold">
            <Bold size={14} strokeWidth={2.5} />
          </button>
          <button onClick={() => insertText('*', '*')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Italic">
            <Italic size={14} strokeWidth={2.5} />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button onClick={() => insertText('# ')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Heading 1">
            <Heading1 size={14} strokeWidth={2.5} />
          </button>
          <button onClick={() => insertText('## ')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Heading 2">
            <Heading2 size={14} strokeWidth={2.5} />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button onClick={() => insertText('- ')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="List">
            <List size={14} strokeWidth={2.5} />
          </button>
          <button onClick={() => insertText('> ')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Quote">
            <Quote size={14} strokeWidth={2.5} />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button onClick={() => insertText('[', '](url)')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Link">
            <LinkIcon size={14} strokeWidth={2.5} />
          </button>
          <button onClick={() => setIsIconPickerOpen(true)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors" title="Insert Icon">
            <Sticker size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Help Button */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="ml-2 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          title="Icon Usage Guide"
        >
          <HelpCircle size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative group bg-white/30">
        <textarea
          ref={textareaRef}
          className="absolute inset-0 w-full h-full p-8 bg-transparent text-gray-800 font-mono text-sm leading-relaxed resize-none focus:outline-none selection:bg-black/10 placeholder-gray-400 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          value={resume.content_markdown || ''}
          onChange={handleChange}
          onSelect={syncSelection}
          onKeyUp={syncSelection}
          onClick={syncSelection}
          placeholder="# 您的姓名\n\n## 工作经历\n..."
          spellCheck="false"
        />
      </div>

      {/* Footer Stats & Status */}
      <div className="px-6 py-2 bg-white/50 border-t border-gray-200 text-[10px] uppercase tracking-[0.1em] text-gray-400 flex justify-between items-center backdrop-blur-sm">
        <span>Markdown Supported</span>
        <div className="flex items-center space-x-4">
          <span className={`transition-colors duration-300 ${
            saveStatus === 'saving' ? 'text-blue-500' :
            saveStatus === 'saved' ? 'text-green-500' :
            saveStatus === 'error' ? 'text-red-500' :
            'text-gray-400'
          }`}>
            {saveStatus === 'saving' ? 'Saving...' :
             saveStatus === 'saved' ? 'All changes saved' :
             saveStatus === 'error' ? 'Error saving' :
             'Unsaved changes'}
          </span>
          <span className="font-mono">{resume.content_markdown?.length || 0} chars</span>
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="使用指南 (User Guide)"
      >
        <div className="space-y-6 text-sm text-gray-600 max-h-[60vh] overflow-y-auto pr-2">

          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2">1</span>
              智能图标 (Smart Icons)
            </h4>
            <p className="mb-3 text-xs">
              系统会自动根据链接类型添加图标，无需手动插入图片。
            </p>
            <div className="space-y-2 pl-8">
               <div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                 <code>[邮箱](mailto:...)</code>
                 <span>➡️ ✉️ 自动显示信封</span>
               </div>
               <div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                 <code>[电话](tel:...)</code>
                 <span>➡️ 📞 自动显示电话</span>
               </div>
               <div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                 <code>[网站](https://...)</code>
                 <span>➡️ 🌐 自动显示地球</span>
               </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2">2</span>
              导入与导出 (Import/Export)
            </h4>
            <p className="pl-8 text-xs leading-relaxed">
              <strong>导入:</strong> 支持导入 <code>.md</code> 或 <code>.txt</code> 文件。在仪表盘新建项目时，或在编辑器工具栏点击 "导入" 按钮。<br/>
              <strong>导出:</strong> 点击工具栏右上角的 "导出 PDF" 即可生成高清简历。
            </p>
          </div>

          <div className="pb-2">
             <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2">3</span>
              模版切换 (Templates)
            </h4>
            <p className="pl-8 text-xs leading-relaxed">
              您可以随时在编辑器工具栏的下拉菜单中切换简历模版，内容会自动适配新的样式，无需重新排版。
            </p>
          </div>

          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs leading-relaxed border border-emerald-100">
            <strong>💡 提示：</strong> 不同的模板会有不同的配色方案（如金色、蓝色、绿色等），一切都是自动的！
          </div>
        </div>
      </Modal>

      {/* Icon Picker Modal */}
      <IconPicker
        isOpen={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={handleIconSelect}
      />
    </div>
  );
};

export default MarkdownEditor;

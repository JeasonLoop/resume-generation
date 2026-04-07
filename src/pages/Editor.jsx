import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useResumeStore from '../store/useResumeStore';
import MarkdownEditor from '../components/Editor/MarkdownEditor';
import Preview from '../components/Editor/Preview';
import Toolbar from '../components/Editor/Toolbar';
import AIAssistant from '../components/Editor/AIAssistant';
import PrintSettingsModal from '../components/Editor/PrintSettingsModal';
import VersionHistoryModal from '../components/Editor/VersionHistoryModal';
import { EditorSkeleton } from '../components/common/Skeleton';
import { useEditorShortcuts } from '../hooks/useKeyboardShortcuts';
import { ArrowLeft, RefreshCw, History } from 'lucide-react';
import axios from '../utils/axios';

// 新的保存方式：本地编辑状态 + 防抖保存
const Editor = () => {
  const { id } = useParams();
  const { fetchResume, isLoading, error, templates } = useResumeStore();
  const printRef = useRef();
  const textareaRef = useRef(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    lineHeight: 1.5,
    paragraphSpacing: 8,
    pageMargin: 20,
    pageSize: 'A4',
  });

  // 本地编辑状态，避免每次输入都触发store更新
  const [localContent, setLocalContent] = useState('');
  const [localTitle, setLocalTitle] = useState('');
  const [localTemplateId, setLocalTemplateId] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // 防抖保存
  useEffect(() => {
    if (!id || !isDirty || isSaving) return;

    const saveTimer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await axios.put(`/resumes/${id}`, {
          title: localTitle,
          content_markdown: localContent,
          content_json: {},
          template_id: localTemplateId
        });
        setLastSavedAt(new Date());
      } catch (err) {
        console.error('Auto save failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, 3000);

    return () => clearTimeout(saveTimer);
  }, [id, isDirty, localContent, localTitle, localTemplateId]);

  // 从服务器加载初始内容
  useEffect(() => {
    const loadResume = async () => {
      try {
        const response = await axios.get(`/resumes/${id}`);
        const resume = response.data.data;
        setLocalContent(resume.content_markdown || '');
        setLocalTitle(resume.title || '');
        setLocalTemplateId(resume.template_id || 1);
        // 同步到store的resume状态（不触发更新）
        useResumeStore.setState({ resume });
      } catch (err) {
        console.error('Failed to load resume:', err);
      }
    };

    loadResume();
  }, [id]);

  // 手动保存
  const handleSave = async () => {
    if (!id) return;

    try {
      setIsSaving(true);
      await axios.put(`/resumes/${id}`, {
        title: localTitle,
        content_markdown: localContent,
        content_json: {},
        template_id: localTemplateId
      });
      setLastSavedAt(new Date());
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenPrintModal = () => {
    setShowPrintModal(true);
  };

  // 处理内容变化
  const handleContentChange = (value) => {
    setLocalContent(value);
    setIsDirty(value !== '');
    // 使用正确的 setState 更新 store
    useResumeStore.setState(state => ({
      resume: state.resume
        ? { ...state.resume, content_markdown: value }
        : null
    }));
  };

  // 处理标题变化
  const handleTitleChange = (value) => {
    setLocalTitle(value);
    // 使用正确的 setState 更新 store
    useResumeStore.setState(state => ({
      resume: state.resume
        ? { ...state.resume, title: value }
        : null
    }));
  };

  // 处理模板切换
  const handleTemplateChange = (value) => {
    const templateId = parseInt(value);
    setLocalTemplateId(templateId);
    // 使用正确的 setState 更新 store
    useResumeStore.setState(state => ({
      resume: state.resume
        ? { ...state.resume, template_id: templateId }
        : null
    }));
  };

  // 处理编辑器选择变化（供AI助手使用）
  const handleEditorSelection = (selection) => {
    // 可以在这里更新store的editorSelection状态
  };
  useEditorShortcuts({
    onSave: handleSave,
    onExport: handleOpenPrintModal,
  });

  // 插入文本功能（从MarkdownEditor移过来）
  const insertText = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    textarea.value = newText;
    handleContentChange(newText);

    // 恢复光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleIconSelect = (iconName) => {
    const iconMarkdown = `![${iconName}](https://api.iconify.design/lucide:${iconName.toLowerCase()}.svg) `;
    insertText(iconMarkdown);
  };

  const handleRestoreVersion = (version) => {
    setLocalContent(version.content_markdown || '');
    setLocalTitle(version.title || '');
    setLocalTemplateId(version.template_id || 1);
    setIsDirty(true);
    setShowVersionModal(false);
  };

  if (isLoading) {
    return <EditorSkeleton />;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center p-8 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl max-w-md rounded-2xl">
          <div className="text-black text-6xl mb-4 font-serif">!</div>
          <h2 className="text-2xl font-bold text-black mb-2 font-serif">无法加载简历</h2>
          <p className="text-gray-500 font-light mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={14} /> 返回
            </Link>
            <button
              onClick={() => fetchResume && fetchResume()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <RefreshCw size={14} /> 重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-transparent overflow-hidden font-sans">
      {/* 顶部状态条 */}
      <div className="bg-white border-b border-gray-100 px-4 py-1 text-xs flex items-center justify-between">
        <span>编辑模式</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowVersionModal(true)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <History size={12} />
            <span>历史版本</span>
          </button>
          {isDirty && <span className="text-gray-500">未保存</span>}
          {lastSavedAt && !isDirty && (
            <span className="text-green-600">已保存</span>
          )}
          {isSaving && <span className="text-blue-500">保存中...</span>}
        </div>
      </div>

      {/* Top Navigation / Toolbar */}
      <div className="z-20">
        <Toolbar
          onOpenPrintModal={handleOpenPrintModal}
          onSave={handleSave}
          title={localTitle}
          onTitleChange={handleTitleChange}
          isSaving={isSaving}
          onTemplateChange={handleTemplateChange}
          templateId={localTemplateId}
          templates={templates}
          onContentChange={handleContentChange}
          onInsertText={insertText}
          onEditorSelection={handleEditorSelection}
        />
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-gray-100 bg-white/50 backdrop-blur-sm z-10">
          <MarkdownEditor
            content={localContent}
            onContentChange={handleContentChange}
            onInsertText={insertText}
            onIconSelect={handleIconSelect}
            onEditorSelection={handleEditorSelection}
            textareaRef={textareaRef}
          />
        </div>

        {/* Right: Preview Pane */}
        <div className="w-1/2 bg-gray-50/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent p-8">
          <Preview
            printRef={printRef}
            printSettings={printSettings}
            templates={templates}
            content={localContent}
            title={localTitle}
            templateId={localTemplateId}
          />
        </div>
      </div>

      {/* AI Assistant Overlay */}
      <AIAssistant />

      {/* Print Settings Modal */}
      <PrintSettingsModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        printSettings={printSettings}
        onSettingsChange={setPrintSettings}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        resumeId={id}
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
};

export default Editor;

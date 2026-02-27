import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useResumeStore from '../store/useResumeStore';
import MarkdownEditor from '../components/Editor/MarkdownEditor';
import Preview from '../components/Editor/Preview';
import Toolbar from '../components/Editor/Toolbar';
import AIAssistant from '../components/Editor/AIAssistant';
import PrintSettingsModal from '../components/Editor/PrintSettingsModal';
import { EditorSkeleton } from '../components/common/Skeleton';
import { useEditorShortcuts } from '../hooks/useKeyboardShortcuts';
import { Loader2 } from 'lucide-react';

const Editor = () => {
  const { id } = useParams();
  const { fetchResume, isLoading, error, saveResume } = useResumeStore();
  const printRef = useRef();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    lineHeight: 1.5,
    paragraphSpacing: 8,
    pageMargin: 20,
    pageSize: 'A4',
  });

  const handleSave = async () => {
    await saveResume();
  };

  const handleOpenPrintModal = () => {
    setShowPrintModal(true);
  };

  // Setup keyboard shortcuts
  useEditorShortcuts({
    onSave: handleSave,
    onExport: handleOpenPrintModal,
  });

  useEffect(() => {
    if (id) {
      fetchResume(id);
    }
  }, [id, fetchResume]);

  if (isLoading) {
    return <EditorSkeleton />;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center p-8 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl max-w-md rounded-2xl">
          <div className="text-black text-6xl mb-4 font-serif">!</div>
          <h2 className="text-2xl font-bold text-black mb-2 font-serif">无法加载简历</h2>
          <p className="text-gray-500 font-light">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-transparent overflow-hidden font-sans">
      {/* Top Navigation / Toolbar */}
      <div className="z-20">
        <Toolbar onOpenPrintModal={handleOpenPrintModal} />
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-gray-100 bg-white/50 backdrop-blur-sm z-10">
          <MarkdownEditor />
        </div>

        {/* Right: Preview Pane */}
        <div className="w-1/2 bg-gray-50/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent p-8">
          <Preview printRef={printRef} printSettings={printSettings} />
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
    </div>
  );
};

export default Editor;

import React, { useState } from 'react';
import useResumeStore from '../../store/useResumeStore';
import axios from '../../utils/axios';
import { Sparkles, X, Loader2, Wand2, Terminal, ArrowRight } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { resume, updateContent } = useResumeStore();

  const handleOptimize = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      const response = await axios.post('/ai/optimize', {
        content: input,
        type: 'general',
        industry: 'Tech' // Could be dynamic
      });
      setResult(response.data.data.optimized);
    } catch (error) {
      console.error(error);
      setResult('内容生成失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (result) {
      // Append to markdown
      const newContent = (resume.content_markdown || '') + '\n\n' + result;
      updateContent(newContent);
      setResult(null);
      setInput('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 w-12 h-12 bg-black text-white flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95 group"
        title="打开 AI 助手"
      >
        <span className="font-serif italic text-lg group-hover:hidden">Ai</span>
        <Sparkles className="h-4 w-4 hidden group-hover:block" strokeWidth={1} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-12 right-12 w-[400px] bg-white border border-gray-200 p-8 z-50 flex flex-col font-sans animate-fade-in-up shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-1">智能助手</span>
          <h3 className="font-serif text-2xl text-black">
            内容<br/>策划师
          </h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-black hover:opacity-50 transition-opacity"
        >
          <X className="h-5 w-5" strokeWidth={1} />
        </button>
      </div>

      <div className="space-y-8">
        <div className="group">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-black transition-colors">
            您的指令
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-black transition-colors min-h-[100px] resize-none font-light placeholder-gray-300 text-sm"
            placeholder="请描述您想写的内容..."
          />
        </div>

        {result && (
          <div className="bg-gray-50 p-6 border-l-2 border-black">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-3">生成草稿</span>
            <p className="text-sm font-light leading-relaxed text-gray-800 whitespace-pre-wrap">{result}</p>
          </div>
        )}

        <div className="flex justify-end space-x-6 items-center pt-2">
          {!result ? (
            <button
              onClick={handleOptimize}
              disabled={isLoading || !input}
              className="chic-link text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-3 w-3" />
                  <span>策划中...</span>
                </>
              ) : (
                <>
                  <span>生成</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={1} />
                </>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={() => setResult(null)}
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
              >
                丢弃
              </button>
              <button
                onClick={handleApply}
                className="chic-btn px-6 py-2 text-[10px]"
              >
                应用
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

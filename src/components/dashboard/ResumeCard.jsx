import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowUpRight, CheckSquare, Square, Share2, X, Link2, ExternalLink, Globe, Lock } from 'lucide-react';
import axios from '../../utils/axios';

const ShareModal = ({ resume, isOpen, onClose, onUpdate }) => {
  const [isPublic, setIsPublic] = useState(resume.is_public);
  const [updating, setUpdating] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/share/${resume.id}`
    : '';

  const handleTogglePublic = async () => {
    try {
      setUpdating(true);
      await axios.put(`/resumes/${resume.id}`, {
        ...resume,
        is_public: !isPublic
      });
      setIsPublic(!isPublic);
      onUpdate(resume.id, !isPublic);
    } catch (err) {
      console.error('Failed to update share settings:', err);
      alert('更新失败，请重试');
    } finally {
      setUpdating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('链接已复制到剪贴板');
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('链接已复制到剪贴板');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-4 pr-8">分享简历</h3>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Globe size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">已公开</p>
                    <p className="text-xs text-gray-500">任何人都可以通过链接访问</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Lock size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">私有</p>
                    <p className="text-xs text-gray-500">只有您可以访问</p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleTogglePublic}
              disabled={updating}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isPublic
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPublic ? '设为私有' : '公开分享'}
            </button>
          </div>

          {/* Share Link */}
          {isPublic && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">分享链接</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Link2 size={16} />
                  复制
                </button>
              </div>
              <p className="text-xs text-gray-400">
                任何人点击此链接都可以查看这份简历
              </p>
            </div>
          )}

          {/* Open in new tab */}
          {isPublic && (
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-sm font-medium text-gray-700">在新标签页打开</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ResumeCard = ({ resume, index, viewMode, isSelected, onToggleSelection, onDelete, onUpdateShare }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

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

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShareModalOpen(true);
  };

  if (viewMode === 'grid') {
    return (
      <>
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

            {/* Share indicator */}
            {resume.is_public && (
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">
                  <Globe size={10} className="inline mr-1" /> 公开
                </span>
              </div>
            )}

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
                  onClick={handleShare}
                  className="text-gray-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="分享"
                >
                  <Share2 size={16} strokeWidth={1} />
                </button>
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
        <ShareModal
          resume={resume}
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          onUpdate={onUpdateShare}
        />
      </>
    );
  }

  // List view
  return (
    <>
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

            <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 relative">
              <span className="font-serif text-lg italic text-gray-400 group-hover:text-black transition-colors">{resume.title.charAt(0)}</span>
              {resume.is_public && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-serif text-black group-hover:underline decoration-1 underline-offset-4 decoration-gray-300 transition-all">
                {resume.title}
                {resume.is_public && <span className="ml-2 text-xs text-blue-500 font-sans align-top">(公开)</span>}
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
              onClick={handleShare}
              className="text-gray-300 hover:text-blue-500 transition-colors p-2"
              title="分享"
            >
              <Share2 size={16} strokeWidth={1} />
            </button>
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
      <ShareModal
        resume={resume}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onUpdate={onUpdateShare}
      />
    </>
  );
};

export default ResumeCard;

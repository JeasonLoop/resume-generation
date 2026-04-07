import React, { useState, useEffect } from 'react';
import { X, Clock, RotateCcw, Trash2, Loader2 } from 'lucide-react';
import axios from '../../utils/axios';

const VersionHistoryModal = ({ resumeId, isOpen, onClose, onRestore }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restoringId, setRestoringId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadVersions = async () => {
    if (!resumeId || !isOpen) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/resumes/${resumeId}/versions`);
      setVersions(response.data.data);
    } catch (err) {
      console.error('Failed to load versions:', err);
      setError('加载历史版本失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadVersions();
    }
  }, [isOpen, resumeId]);

  const handleRestore = async (versionId) => {
    if (!window.confirm('确定要恢复到此版本吗？当前内容会被保存为新版本。')) {
      return;
    }

    try {
      setRestoringId(versionId);
      const response = await axios.post(`/resumes/${resumeId}/versions/${versionId}/restore`);
      const versionData = response.data.data.resume;
      onRestore(versionData);
      onClose();
    } catch (err) {
      console.error('Failed to restore version:', err);
      alert('恢复失败，请重试');
    } finally {
      setRestoringId(null);
    }
  };

  const handleDelete = async (versionId) => {
    if (!window.confirm('确定要删除此版本吗？删除后无法恢复。')) {
      return;
    }

    try {
      setDeletingId(versionId);
      await axios.delete(`/resumes/${resumeId}/versions/${versionId}`);
      setVersions(versions.filter(v => v.id !== versionId));
    } catch (err) {
      console.error('Failed to delete version:', err);
      alert('删除失败，请重试');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">历史版本</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}

          {!loading && versions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>暂无历史版本</p>
              <p className="text-sm mt-2">每次保存自动创建新版本</p>
            </div>
          )}

          {!loading && versions.length > 0 && (
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        版本 {version.version_number}
                      </span>
                      <span className="text-xs text-gray-500">
                        {version.title}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(version.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleRestore(version.id)}
                      disabled={restoringId === version.id || deletingId === version.id}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                    >
                      {restoringId === version.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <RotateCcw size={12} />
                      )}
                      恢复
                    </button>
                    <button
                      onClick={() => handleDelete(version.id)}
                      disabled={restoringId === version.id || deletingId === version.id}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deletingId === version.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;

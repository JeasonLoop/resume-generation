import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Preview from '../components/Editor/Preview';
import { Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
import axios from '../utils/axios';

const PublicResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const loadPublicResume = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/public/resume/${id}`);
      setResume(response.data.data);
    } catch (err) {
      console.error('Failed to load public resume:', err);
      if (err.response?.status === 404) {
        setError('简历不存在或未公开');
      } else {
        setError('加载失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  // 加载模板列表
  const loadTemplates = async () => {
    try {
      const response = await axios.get('/templates');
      setTemplates(response.data.data);
    } catch (err) {
      console.error('Failed to load templates:', err);
    }
  };

  loadPublicResume();
  loadTemplates();
}, [id]);

  const getCurrentTemplate = () => {
    return templates.find(t => t.id === resume?.template_id) || templates[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl text-gray-300 mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-500">该简历可能已被设置为私有，或者链接不正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-[210mm] mx-auto mb-4 flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          分享链接由 ResumeGen 生成
        </div>
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ExternalLink size={14} />
          <span>创建你的简历</span>
        </a>
      </div>

      {/* Resume Preview */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <Preview
            printRef={null}
            printSettings={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              lineHeight: 1.5,
              paragraphSpacing: 8,
              pageMargin: 0,
              pageSize: 'A4',
            }}
            templates={templates}
            content={resume?.content_markdown || ''}
            title={resume?.title || ''}
            templateId={resume?.template_id || 1}
          />
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto mt-6 text-center text-xs text-gray-400">
        Powered by ResumeGen
      </div>
    </div>
  );
};

export default PublicResume;

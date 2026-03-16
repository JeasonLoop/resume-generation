import { create } from 'zustand';
import axios from '../utils/axios';

const useResumeStore = create((set, get) => ({
  resume: null,
  isLoading: false,
  error: null,
  templates: [],

  editorSelection: { start: 0, end: 0, text: '' },
  setEditorSelection: (sel) => set({ editorSelection: sel }),

  // 初始化编辑器状态（用于从服务器同步内容到本地编辑器）
  initEditorState: (resume) => {
    if (resume) {
      return {
        content_markdown: resume.content_markdown || '',
        title: resume.title || '',
        template_id: resume.template_id || 1
      };
    }
    return { content_markdown: '', title: '', template_id: 1 };
  },

  // 保存简历到服务器
  saveResume: async (id, title, content_markdown, template_id) => {
    try {
      set({ isLoading: true, error: null });
      await axios.put(`/resumes/${id}`, {
        title,
        content_markdown,
        content_json: {},
        template_id
      });
      set({ isLoading: false, resume: { id, title, content_markdown, template_id } });
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      set({ isLoading: false, error: 'Failed to save resume' });
      return false;
    }
  },

  // 更新编辑器选择状态（用于AI助手等）
  updateEditorSelection: (selection) => set({ editorSelection: selection }),

  fetchTemplates: async () => {
    try {
      const response = await axios.get('/templates');
      set({ templates: response.data.data || [] });
    } catch {
      console.error('Failed to load templates');
    }
  },

  fetchResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/resumes/${id}`);
      set({ resume: response.data.data, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Failed to load resume' });
    }
  },
}));

export default useResumeStore;

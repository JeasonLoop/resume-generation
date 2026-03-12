import { create } from 'zustand';
import axios from '../utils/axios';

const useResumeStore = create((set, get) => ({
  resume: null,
  isLoading: false,
  isSaving: false,
  error: null,
  templates: [],

  editorSelection: { start: 0, end: 0, text: '' },
  setEditorSelection: (sel) => set({ editorSelection: sel }),

  insertAtCursor: (text) => {
    const { resume, editorSelection } = get();
    if (!resume) return;
    const md = resume.content_markdown || '';
    const { start, end } = editorSelection;
    const newMd = md.substring(0, start) + text + md.substring(end);
    set({ resume: { ...resume, content_markdown: newMd } });
  },

  replaceSelection: (text) => {
    const { resume, editorSelection } = get();
    if (!resume) return;
    const md = resume.content_markdown || '';
    const { start, end } = editorSelection;
    if (start === end) {
      const newMd = md + '\n\n' + text;
      set({ resume: { ...resume, content_markdown: newMd } });
    } else {
      const newMd = md.substring(0, start) + text + md.substring(end);
      set({ resume: { ...resume, content_markdown: newMd } });
    }
  },

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

  updateContent: (markdown) => {
    const resume = get().resume;
    if (resume) {
      set({ resume: { ...resume, content_markdown: markdown } });
    }
  },

  updateTitle: (title) => {
    const resume = get().resume;
    if (resume) {
      set({ resume: { ...resume, title } });
    }
  },

  updateTemplateId: (template_id) => {
    const resume = get().resume;
    if (resume) {
      set({ resume: { ...resume, template_id: parseInt(template_id) } });
    }
  },

  saveResume: async () => {
    const resume = get().resume;
    if (!resume) return;

    set({ isSaving: true });
    try {
      await axios.put(`/resumes/${resume.id}`, {
        title: resume.title,
        content_markdown: resume.content_markdown,
        content_json: {}, // We can parse markdown to json here if needed, or do it on backend
        template_id: resume.template_id
      });
      set({ isSaving: false });
      return true;
    } catch {
      set({ isSaving: false, error: 'Failed to save resume' });
      return false;
    }
  }
}));

export default useResumeStore;

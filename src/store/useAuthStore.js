import { create } from 'zustand';
import axios from '../utils/axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: !!localStorage.getItem('token'),
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { user, token } = response.data.data;

      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || '登录失败';
      const errorCode = error.code;

      // 判断是否是用户不存在的错误 (INVALID_CREDENTIALS = 20002)
      const shouldRegister = errorCode === 20002;

      set({
        isLoading: false,
        error: shouldRegister ? null : errorMessage
      });
      return { success: false, shouldRegister };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      const { user, token } = response.data.data;

      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || '注册失败'
      });
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuthStore;

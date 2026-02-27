import { create } from 'zustand';
import axios from '../utils/axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';

      // 判断是否是用户不存在的错误
      const shouldRegister = errorMessage === '凭证无效' || errorMessage === 'Invalid credentials';

      set({
        isLoading: false,
        error: shouldRegister ? null : errorMessage // 如果是用户不存在，不显示错误
      });
      return { success: false, shouldRegister };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed'
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
    if (!token) return;

    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data, isAuthenticated: true });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  }
}));

export default useAuthStore;

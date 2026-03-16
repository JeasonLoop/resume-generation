import { create } from 'zustand';

const useAppStore = create((set) => ({
  // 全局Loading计数，支持多个请求同时加载
  loadingCount: 0,

  // 开始加载
  startLoading: () => set((state) => ({ loadingCount: state.loadingCount + 1 })),

  // 结束加载
  stopLoading: () => set((state) => ({
    loadingCount: Math.max(0, state.loadingCount - 1)
  })),

  // 重置加载状态
  resetLoading: () => set({ loadingCount: 0 }),

  // 是否正在加载
  isLoading: () => state.loadingCount > 0,
}));

export default useAppStore;

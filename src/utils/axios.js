import axios from 'axios';
import useAppStore from '../store/useAppStore';
import { toast } from '../components/Toast';

// 刷新Token的锁，防止多个请求同时刷新
let isRefreshing = false;
// 等待刷新Token的请求队列
let refreshSubscribers = [];

// 添加请求到等待队列
const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// 刷新完成后，重试所有队列中的请求
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

// 判断是否为静默请求（不需要显示loading和toast）
const isSilentRequest = (url) => {
  if (!url) return false;

  const silentPatterns = [
    /\/resumes\/\d+/, // 匹配 /resumes/{id} 形式的简历保存接口
    /\/ai\/optimize/, // AI优化接口
    /\/ai\/suggest/, // AI建议接口
    /\/auth\/refresh/  // Token刷新接口
  ];

  return silentPatterns.some(pattern => pattern.test(url));
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // 允许携带Cookie，用于refresh token
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 静默请求不触发loading
    if (!isSilentRequest(config.url)) {
      useAppStore.getState().startLoading();
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 确保 POST/PUT 请求显式发送 application/json
    if (['post', 'put', 'patch'].includes(config.method?.toLowerCase()) && config.data) {
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    }
    return config;
  },
  (error) => {
    // 请求失败，结束加载
    if (!isSilentRequest(error.config?.url)) {
      useAppStore.getState().stopLoading();
    }
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一处理响应和错误码
instance.interceptors.response.use(
  (response) => {
    // 静默请求不结束loading
    if (!isSilentRequest(response.config.url)) {
      useAppStore.getState().stopLoading();
    }

    const { data } = response;

    // 如果后端返回了 code 字段，检查是否为错误
    if (data && typeof data.code !== 'undefined') {
      // code !== 0 表示业务错误
      if (data.code !== 0) {
        // Token 相关错误，清除登录状态并跳转
        if (data.code === 10002 || data.code === 20003 || data.code === 20004) {
          localStorage.removeItem('token');
          delete instance.defaults.headers.common['Authorization'];
          // 只有不在登录/注册页时才跳转
          if (!window.location.pathname.match(/^\/(login|register)/)) {
            window.location.href = '/login';
          }
          toast.error('登录已过期，请重新登录');
        } else {
          // 其他业务错误，显示友好提示
          toast.error(data.message || '操作失败');
        }
        // 返回一个 rejected promise，让 catch 可以捕获
        const error = new Error(data.message || '请求失败');
        error.response = response;
        error.code = data.code;
        return Promise.reject(error);
      }

      // 操作成功的提示，排除静默请求
      if (data.message && response.config.method !== 'get' && !isSilentRequest(response.config.url)) {
        toast.success(data.message);
      }
    }

    return response;
  },
  async (error) => {
    // 请求失败，结束加载
    if (!isSilentRequest(error.config?.url)) {
      useAppStore.getState().stopLoading();
    }

    const originalRequest = error.config;

    // 静默请求不显示错误提示
    if (isSilentRequest(originalRequest?.url)) {
      return Promise.reject(error);
    }

    // HTTP 网络错误处理
    if (error.response) {
      const status = error.response.status;

      // 401 未授权，尝试刷新Token
      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // 如果正在刷新Token，将当前请求加入队列
          return new Promise(resolve => {
            subscribeToRefresh((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(instance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 调用刷新Token接口
          const response = await instance.post('/auth/refresh');
          const newAccessToken = response.data.data.access_token;

          // 更新localStorage中的token
          localStorage.setItem('token', newAccessToken);

          // 更新默认请求头
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

          // 重试所有队列中的请求
          onRefreshed(newAccessToken);

          // 重试当前请求
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // 刷新失败，清除登录状态，跳转到登录页
          localStorage.removeItem('token');
          delete instance.defaults.headers.common['Authorization'];
          if (!window.location.pathname.match(/^\/(login|register)/)) {
            window.location.href = '/login';
          }
          toast.error('登录已过期，请重新登录');
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else if (status === 401) {
        // 401且不是刷新Token的情况，直接提示
        toast.error('登录已过期，请重新登录');
      } else if (status === 403) {
        // 403 禁止访问
        const errorMessage = error.response.data?.message || '您没有权限执行此操作';
        toast.error(errorMessage);
        error.message = errorMessage;
      } else if (status === 404) {
        toast.error('请求的资源不存在');
      } else if (status >= 500) {
        toast.error('服务器开小差了，请稍后重试');
      } else if (status === 429) {
        toast.error('请求过于频繁，请稍后再试');
      } else if (status === 400) {
        const errorMessage = error.response.data?.message || '请求参数错误';
        toast.error(errorMessage);
        error.message = errorMessage;
      }
    } else if (error.request) {
      // 网络错误，没有收到响应
      toast.error('网络连接失败，请检查网络设置');
    } else {
      // 请求配置错误
      toast.error('请求配置错误，请稍后重试');
    }

    return Promise.reject(error);
  }
);

export default instance;

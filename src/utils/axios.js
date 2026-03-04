import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
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
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一处理响应和错误码
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 如果后端返回了 code 字段，检查是否为错误
    if (data && typeof data.code !== 'undefined') {
      // code !== 0 表示业务错误
      if (data.code !== 0) {
        // Token 相关错误，清除登录状态并跳转
        if (data.code === 10002 || data.code === 20003 || data.code === 20004) {
          localStorage.removeItem('token');
          // 只有不在登录/注册页时才跳转
          if (!window.location.pathname.match(/^\/(login|register)/)) {
            window.location.href = '/login';
          }
        }
        // 返回一个 rejected promise，让 catch 可以捕获
        const error = new Error(data.message || '请求失败');
        error.response = response;
        error.code = data.code;
        return Promise.reject(error);
      }
    }
    
    return response;
  },
  (error) => {
    // HTTP 网络错误处理
    if (error.response) {
      const status = error.response.status;
      
      // 401 未授权
      if (status === 401) {
        localStorage.removeItem('token');
        if (!window.location.pathname.match(/^\/(login|register)/)) {
          window.location.href = '/login';
        }
      }
      
      // 403 禁止访问
      if (status === 403) {
        error.message = error.response.data?.message || '无权限访问';
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;

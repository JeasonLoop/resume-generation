import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext();

let toastIdCounter = 0;
// 全局toast实例，用于非组件环境调用
let globalToast = null;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastIdCounter;
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    // 自动关闭
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toastMethods = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    hide: hideToast
  };

  // 保存全局实例
  useEffect(() => {
    globalToast = toastMethods;
    return () => {
      globalToast = null;
    };
  }, [toastMethods]);

  // 不同类型的样式
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const typeIcons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}

      {/* Toast 容器 */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-sm flex items-center gap-3 animate-fade-in ${typeStyles[toast.type]}`}
            role="alert"
            style={{ animationDelay: '0s' }}
          >
            <span className="text-base flex-shrink-0">{typeIcons[toast.type]}</span>
            <p className="flex-1 text-sm font-medium leading-tight">{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none flex-shrink-0 transition-colors"
              aria-label="关闭提示"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// 全局toast方法，用于非组件环境
export const toast = {
  success: (message, duration) => {
    if (globalToast) return globalToast.success(message, duration);
    console.log('Toast (success):', message);
  },
  error: (message, duration) => {
    if (globalToast) return globalToast.error(message, duration);
    console.error('Toast (error):', message);
  },
  warning: (message, duration) => {
    if (globalToast) return globalToast.warning(message, duration);
    console.warn('Toast (warning):', message);
  },
  info: (message, duration) => {
    if (globalToast) return globalToast.info(message, duration);
    console.info('Toast (info):', message);
  }
};

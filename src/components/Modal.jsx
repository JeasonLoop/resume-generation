import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl w-500 ${sizeClasses[size]} transform transition-all animate-fade-in-up`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-serif font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className={size === 'xl' || size === 'full' ? 'p-2' : 'p-6'}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

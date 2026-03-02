import React from 'react';
import { X, AlertTriangle, Check, Trash2, LogOut } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '确认操作',
  message = '确定要执行此操作吗？',
  confirmText = '确认',
  cancelText = '取消',
  type = 'warning', // 'warning' | 'danger' | 'success'
  icon: Icon,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmBtn: 'bg-red-600 hover:bg-red-700',
          iconEl: Icon || Trash2,
        };
      case 'success':
        return {
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          confirmBtn: 'bg-green-600 hover:bg-green-700',
          iconEl: Icon || Check,
        };
      default:
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          confirmBtn: 'bg-black hover:bg-gray-800',
          iconEl: Icon || AlertTriangle,
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.iconEl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold font-serif text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`${styles.iconBg} p-3 rounded-full flex-shrink-0`}>
              <IconComponent className={`h-6 w-6 ${styles.iconColor}`} />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-gray-600 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2 ${styles.confirmBtn}`}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>处理中...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// 预设的确认对话框
export const DeleteConfirmDialog = ({ isOpen, onClose, onConfirm, itemName = '此项目', isLoading }) => (
  <ConfirmDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="删除确认"
    message={`确定要删除「${itemName}」吗？此操作无法撤销。`}
    confirmText="删除"
    type="danger"
    isLoading={isLoading}
  />
);

export const LogoutConfirmDialog = ({ isOpen, onClose, onConfirm, isLoading }) => (
  <ConfirmDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="退出登录"
    message="确定要退出登录吗？"
    confirmText="退出"
    type="warning"
    icon={LogOut}
    isLoading={isLoading}
  />
);

export default ConfirmDialog;

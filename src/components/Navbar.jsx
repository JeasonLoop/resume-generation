import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { LogOut, User, Menu, HelpCircle, Keyboard } from 'lucide-react';
import { LogoutConfirmDialog } from './common/ConfirmDialog';
import Modal from './Modal';
import ShortcutHelp from './common/ShortcutHelp';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center group">
                <span className="text-2xl font-serif font-bold tracking-tight text-black group-hover:text-gray-600 transition-colors">
                  RESUME<span className="font-light italic">.gen</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              {/* About Page Link */}
              <Link to="/about" className="hidden md:flex items-center space-x-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                <HelpCircle size={14} strokeWidth={1.5} />
                <span>关于</span>
              </Link>

              {/* Shortcuts Help Button */}
              <button
                onClick={() => setShowShortcuts(true)}
                className="hidden md:flex items-center space-x-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
                title="键盘快捷键">
                <Keyboard size={14} strokeWidth={1.5} />
                <span>快捷键</span>
              </button>

              <div className="hidden md:flex items-center space-x-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                <User size={14} strokeWidth={1.5} />
                <span>{user?.name}</span>
              </div>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="chic-link">
                <span className="flex items-center space-x-2">
                  <span>退出登录</span>
                  <LogOut size={14} strokeWidth={1} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation */}
      <LogoutConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      {/* Shortcuts Help Modal */}
      <Modal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        title="键盘快捷键">
        <div className="py-4">
          <ShortcutHelp />
        </div>
      </Modal>
    </>
  );
};

export default Navbar;

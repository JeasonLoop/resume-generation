import { useEffect, useCallback } from 'react';

// Keyboard shortcut definitions
export const SHORTCUTS = {
  SAVE: {
    key: 's',
    ctrl: true,
    meta: true,
    description: '保存简历',
  },
  EXPORT: {
    key: 'p',
    ctrl: true,
    meta: true,
    description: '导出 PDF',
  },
  NEW: {
    key: 'n',
    ctrl: true,
    meta: true,
    shift: true,
    description: '新建简历',
  },
};

export const useKeyboardShortcuts = (shortcuts) => {
  const handleKeyDown = useCallback(
    (event) => {
      for (const [action, config] of Object.entries(shortcuts)) {
        const { key, ctrl, meta, shift, alt, callback, preventDefault = true } = config;

        // Skip if no callback
        if (!callback) continue;

        // Check key match (case-insensitive)
        const keyMatch = event.key.toLowerCase() === key.toLowerCase();

        // Check modifier keys
        const ctrlMatch = !ctrl || event.ctrlKey;
        const metaMatch = !meta || event.metaKey;
        const shiftMatch = !shift || event.shiftKey;
        const altMatch = !alt || event.altKey;

        // Check if any modifier is required (for ctrl/meta we usually require at least one)
        const hasModifiers = ctrl || meta || shift || alt;
        const modifierMatch = !hasModifiers || (
          (ctrl || meta ? (ctrlMatch || metaMatch) : true) &&
          shiftMatch &&
          altMatch
        );

        if (keyMatch && modifierMatch) {
          if (preventDefault) {
            event.preventDefault();
          }
          callback(event, action);
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

// Helper hook for common editor shortcuts
export const useEditorShortcuts = ({ onSave, onExport, onNew }) => {
  const shortcuts = {
    SAVE: {
      ...SHORTCUTS.SAVE,
      callback: onSave,
    },
    EXPORT: {
      ...SHORTCUTS.EXPORT,
      callback: onExport,
    },
    ...(onNew && {
      NEW: {
        ...SHORTCUTS.NEW,
        callback: onNew,
      },
    }),
  };

  useKeyboardShortcuts(shortcuts);
};

export default useKeyboardShortcuts;

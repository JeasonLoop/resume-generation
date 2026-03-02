import { SHORTCUTS } from '../../hooks/useKeyboardShortcuts';

const ShortcutHelp = ({ className = '' }) => {
  return (
    <div className={`space-y-2 text-sm ${className}`}>
      <h4 className="font-medium text-gray-900 mb-3">键盘快捷键</h4>
      {Object.entries(SHORTCUTS).map(([key, shortcut]) => (
        <div key={key} className="flex items-center justify-between">
          <span className="text-gray-600">{shortcut.description}</span>
          <div className="flex items-center space-x-1">
            {(shortcut.ctrl || shortcut.meta) && (
              <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">
                {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
              </kbd>
            )}
            {shortcut.shift && (
              <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">
                ⇧
              </kbd>
            )}
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200 uppercase">
              {shortcut.key}
            </kbd>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShortcutHelp;

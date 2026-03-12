import React from 'react';
import * as Icons from 'lucide-react';
import Modal from './Modal';

// Selected 50+ common icons for resume
const COMMON_ICONS = [
  // Contact & Social
  'Mail', 'Phone', 'Globe', 'MapPin', 'Linkedin', 'Github', 'Twitter', 'Facebook', 'Instagram', 'Youtube', 'Link', 'AtSign',
  // Work & Education
  'Briefcase', 'GraduationCap', 'Award', 'BookOpen', 'Certificate', 'Building', 'Calendar', 'Clock', 'Target', 'Trophy',
  // Skills & Tools
  'Code', 'Terminal', 'Cpu', 'Database', 'Layout', 'Figma', 'PenTool', 'Wrench', 'Settings', 'Layers', 'Box', 'Cloud', 'Server', 'Smartphone', 'Monitor',
  // Soft Skills & Misc
  'User', 'Users', 'MessageSquare', 'Mic', 'Zap', 'Star', 'Heart', 'Smile', 'ThumbsUp', 'CheckCircle', 'AlertCircle', 'Info', 'HelpCircle',
  // Arrows & Shapes
  'ArrowRight', 'ChevronRight', 'Circle', 'Square', 'Triangle', 'Hash'
];

const IconPicker = ({ isOpen, onClose, onSelect }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="选择图标 (Select Icon)"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          点击图标即可复制对应的 Markdown 代码到编辑器中。
          <br />
          更多图标请访问官方库: <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lucide Icons</a>
        </p>

        <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-2 border border-gray-100 rounded-xl bg-gray-50/50">
          {COMMON_ICONS.map((iconName) => {
            const IconComponent = Icons[iconName];
            if (!IconComponent) return null;

            return (
              <button
                key={iconName}
                onClick={() => onSelect(iconName)}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm hover:scale-105 transition-all group"
                title={iconName}
              >
                <IconComponent size={20} strokeWidth={1.5} className="text-gray-600 group-hover:text-black mb-1" />
                <span className="text-[10px] text-gray-400 group-hover:text-gray-600 truncate w-full text-center">
                  {iconName}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-xs border border-blue-100">
          <strong>提示：</strong> 虽然这里提供了图标选择，但我们建议优先使用系统自动生成的图标（如邮箱、电话等），以保持样式的一致性。这些手动插入的图标适用于特殊需求。
          <br/>
          插入格式为: <code className="bg-white px-1 rounded border border-blue-200">![icon](https://api.iconify.design/lucide:{'{icon_name}'}.svg)</code>
        </div>
      </div>
    </Modal>
  );
};

export default IconPicker;

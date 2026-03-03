import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, Crown } from 'lucide-react';
import Modal from '../Modal';

const TemplatePreview = ({ isOpen, onClose, template, content }) => {
  if (!template) return null;

  const sampleContent = content || `# 张三

[your.email@example.com](mailto:your.email@example.com) | [123-456-7890](tel:1234567890) | [个人网站](https://example.com)

## 个人总结

富有激情和创造力的专业人士，拥有5年以上的行业经验。擅长团队协作、项目管理和创新解决方案的设计与实施。致力于通过技术和设计提升用户体验。

## 工作经历

### 高级项目经理 | 某知名科技公司
*2020年1月 - 至今*

- 领导跨职能团队完成核心产品的迭代开发，提升用户活跃度30%
- 优化敏捷开发流程，缩短产品上市周期20%
- 负责与关键客户沟通需求，确保项目交付符合预期标准

### 软件工程师 | 某初创企业
*2017年6月 - 2019年12月*

- 参与核心业务系统的架构设计与编码实现
- 解决高并发场景下的性能瓶颈，系统吞吐量提升50%

## 教育背景

### 计算机科学与技术 | 某重点大学
*本科 | 2013年9月 - 2017年6月*

## 技能特长

- **编程语言**: JavaScript, Python, Java
- **框架/工具**: React, Node.js, Docker
- **语言能力**: 英语 (流利), 中文 (母语)
`;

  const customStyles = template.css_styles || '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={template.name} size="full">
      <div className="space-y-2 p-4">
        <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '75vh' }}>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{template.category} / {template.style}</span>
            {template.is_premium && (
              <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full font-medium">
                <Crown size={10} /> Premium
              </span>
            )}
          </div>
          
          <div className="overflow-y-auto p-6 h-full" style={{ height: 'calc(75vh - 36px)' }}>
            <style>{customStyles}</style>
            <div
              className="bg-white shadow-2xl mx-auto resume"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                padding: '48px 56px',
                width: '210mm',
                minHeight: '297mm'
              }}
            >
              <style>{`
                .resume h1 { margin-top: 0; margin-bottom: 0.3em; font-weight: 600; }
                .resume h2, .resume h3, .resume h4 { margin-top: 1em; margin-bottom: 0.3em; font-weight: 600; }
                .resume p { margin-bottom: 6px; }
                .resume ul, .resume ol { margin-bottom: 6px; }
                .resume li { margin-bottom: 2px; }
                .resume h1:first-child { margin-top: 0; }
              `}</style>
              <div className="prose max-w-none prose-sm prose-headings:mb-2 prose-headings:mt-4 prose-p:my-1 prose-li:my-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {sampleContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center text-[11px] text-gray-400 p-2">
          <Eye size={12} className="mr-1.5" />
          <span>{content ? '当前简历预览' : '模板预览 — 实际内容将在编辑时显示'}</span>
        </div>
      </div>
    </Modal>
  );
};

export default TemplatePreview;

import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

// XSS过滤配置（移到组件外，避免每次重新创建）
const sanitizeConfig = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'em', 'strong', 'del',
    'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr',
    'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span',
    'b', 'i', 'u', 's', 'sup', 'sub'
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['align', 'valign', 'width'],
    th: ['align', 'valign', 'width'],
    '*': ['class', 'style', 'id', 'data-*']
  },
  allowedStyles: {
    '*': {
      'color': [/^#?[0-9a-fA-F]{3,6}$/, /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d*\.?\d+\s*)?\)$/, /^[a-z]+$/],
      'background-color': [/^#?[0-9a-fA-F]{3,6}$/, /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d*\.?\d+\s*)?\)$/, /^[a-z]+$/],
      'font-size': [/^\d+(?:px|em|rem|pt|%)?$/],
      'font-weight': [/^\d+$/, /^(normal|bold|bolder|lighter)$/],
      'font-style': [/^(normal|italic|oblique)$/],
      'text-align': [/^(left|center|right|justify)$/],
      'text-decoration': [/^(none|underline|overline|line-through)$/],
      'margin': [/^\d+(?:px|em|rem|pt|%)?\s*(?:\d+(?:px|em|rem|pt|%)?\s*){0,3}$/],
      'padding': [/^\d+(?:px|em|rem|pt|%)?\s*(?:\d+(?:px|em|rem|pt|%)?\s*){0,3}$/],
      'border': [/.*/],
      'border-radius': [/^\d+(?:px|em|rem|pt|%)?$/],
      'line-height': [/^\d*\.?\d+(?:px|em|rem|pt|%)?$/],
    }
  },
  allowedProtocols: {
    a: ['http', 'https', 'mailto', 'tel'],
    img: ['http', 'https', 'data']
  },
};

// 预览样式模板字符串（静态，避免每次创建）
const getPreviewStyles = (paragraphSpacing) => `
  .resume h1,
  .resume h2,
  .resume h3,
  .resume h4 {
    margin-top: 1em;
    margin-bottom: 0.3em;
    font-weight: 600;
  }
  .resume p {
    margin-bottom: ${paragraphSpacing}px;
  }
  .resume ul,
  .resume ol {
    margin-bottom: ${paragraphSpacing}px;
  }
  .resume li {
    margin-bottom: 2px;
  }
`;

const Preview = memo(({ printRef, printSettings, templates, content, title, templateId }) => {
  if (!content) return null;

  const selectedTemplate = templates?.find(t => t.id === templateId);
  const customStyles = selectedTemplate?.css_styles || '';

  const sanitizedStyles = customStyles
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/url\s*\(\s*(['"]?)\s*javascript:/gi, 'url($1')
    .replace(/<\/?style[^>]*>/gi, '');

  const settings = printSettings || {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    lineHeight: 1.5,
    paragraphSpacing: 8,
    pageMargin: 20,
    pageSize: 'A4',
  };

  return (
    <div className="h-full bg-gray-100 overflow-y-auto p-8 flex justify-center print:bg-white print:p-0 print:overflow-visible">
      <style>{sanitizedStyles}</style>
      <div
        ref={printRef}
        className="bg-white shadow-lg w-[210mm] min-h-[297mm] box-border resume print:shadow-none"
        style={{
          fontFamily: settings.fontFamily,
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          padding: `${settings.pageMargin}mm`,
        }}
      >
        <style>{getPreviewStyles(settings.paragraphSpacing)}</style>
        <div className="prose max-w-none prose-sm prose-headings:mb-2 prose-headings:mt-4 prose-p:my-1 prose-li:my-0" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeSanitize, sanitizeConfig]]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
});

export default Preview;

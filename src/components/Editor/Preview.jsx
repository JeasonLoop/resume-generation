import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useResumeStore from '../../store/useResumeStore';

const Preview = ({ printRef, printSettings }) => {
  const { resume, templates } = useResumeStore();

  if (!resume) return null;

  // Find the selected template to apply styles
  const selectedTemplate = templates.find(t => t.id === resume.template_id);
  const customStyles = selectedTemplate?.css_styles || '';

  const settings = printSettings || {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    lineHeight: 1.5,
    paragraphSpacing: 8,
    pageMargin: 20,
  };

  return (
    <div className="h-full bg-gray-100 overflow-y-auto p-8 flex justify-center print:bg-white print:p-0 print:overflow-visible">
      <style>{customStyles}</style>
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
        <style>{`
          .resume h1,
          .resume h2,
          .resume h3,
          .resume h4 {
            margin-top: 1em;
            margin-bottom: 0.3em;
            font-weight: 600;
          }
          .resume p {
            margin-bottom: ${settings.paragraphSpacing}px;
          }
          .resume ul,
          .resume ol {
            margin-bottom: ${settings.paragraphSpacing}px;
          }
          .resume li {
            margin-bottom: 2px;
          }
        `}</style>
        <div className="prose max-w-none prose-sm prose-headings:mb-2 prose-headings:mt-4 prose-p:my-1 prose-li:my-0" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {resume.content_markdown || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Preview;

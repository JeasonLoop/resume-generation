import { getCommonIconsCss } from './common.js';

export const modernTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '科技蓝调 (Tech Blue)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; letter-spacing: -0.5px; }
        h1 + p { color: #64748b; margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; font-size: 0.95rem; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px; margin-top: 2rem; margin-bottom: 1rem; background: #eff6ff; padding: 0.5rem 1rem; border-left: 4px solid #3b82f6; border-radius: 0 4px 4px 0; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0f172a; margin-top: 1.2rem; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-style: italic; margin-bottom: 0.5rem; }
        ul { padding-left: 1.2rem; }
        li { margin-bottom: 0.3rem; }
        li::marker { color: #3b82f6; }
        a { color: #2563eb; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(31%) sepia(96%) saturate(2048%) hue-rotate(211deg) brightness(96%) contrast(94%); opacity: 0.7; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '专业时间轴 (Timeline Pro)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #4b5563; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.4rem; font-weight: 900; color: #111827; letter-spacing: -1px; }
        h1 + p { color: #6b7280; margin-bottom: 2rem; font-size: 0.95rem; display: flex; gap: 15px; flex-wrap: wrap; }
        h2 { font-size: 1.3rem; font-weight: 800; color: #111827; margin-top: 2.5rem; margin-bottom: 1.5rem; border-bottom: 3px solid #111827; padding-bottom: 0.3rem; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin-top: 1.5rem; position: relative; }
        h3::before { content: ""; position: absolute; left: -21px; top: 8px; width: 10px; height: 10px; background: #111827; border-radius: 50%; box-shadow: 0 0 0 3px #ffffff, 0 0 0 4px #111827; }
        .resume > ul, .resume > p { padding-left: 0; }
        h3 ~ p, h3 ~ ul { padding-left: 20px; border-left: 2px solid #e5e7eb; margin-left: -16px; margin-bottom: 0; padding-bottom: 1rem; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 500; margin-top: 0.2rem; margin-bottom: 0.5rem; }
        li { margin-bottom: 0.4rem; }
        a { color: #111827; font-weight: 600; text-decoration: none; border-bottom: 1px solid #d1d5db; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'education'] }),
      is_premium: false
    },
    {
      name: '青色划线 (Teal Underline)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Roboto", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: 300; color: #111827; margin-bottom: 5px; }
        h1 + p { color: #6b7280; font-size: 0.9rem; margin-bottom: 25px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin-top: 30px; margin-bottom: 15px; position: relative; padding-bottom: 5px; display: inline-block; }
        h2::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: #0d9488; border-radius: 2px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0f766e; margin-top: 20px; }
        h3 + p { color: #4b5563; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
        a { color: #0d9488; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '侧边栏分割 (Sidebar Split)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Helvetica Neue", Arial, sans-serif; color: #4a4a4a; line-height: 1.6; background: #ffffff; padding: 40px; display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        h1 { font-size: 2.4rem; font-weight: 800; color: #2c3e50; margin-bottom: 5px; grid-column: 1 / -1; }
        h1 + p { color: #7f8c8d; font-size: 0.95rem; margin-bottom: 30px; grid-column: 1 / -1; border-bottom: 2px solid #ecf0f1; padding-bottom: 20px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #2c3e50; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; margin-bottom: 15px; border-left: 4px solid #3498db; padding-left: 10px; }
        h3 { font-size: 1.05rem; font-weight: 700; color: #34495e; margin-top: 20px; }
        h3 + p { color: #7f8c8d; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 18px; margin-bottom: 20px; }
        li { margin-bottom: 5px; }
        li::marker { color: #3498db; }
        a { color: #3498db; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills', 'education'] }),
      is_premium: true
    }
  ];
};

import { getCommonIconsCss } from './common.js';

export const professionalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '华尔街精英 (Wall Street)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Garamond", serif; color: #1a1a1a; line-height: 1.4; background: #ffffff; padding: 50px; }
        h1 { font-size: 2.4rem; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px; }
        h1 + p { text-align: center; font-size: 0.9rem; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
        h2 { font-size: 1.1rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 25px; margin-bottom: 12px; padding-bottom: 2px; }
        h3 { font-size: 1.05rem; font-weight: bold; margin-top: 15px; display: flex; justify-content: space-between; }
        h3 + p { font-style: italic; font-size: 0.95rem; color: #444; margin-bottom: 8px; }
        ul { padding-left: 20px; list-style-type: disc; }
        li { margin-bottom: 4px; text-align: justify; }
        a { color: #000; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '硅谷之光 (Silicon Valley)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 45px; }
        h1 { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        h1 + p { font-size: 1rem; color: #64748b; margin-bottom: 35px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 30px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        h2::after { content: ""; flex: 1; height: 1px; background: #e2e8f0; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #1e293b; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #3b82f6; font-weight: 600; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { color: #94a3b8; }
        a { color: #2563eb; font-weight: 500; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '蓝色经典 (Classic Blue)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Roboto", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 45px; border-left: 10px solid #1e40af; }
        h1 { font-size: 2.6rem; font-weight: 900; color: #1e3a8a; margin-bottom: 5px; }
        h1 + p { font-size: 1rem; color: #6b7280; margin-bottom: 35px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #1e40af; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #dbeafe; padding-bottom: 5px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #1e40af; font-weight: 500; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        li::marker { color: #1e40af; }
        a { color: #1e40af; font-weight: 600; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
    },
    {
      name: '深邃灰调 (Deep Grey)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Lato", sans-serif; color: #333; line-height: 1.6; background: #fdfdfd; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 900; color: #2c3e50; margin-bottom: 5px; }
        h1 + p { font-size: 1rem; color: #7f8c8d; margin-bottom: 35px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #fff; background: #2c3e50; padding: 6px 15px; margin-top: 30px; margin-bottom: 15px; display: inline-block; border-radius: 4px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #2c3e50; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #3498db; font-weight: 700; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { color: #2c3e50; }
        a { color: #2980b9; font-weight: 600; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects'] }),
      is_premium: true
    }
  ];
};

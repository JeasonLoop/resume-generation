import { getCommonIconsCss } from './common.js';

export const modernTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '未来主义 (Neo Future)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Outfit", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; letter-spacing: -0.03em; }
        h1 + p { font-size: 1rem; color: #64748b; margin-bottom: 30px; font-weight: 500; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #1e293b; margin-top: 35px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        h2::before { content: ""; width: 32px; height: 4px; background: #6366f1; border-radius: 2px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #6366f1; font-weight: 600; margin-bottom: 12px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; position: relative; }
        li::marker { color: #a855f7; }
        a { color: #6366f1; text-decoration: none; font-weight: 600; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '渐变呼吸 (Gradient Breath)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #475569; line-height: 1.7; background: #f8fafc; padding: 50px; }
        .resume > *:first-child { background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 40px; margin: -50px -50px 40px -50px; }
        h1 { font-size: 2.8rem; font-weight: 800; margin-bottom: 8px; background: linear-gradient(to right, #1e293b, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        h1 + p { font-size: 1rem; color: #64748b; font-weight: 500; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 35px; margin-bottom: 20px; border-left: 4px solid #3b82f6; padding-left: 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #3b82f6; font-weight: 500; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #2563eb; font-weight: 600; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '极简阴影 (Soft Shadow)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Plus Jakarta Sans", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 45px; }
        h1 { font-size: 2.6rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        h1 + p { color: #64748b; margin-bottom: 35px; display: flex; gap: 20px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-top: 35px; margin-bottom: 20px; background: #f1f5f9; padding: 10px 20px; border-radius: 12px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { color: #3b82f6; }
        a { color: #0f172a; font-weight: 700; text-decoration: underline; text-decoration-color: #cbd5e1; text-underline-offset: 4px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects'] }),
      is_premium: false
    },
    {
      name: '动感青绿 (Dynamic Teal)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Urbanist", sans-serif; color: #1e293b; line-height: 1.6; background: #fff; padding: 45px; border-top: 10px solid #0d9488; }
        h1 { font-size: 3.2rem; font-weight: 900; color: #0f172a; margin-bottom: 5px; letter-spacing: -0.04em; }
        h1 + p { font-size: 1.1rem; color: #0d9488; font-weight: 700; margin-bottom: 35px; }
        h2 { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-top: 35px; margin-bottom: 20px; display: flex; align-items: center; }
        h2::after { content: ""; flex: 1; height: 2px; background: #ccfbf1; margin-left: 15px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #111827; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #0d9488; font-weight: 600; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { content: "→ "; color: #0d9488; }
        a { color: #0d9488; font-weight: 700; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
    }
  ];
};

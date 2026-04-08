import { getCommonIconsCss } from './common.js';

export const techTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '代码极客 (Code Geek)',
      category: 'Tech',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Fira Code", monospace; color: #d1d5db; line-height: 1.6; background: #0f172a; padding: 45px; border-radius: 12px; }
        h1 { font-size: 2.4rem; font-weight: 700; color: #38bdf8; margin-bottom: 10px; }
        h1::before { content: "const name = '"; color: #94a3b8; font-weight: 400; font-size: 1.2rem; }
        h1::after { content: "';"; color: #94a3b8; font-weight: 400; font-size: 1.2rem; }
        h1 + p { font-size: 1rem; color: #818cf8; margin-bottom: 40px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #fbbf24; margin-top: 35px; margin-bottom: 20px; }
        h2::before { content: "## "; color: #64748b; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #38bdf8; margin-top: 25px; }
        h3::before { content: "### "; color: #64748b; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; margin-top: 4px; }
        ul { padding-left: 20px; list-style-type: none; }
        li { margin-bottom: 8px; position: relative; }
        li::before { content: "- "; color: #38bdf8; position: absolute; left: -15px; }
        a { color: #38bdf8; text-decoration: none; border-bottom: 1px dashed #38bdf8; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(80%) sepia(20%) saturate(1000%) hue-rotate(180deg); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: true
    },
    {
      name: '终端控制台 (Terminal)',
      category: 'Tech',
      style: 'dark',
      css_styles: `
        .resume { font-family: "JetBrains Mono", monospace; color: #10b981; line-height: 1.5; background: #000; padding: 40px; border: 1px solid #10b981; }
        h1 { font-size: 2.2rem; font-weight: 700; color: #fff; margin-bottom: 10px; }
        h1::before { content: "$ whoami "; color: #10b981; font-size: 1rem; }
        h1 + p { font-size: 0.9rem; color: #10b981; margin-bottom: 40px; opacity: 0.8; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #000; background: #10b981; padding: 4px 12px; margin-top: 30px; margin-bottom: 20px; display: inline-block; }
        h3 { font-size: 1.05rem; font-weight: 700; color: #fff; margin-top: 20px; }
        h3::before { content: "> "; color: #10b981; }
        h3 + p { font-size: 0.85rem; color: #10b981; margin-top: 4px; }
        ul { padding-left: 20px; list-style-type: square; }
        li { margin-bottom: 6px; }
        a { color: #fff; text-decoration: underline; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(100deg); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '极简算法 (Algorithm)',
      category: 'Tech',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Roboto Mono", monospace; color: #334155; line-height: 1.6; background: #fff; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 5px; }
        h1 + p { font-size: 0.95rem; color: #64748b; margin-bottom: 35px; border-left: 4px solid #e2e8f0; padding-left: 15px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 35px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; font-weight: 500; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { content: "0x"; color: #cbd5e1; font-size: 0.8rem; }
        a { color: #0f172a; font-weight: 700; text-decoration: none; border-bottom: 2px solid #38bdf8; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: false
    },
    {
      name: '矩阵空间 (Matrix)',
      category: 'Tech',
      style: 'dark',
      css_styles: `
        .resume { font-family: "Share Tech Mono", monospace; color: #00ff41; line-height: 1.4; background: #000; padding: 50px; }
        h1 { font-size: 3rem; font-weight: 400; color: #00ff41; text-align: center; text-shadow: 0 0 10px #00ff41; margin-bottom: 10px; }
        h1 + p { text-align: center; color: #008f11; font-size: 1.1rem; margin-bottom: 50px; text-transform: uppercase; letter-spacing: 10px; }
        h2 { font-size: 1.4rem; font-weight: 400; color: #00ff41; border: 1px solid #00ff41; padding: 5px 20px; margin-top: 40px; margin-bottom: 25px; display: inline-block; }
        h3 { font-size: 1.2rem; font-weight: 400; color: #00ff41; margin-top: 30px; }
        h3 + p { color: #008f11; font-size: 0.9rem; }
        ul { padding-left: 20px; list-style-type: none; }
        li { margin-bottom: 10px; position: relative; }
        li::before { content: ">>"; color: #00ff41; position: absolute; left: -30px; }
        a { color: #00ff41; text-decoration: none; border: 1px solid #00ff41; padding: 0 5px; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(120deg) brightness(1.5); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: true
    }
  ];
};

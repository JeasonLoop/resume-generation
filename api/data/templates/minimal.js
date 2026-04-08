import { getCommonIconsCss } from './common.js';

export const minimalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '极简北欧 (Nordic Minimal)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Inter", -apple-system, sans-serif; color: #1a1a1a; line-height: 1.6; background: #ffffff; padding: 50px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 2.2rem; font-weight: 300; letter-spacing: -0.02em; margin-bottom: 8px; color: #000; }
        h1 + p { font-size: 0.9rem; color: #666; margin-bottom: 40px; letter-spacing: 0.05em; text-transform: uppercase; }
        h2 { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-top: 45px; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        h3 { font-size: 1.1rem; font-weight: 500; color: #111; margin-top: 25px; display: flex; justify-content: space-between; }
        h3 + p { font-size: 0.85rem; color: #888; margin-bottom: 12px; }
        ul { padding-left: 18px; list-style-type: square; }
        li { margin-bottom: 6px; color: #444; font-size: 0.95rem; }
        li::marker { color: #ddd; }
        a { color: #000; text-decoration: none; border-bottom: 1px solid #eee; transition: all 0.2s; }
        a:hover { border-bottom-color: #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '纯净网格 (Clean Grid)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "IBM Plex Sans", sans-serif; color: #2d3436; line-height: 1.7; background: #fff; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #000; margin-bottom: 10px; }
        h1 + p { font-size: 0.95rem; color: #636e72; margin-bottom: 35px; display: flex; gap: 15px; }
        h2 { font-size: 1rem; font-weight: 700; text-transform: uppercase; color: #000; margin-top: 35px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        h2::after { content: ""; flex: 1; height: 1px; background: #dfe6e9; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #2d3436; margin-top: 20px; }
        h3 + p { font-size: 0.85rem; color: #b2bec3; margin-bottom: 10px; font-weight: 600; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #0984e3; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '瑞士风格 (Swiss Style)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Helvetica", Arial, sans-serif; color: #000; line-height: 1.4; background: #fff; padding: 50px; }
        h1 { font-size: 4rem; font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; margin-bottom: 20px; text-transform: uppercase; }
        h1 + p { font-size: 1.1rem; font-weight: 700; margin-bottom: 50px; color: #ff3e00; }
        h2 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; border-top: 4px solid #000; padding-top: 10px; margin-top: 40px; margin-bottom: 20px; }
        h3 { font-size: 1.1rem; font-weight: 700; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; font-weight: 700; color: #666; margin-bottom: 10px; }
        ul { padding-left: 0; list-style: none; }
        li { margin-bottom: 8px; position: relative; padding-left: 20px; }
        li::before { content: "■"; position: absolute; left: 0; font-size: 8px; top: 6px; }
        a { color: #000; text-decoration: none; font-weight: 900; border-bottom: 3px solid #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '禅意留白 (Zen Space)',
      category: 'Minimal',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Noto Serif SC", serif; color: #444; line-height: 2; background: #fcfaf7; padding: 60px; }
        h1 { font-size: 2rem; font-weight: 400; color: #111; text-align: center; letter-spacing: 0.2em; margin-bottom: 15px; }
        h1 + p { font-size: 0.9rem; color: #999; text-align: center; margin-bottom: 50px; }
        h2 { font-size: 0.9rem; font-weight: 400; color: #888; text-align: center; text-transform: uppercase; letter-spacing: 0.4em; margin-top: 50px; margin-bottom: 30px; position: relative; }
        h2::before { content: ""; position: absolute; top: 50%; left: 0; width: 35%; height: 1px; background: #eee; }
        h2::after { content: ""; position: absolute; top: 50%; right: 0; width: 35%; height: 1px; background: #eee; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #222; margin-top: 30px; }
        h3 + p { font-size: 0.85rem; color: #aaa; margin-bottom: 15px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
        a { color: #666; text-decoration: none; border-bottom: 1px solid #ddd; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience'] }),
      is_premium: true
    }
  ];
};

import { getCommonIconsCss } from './common.js';

export const traditionalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '学术标准 (Academic Standard)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Times New Roman", Times, serif; color: #000; line-height: 1.5; background: #fff; padding: 50px; }
        h1 { font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 5px; }
        h1 + p { text-align: center; font-size: 1rem; margin-bottom: 30px; }
        h2 { font-size: 1.1rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 25px; margin-bottom: 15px; padding-bottom: 2px; }
        h3 { font-size: 1.05rem; font-weight: bold; margin-top: 15px; display: flex; justify-content: space-between; }
        h3 + p { font-style: italic; font-size: 1rem; margin-bottom: 8px; }
        ul { padding-left: 25px; list-style-type: disc; }
        li { margin-bottom: 5px; text-align: justify; }
        a { color: #000; text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '复古报纸 (Retro News)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Georgia", serif; color: #1a1a1a; line-height: 1.4; background: #f4f1ea; padding: 50px; border: 1px solid #d3d3d3; }
        h1 { font-size: 3.5rem; font-weight: 900; text-align: center; text-transform: uppercase; border-bottom: 4px double #000; padding-bottom: 10px; margin-bottom: 10px; }
        h1 + p { text-align: center; font-size: 1rem; font-style: italic; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 40px; }
        h2 { font-size: 1.4rem; font-weight: bold; text-transform: uppercase; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 5px 0; margin-top: 30px; margin-bottom: 20px; text-align: center; }
        h3 { font-size: 1.1rem; font-weight: bold; margin-top: 20px; }
        h3 + p { font-size: 0.95rem; color: #333; margin-bottom: 10px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; text-align: justify; }
        a { color: #000; text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '书香门第 (Literary)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Noto Serif SC", serif; color: #2c2c2c; line-height: 1.8; background: #fff; padding: 50px; }
        h1 { font-size: 2.4rem; font-weight: 700; color: #111; margin-bottom: 10px; border-left: 8px solid #111; padding-left: 20px; }
        h1 + p { color: #666; font-size: 0.95rem; margin-bottom: 40px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #111; margin-top: 40px; margin-bottom: 20px; background: #f5f5f5; padding: 5px 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 25px; }
        h3 + p { color: #666; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { content: "◈ "; color: #111; }
        a { color: #111; text-decoration: none; border-bottom: 1px solid #999; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'experience'] }),
      is_premium: false
    }
  ];
};

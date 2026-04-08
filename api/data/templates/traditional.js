import { getCommonIconsCss } from './common.js';

export const traditionalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '学术经典 (Academic Serif)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Times New Roman", Times, serif; color: #000000; line-height: 1.5; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.2rem; font-weight: normal; text-align: center; margin-bottom: 5px; }
        h1 + p { text-align: center; font-size: 0.95rem; margin-bottom: 20px; }
        h2 { font-size: 1.1rem; font-weight: bold; text-transform: uppercase; text-align: center; border-bottom: 1px solid #000; border-top: 1px solid #000; padding: 5px 0; margin-top: 25px; margin-bottom: 15px; }
        h3 { font-size: 1.05rem; font-weight: bold; margin-top: 15px; }
        h3 + p { font-style: italic; font-size: 0.95rem; }
        ul { list-style-type: disc; padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #000; text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'publications', 'experience'] }),
      is_premium: false
    },
    {
      name: '新闻纪实 (Newspaper Retro)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Times New Roman", Times, serif; color: #111; line-height: 1.5; background: #f9f7f1; padding: 40px; column-count: 2; column-gap: 40px; column-rule: 1px solid #ccc; }
        .resume > *:first-child, .resume > *:nth-child(2) { column-span: all; text-align: center; }
        h1 { font-size: 3.5rem; font-weight: bold; text-transform: uppercase; border-bottom: 4px double #111; padding-bottom: 10px; margin-bottom: 10px; }
        h1 + p { font-size: 1rem; font-style: italic; border-bottom: 1px solid #111; padding-bottom: 20px; margin-bottom: 30px; }
        h2 { font-size: 1.4rem; font-weight: bold; text-transform: uppercase; border-top: 2px solid #111; border-bottom: 2px solid #111; padding: 5px 0; margin-top: 20px; margin-bottom: 15px; text-align: center; }
        h3 { font-size: 1.1rem; font-weight: bold; margin-top: 15px; }
        h3 + p { font-size: 0.95rem; color: #444; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; text-align: justify; }
        a { color: #111; text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'publications'] }),
      is_premium: true
    },
    {
      name: '书卷墨香 (Bookish Ink)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Noto Serif SC", "Songti SC", serif; color: #2c2c2c; line-height: 1.8; background: #fcfcfc; padding: 40px; writing-mode: horizontal-tb; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #111; margin-bottom: 10px; }
        h1 + p { color: #555; font-size: 0.95rem; margin-bottom: 30px; border-bottom: 2px double #ccc; padding-bottom: 15px; }
        h2 { font-size: 1.25rem; font-weight: 700; color: #111; margin-top: 30px; margin-bottom: 15px; background: #f0f0f0; padding: 4px 10px; border-left: 4px solid #111; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 20px; }
        h3 + p { color: #666; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #000; text-decoration: none; border-bottom: 1px solid #999; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'experience', 'publications'] }),
      is_premium: false
    }
  ];
};

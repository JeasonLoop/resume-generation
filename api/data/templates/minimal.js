import { getCommonIconsCss } from './common.js';

export const minimalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '极简网格 (Minimal Grid)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -1px; margin-bottom: 5px; }
        h1 + p { color: #555; font-size: 0.9rem; margin-bottom: 30px; }
        h2 { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 30px; margin-bottom: 15px; border: 1px solid #111; padding: 8px 12px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 600; margin-top: 15px; }
        h3 + p { color: #666; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #111; text-decoration: none; border-bottom: 1px solid #111; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '纯净留白 (Clean Slate)',
      category: 'Minimal',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #4a4a4a; line-height: 1.8; background: #ffffff; padding: 60px 50px; }
        h1 { font-size: 2.2rem; font-weight: 300; color: #000; margin-bottom: 10px; letter-spacing: 2px; }
        h1 + p { color: #999; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 40px; }
        h2 { font-size: 0.85rem; font-weight: 600; color: #aaa; text-transform: uppercase; letter-spacing: 3px; margin-top: 40px; margin-bottom: 20px; }
        h3 { font-size: 1.1rem; font-weight: 500; color: #222; margin-top: 25px; }
        h3 + p { color: #888; font-size: 0.85rem; margin-bottom: 10px; }
        ul { padding-left: 15px; }
        li { margin-bottom: 8px; color: #555; }
        a { color: #444; text-decoration: none; border-bottom: 1px solid #ccc; transition: all 0.2s; }
        a:hover { color: #000; border-color: #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '极简黑白 (Monochrome Minimal)',
      category: 'Minimal',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Helvetica Neue", Helvetica, sans-serif; color: #000; line-height: 1.5; background: #fff; padding: 50px; }
        h1 { font-size: 2rem; font-weight: 500; letter-spacing: 2px; margin-bottom: 10px; }
        h1 + p { font-size: 0.85rem; color: #666; margin-bottom: 40px; }
        h2 { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; margin-top: 40px; margin-bottom: 20px; color: #999; }
        h3 { font-size: 1rem; font-weight: 600; margin-top: 20px; }
        h3 + p { font-size: 0.85rem; color: #555; margin-bottom: 10px; }
        ul { padding-left: 15px; font-size: 0.95rem; }
        li { margin-bottom: 4px; }
        a { color: #000; text-decoration: none; border-bottom: 1px solid #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '简约原色 (Basic Primary)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Open Sans", sans-serif; color: #333; line-height: 1.6; background: #fff; padding: 40px; }
        h1 { font-size: 2.4rem; font-weight: bold; color: #000; margin-bottom: 10px; }
        h1 + p { color: #666; font-size: 0.95rem; margin-bottom: 30px; border-bottom: 2px solid #0055ff; padding-bottom: 15px; display: inline-block; }
        h2 { font-size: 1.2rem; font-weight: bold; color: #000; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #0055ff; padding-bottom: 5px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #222; margin-top: 20px; }
        h3 + p { color: #555; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #0055ff; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    }
  ];
};

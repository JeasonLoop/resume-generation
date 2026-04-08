import { getCommonIconsCss } from './common.js';

export const creativeTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '波普色彩 (Pop Color)',
      category: 'Creative',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Space Grotesk", sans-serif; color: #000; line-height: 1.5; background: #fff; padding: 45px; border: 4px solid #000; box-shadow: 15px 15px 0 #ff0055; }
        h1 { font-size: 3.5rem; font-weight: 900; color: #000; text-transform: uppercase; margin-bottom: 10px; letter-spacing: -2px; }
        h1 + p { font-size: 1.2rem; background: #00ffcc; display: inline-block; padding: 5px 15px; font-weight: 900; margin-bottom: 40px; transform: rotate(-1deg); }
        h2 { font-size: 1.5rem; font-weight: 900; background: #ffff00; color: #000; padding: 5px 15px; margin-top: 40px; margin-bottom: 20px; display: inline-block; border: 3px solid #000; }
        h3 { font-size: 1.2rem; font-weight: 800; margin-top: 25px; color: #ff0055; }
        h3 + p { font-size: 1rem; font-weight: 700; color: #000; }
        ul { padding-left: 25px; list-style-type: square; }
        li { margin-bottom: 8px; font-weight: 500; }
        a { color: #000; background: #00ffcc; padding: 0 5px; font-weight: 900; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects'] }),
      is_premium: true
    },
    {
      name: '孟菲斯 (Memphis)',
      category: 'Creative',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Lexend", sans-serif; color: #2d3436; line-height: 1.6; background: #fff; padding: 50px; background-image: radial-gradient(#dfe6e9 2px, transparent 2px); background-size: 30px 30px; }
        h1 { font-size: 3rem; font-weight: 900; color: #6c5ce7; margin-bottom: 10px; }
        h1 + p { font-size: 1.1rem; color: #fd79a8; font-weight: 700; margin-bottom: 40px; }
        h2 { font-size: 1.3rem; font-weight: 900; color: #fff; background: #00cec9; padding: 8px 20px; border-radius: 50px; display: inline-block; margin-top: 35px; margin-bottom: 20px; box-shadow: 4px 4px 0 #00b894; }
        h3 { font-size: 1.2rem; font-weight: 800; color: #6c5ce7; margin-top: 25px; }
        h3 + p { font-size: 0.95rem; color: #636e72; font-weight: 600; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { color: #fab1a0; font-size: 1.5rem; }
        a { color: #e17055; font-weight: 800; text-decoration: none; border-bottom: 4px solid #ffeaa7; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '赛博霓虹 (Cyber Neon)',
      category: 'Creative',
      style: 'dark',
      css_styles: `
        .resume { font-family: "Syncopate", sans-serif; color: #fff; line-height: 1.6; background: #0a0a0a; padding: 50px; border: 2px solid #39ff14; box-shadow: 0 0 20px #39ff14; }
        h1 { font-size: 3.5rem; font-weight: 700; color: #fff; text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff; margin-bottom: 10px; text-transform: uppercase; }
        h1 + p { font-size: 1rem; color: #39ff14; letter-spacing: 5px; margin-bottom: 50px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #00ffff; text-transform: uppercase; border-bottom: 2px solid #00ffff; padding-bottom: 10px; margin-top: 40px; margin-bottom: 25px; text-shadow: 0 0 5px #00ffff; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #ff00ff; margin-top: 30px; }
        h3 + p { font-size: 0.9rem; color: #888; margin-top: 5px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
        li::marker { color: #39ff14; }
        a { color: #00ffff; text-decoration: none; border: 1px solid #00ffff; padding: 2px 8px; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(100%) brightness(200%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills', 'projects'] }),
      is_premium: true
    },
    {
      name: '艺术拼贴 (Art Collage)',
      category: 'Creative',
      style: 'bold',
      css_styles: `
        .resume { font-family: "DM Sans", sans-serif; color: #1a1a1a; line-height: 1.6; background: #f4f4f4; padding: 50px; }
        h1 { font-size: 4rem; font-weight: 900; line-height: 0.8; margin-bottom: 20px; letter-spacing: -0.05em; }
        h1 + p { font-size: 1.2rem; font-weight: 400; color: #666; margin-bottom: 50px; border-left: 10px solid #000; padding-left: 20px; }
        h2 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; margin-top: 50px; margin-bottom: 25px; background: #000; color: #fff; padding: 10px 20px; transform: skew(-10deg); display: inline-block; }
        h3 { font-size: 1.2rem; font-weight: 700; margin-top: 30px; border-bottom: 4px solid #000; display: inline-block; }
        h3 + p { font-size: 1rem; font-weight: 500; color: #444; margin-top: 8px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 12px; font-size: 1.1rem; }
        a { color: #000; font-weight: 900; text-decoration: underline; text-decoration-thickness: 4px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education'] }),
      is_premium: true
    }
  ];
};

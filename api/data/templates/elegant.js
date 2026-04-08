import { getCommonIconsCss } from './common.js';

export const elegantTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '法式优雅 (French Elegance)',
      category: 'Elegant',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Playfair Display", serif; color: #2c2c2c; line-height: 1.8; background: #fff; padding: 55px; border: 1px solid #f0f0f0; }
        h1 { font-size: 3rem; font-weight: 400; text-align: center; font-style: italic; margin-bottom: 10px; color: #1a1a1a; }
        h1 + p { text-align: center; font-size: 0.9rem; color: #888; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 50px; }
        h2 { font-size: 1.2rem; font-weight: 400; text-align: center; text-transform: uppercase; letter-spacing: 4px; color: #c5a059; margin-top: 45px; margin-bottom: 25px; position: relative; }
        h2::after { content: ""; display: block; width: 40px; height: 1px; background: #c5a059; margin: 10px auto 0; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #333; margin-top: 30px; }
        h3 + p { font-size: 0.9rem; color: #999; font-style: italic; margin-bottom: 12px; }
        ul { padding-left: 20px; list-style-type: circle; }
        li { margin-bottom: 8px; color: #555; }
        a { color: #c5a059; text-decoration: none; border-bottom: 1px solid #e5d5b5; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '大理石纹 (Marble Texture)',
      category: 'Elegant',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Montserrat", sans-serif; color: #444; line-height: 1.7; background: #ffffff; padding: 50px; background-image: radial-gradient(#f0f0f0 1px, transparent 1px); background-size: 20px 20px; }
        h1 { font-size: 2.8rem; font-weight: 300; color: #000; margin-bottom: 5px; letter-spacing: 5px; text-transform: uppercase; text-align: center; }
        h1 + p { text-align: center; font-size: 0.9rem; color: #666; margin-bottom: 40px; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 10px 0; display: inline-block; width: 100%; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 2px; margin-top: 40px; margin-bottom: 20px; border-left: 5px solid #000; padding-left: 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #222; margin-top: 25px; }
        h3 + p { font-size: 0.85rem; color: #888; font-weight: 600; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #000; font-weight: 700; text-decoration: none; box-shadow: inset 0 -2px 0 #eee; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '香槟晨曦 (Champagne Dawn)',
      category: 'Elegant',
      style: 'soft',
      css_styles: `
        .resume { font-family: "Lora", serif; color: #5d5c5c; line-height: 1.8; background: #fffcf9; padding: 50px; }
        h1 { font-size: 2.6rem; font-weight: 400; color: #8d7d66; margin-bottom: 10px; }
        h1 + p { font-size: 1rem; color: #bcae9a; margin-bottom: 40px; font-style: italic; }
        h2 { font-size: 1.2rem; font-weight: 600; color: #8d7d66; border-bottom: 1px solid #e8e1d5; padding-bottom: 8px; margin-top: 40px; margin-bottom: 20px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #6d5d46; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #bcae9a; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { color: #e8e1d5; }
        a { color: #8d7d66; text-decoration: none; border-bottom: 1px dashed #8d7d66; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '午夜丝绒 (Midnight Velvet)',
      category: 'Elegant',
      style: 'dark',
      css_styles: `
        .resume { font-family: "Cormorant Garamond", serif; color: #e0e0e0; line-height: 1.6; background: #1a1a1a; padding: 50px; }
        h1 { font-size: 3.2rem; font-weight: 300; color: #d4af37; margin-bottom: 10px; text-align: center; }
        h1 + p { font-size: 0.9rem; color: #888; text-align: center; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 50px; }
        h2 { font-size: 1.3rem; font-weight: 400; color: #d4af37; text-align: center; text-transform: uppercase; letter-spacing: 2px; margin-top: 45px; margin-bottom: 25px; border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 10px 0; }
        h3 { font-size: 1.2rem; font-weight: 500; color: #fff; margin-top: 30px; }
        h3 + p { font-size: 0.9rem; color: #888; font-style: italic; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
        li::marker { color: #d4af37; }
        a { color: #d4af37; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(70%) sepia(40%) saturate(600%) hue-rotate(5deg); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
    }
  ];
};

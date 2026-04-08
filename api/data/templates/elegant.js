import { getCommonIconsCss } from './common.js';

export const elegantTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '雅致黑金 (Elegant Gold)',
      category: 'Professional',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Georgia", "Noto Serif SC", serif; color: #3f3f46; line-height: 1.7; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 400; color: #18181b; text-align: center; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        h1 + p { color: #71717a; text-align: center; font-size: 0.95rem; margin-bottom: 2rem; position: relative; padding-bottom: 1.5rem; }
        h1 + p::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 2px; background: #d4af37; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 3px; text-align: center; margin-top: 2.5rem; margin-bottom: 1.5rem; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #18181b; margin-top: 1.5rem; }
        h3 + p { color: #71717a; font-size: 0.9rem; margin-bottom: 0.8rem; border-bottom: 1px dashed #e4e4e7; padding-bottom: 0.4rem; }
        ul { list-style-type: square; padding-left: 1.2rem; }
        li::marker { color: #d4af37; }
        a { color: #b48600; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '温柔玫瑰 (Soft Rose)',
      category: 'Elegant',
      style: 'soft',
      css_styles: `
        .resume { font-family: "Lora", serif; color: #4a4a4a; line-height: 1.7; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 400; color: #be185d; margin-bottom: 5px; }
        h1 + p { color: #9d174d; font-style: italic; font-size: 0.95rem; margin-bottom: 25px; border-bottom: 1px solid #fbcfe8; padding-bottom: 15px; }
        h2 { font-size: 1.1rem; font-weight: 600; color: #be185d; text-transform: uppercase; letter-spacing: 2px; margin-top: 30px; margin-bottom: 15px; text-align: center; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #831843; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-family: "Inter", sans-serif; }
        ul { padding-left: 20px; font-family: "Inter", sans-serif; font-size: 0.95rem; }
        li::marker { color: #f472b6; }
        a { color: #db2777; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '森系自然 (Forest Green)',
      category: 'Elegant',
      style: 'nature',
      css_styles: `
        .resume { font-family: "Lora", serif; color: #273e35; line-height: 1.7; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 600; color: #1b3329; margin-bottom: 5px; }
        h1 + p { color: #4a6659; font-size: 0.95rem; margin-bottom: 25px; font-family: "Inter", sans-serif; }
        h2 { font-size: 1.2rem; font-weight: 600; color: #1b3329; text-transform: uppercase; letter-spacing: 2px; margin-top: 35px; margin-bottom: 15px; border-bottom: 1px solid #c2d6cd; padding-bottom: 5px; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #2d5a45; margin-top: 20px; }
        h3 + p { color: #5e7d6f; font-size: 0.9rem; font-family: "Inter", sans-serif; font-style: italic; }
        ul { font-family: "Inter", sans-serif; padding-left: 20px; color: #3a4a42; }
        li::marker { color: #4caf50; }
        a { color: #2d5a45; text-decoration: none; border-bottom: 1px solid #a5d6a7; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '雅致胶囊 (Capsule Elegance)',
      category: 'Creative',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #4b5563; line-height: 1.65; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 800; color: #1f2937; text-align: center; margin-bottom: 10px; }
        h1 + p { color: #6b7280; font-size: 0.95rem; text-align: center; margin-bottom: 40px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        h2 { font-size: 1.05rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin-top: 35px; margin-bottom: 25px; }
        h2::before { content: ""; display: block; width: 40px; height: 3px; background: #e0e7ff; margin: 0 auto 8px auto; border-radius: 2px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #111827; margin-top: 25px; display: flex; align-items: baseline; justify-content: space-between; }
        h3 + p { color: #6b7280; font-size: 0.95rem; font-weight: 500; margin-top: 4px; background: #f3f4f6; display: inline-block; padding: 2px 10px; border-radius: 4px; }
        ul { padding-left: 20px; margin-top: 12px; }
        li { margin-bottom: 8px; }
        li::marker { color: #818cf8; }
        a { color: #4f46e5; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    }
  ];
};

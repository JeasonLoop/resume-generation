import { getCommonIconsCss } from './common.js';

export const professionalTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '商务严谨 (Corporate Strict)',
      category: 'Professional',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Arial", sans-serif; color: #222222; line-height: 1.5; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.2rem; font-weight: bold; color: #000000; text-transform: uppercase; margin-bottom: 5px; }
        h1 + p { color: #555555; font-size: 0.9rem; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 10px 0; margin-bottom: 25px; }
        h2 { font-size: 1.1rem; font-weight: bold; color: #000000; text-transform: uppercase; margin-top: 25px; margin-bottom: 10px; background: #f0f0f0; padding: 5px 10px; border-left: 5px solid #000; }
        h3 { font-size: 1.05rem; font-weight: bold; color: #000000; margin-top: 15px; display: flex; justify-content: space-between; }
        h3 + p { font-style: italic; color: #666; font-size: 0.9rem; margin-bottom: 8px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; font-size: 0.95rem; }
        a { color: #000; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '双色雅致 (Two-Tone)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Open Sans", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 700; color: #1e3a8a; margin-bottom: 5px; }
        h1 + p { color: #6b7280; font-size: 0.95rem; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #ffffff; background: #4b5563; padding: 6px 15px; border-radius: 4px; display: inline-block; margin-top: 25px; margin-bottom: 15px; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #1e3a8a; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 600; border-left: 3px solid #bfdbfe; padding-left: 10px; margin-top: 5px; }
        ul { padding-left: 20px; }
        a { color: #2563eb; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '暗顶双色 (Dark Header)',
      category: 'Professional',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #333; line-height: 1.6; background: #ffffff; }
        .resume > *:first-child { background: #3f3f46; color: #fff; padding: 40px; margin: -40px -40px 30px -40px; }
        h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 10px; color: inherit; }
        h1 + p { font-size: 0.95rem; display: flex; gap: 15px; flex-wrap: wrap; opacity: 0.9; color: inherit; }
        h1 + p a { color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3); }
        h2 { font-size: 1.1rem; font-weight: 700; color: #111; text-align: center; margin-top: 30px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; }
        h2::before, h2::after { content: ""; flex: 1; border-bottom: 1px solid #e5e7eb; margin: 0 15px; }
        h2 span { background: #f3f4f6; padding: 4px 16px; border-radius: 20px; font-size: 0.9rem; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #111; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
        h3 + p { color: #666; font-size: 0.9rem; margin-top: 4px; margin-bottom: 8px; font-weight: 500; }
        ul { padding-left: 20px; margin-top: 10px; }
        li { margin-bottom: 6px; position: relative; }
        li::marker { color: #3f3f46; font-size: 0.8em; }
        strong { color: #111; font-weight: 600; }
        a { color: #3f3f46; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects', 'education'] }),
      is_premium: false
    },
    {
      name: '海洋深蓝 (Ocean Deep)',
      category: 'Professional',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Roboto", sans-serif; color: #334155; line-height: 1.6; background: #f8fafc; padding: 40px; border-top: 8px solid #1e3a8a; }
        h1 { font-size: 2.8rem; font-weight: 700; color: #0f172a; margin-bottom: 5px; }
        h1 + p { color: #475569; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #ffffff; background: #1e293b; padding: 8px 15px; margin-top: 30px; margin-bottom: 20px; border-radius: 4px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0f172a; margin-top: 20px; border-left: 3px solid #3b82f6; padding-left: 10px; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-weight: 500; }
        ul { padding-left: 20px; }
        li::marker { color: #3b82f6; }
        a { color: #2563eb; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '高端会所 (Premium Club)',
      category: 'Professional',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Playfair Display", serif; color: #ffffff; line-height: 1.6; background: #1a1a1a; padding: 50px; }
        h1 { font-size: 2.8rem; font-weight: 400; color: #d4af37; margin-bottom: 5px; text-align: center; }
        h1 + p { color: #a0a0a0; font-size: 0.9rem; margin-bottom: 40px; text-align: center; font-family: "Montserrat", sans-serif; letter-spacing: 1px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-top: 35px; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-top: 20px; }
        h3 + p { color: #a0a0a0; font-size: 0.9rem; font-family: "Montserrat", sans-serif; }
        ul { padding-left: 20px; font-family: "Montserrat", sans-serif; font-size: 0.95rem; }
        li::marker { color: #d4af37; }
        a { color: #d4af37; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(70%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(95%) contrast(90%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '琥珀金芒 (Amber Gold)',
      category: 'Elegant',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Lora", serif; color: #3f3f46; line-height: 1.7; background: #fffbeb; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 500; color: #78350f; margin-bottom: 5px; text-align: center; }
        h1 + p { color: #92400e; font-size: 0.9rem; margin-bottom: 35px; text-align: center; text-transform: uppercase; letter-spacing: 2px; }
        h2 { font-size: 1.1rem; font-weight: 600; color: #b45309; text-transform: uppercase; letter-spacing: 3px; margin-top: 35px; margin-bottom: 20px; text-align: center; border-top: 1px solid #fcd34d; border-bottom: 1px solid #fcd34d; padding: 10px 0; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #78350f; margin-top: 20px; }
        h3 + p { color: #b45309; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 20px; }
        li::marker { color: #f59e0b; }
        a { color: #d97706; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
    }
  ];
};

import { getCommonIconsCss } from './common.js';

export const techTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '清新薄荷 (Mint Fresh)',
      category: 'Creative',
      style: 'fresh',
      css_styles: `
        .resume { font-family: "Nunito", "Noto Sans SC", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 800; color: #065f46; margin-bottom: 0.3rem; }
        h1 + p { color: #10b981; font-weight: 600; margin-bottom: 2rem; font-size: 1rem; }
        h2 { font-size: 1.1rem; font-weight: 800; color: #ffffff; background: #10b981; display: inline-block; padding: 0.4rem 1.2rem; border-radius: 50px; margin-top: 2rem; margin-bottom: 1.5rem; letter-spacing: 1px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 1.5rem; border-bottom: 2px dashed #a7f3d0; padding-bottom: 0.3rem; }
        h3 + p { color: #6b7280; font-size: 0.9rem; margin-top: 0.4rem; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.4rem; position: relative; list-style: none; }
        li::before { content: "✿"; position: absolute; left: -1.5rem; color: #34d399; font-size: 0.8rem; top: 0.1rem; }
        a { color: #059669; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '霓虹高光 (Neon Cyan)',
      category: 'Tech',
      style: 'futuristic',
      css_styles: `
        .resume { font-family: "Space Grotesk", sans-serif; color: #1f2937; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 3rem; font-weight: 700; color: #111827; margin-bottom: 0; line-height: 1.1; }
        h1 + p { color: #4b5563; font-size: 1rem; margin-bottom: 30px; font-weight: 500; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin-top: 30px; margin-bottom: 15px; border-left: 6px solid #06b6d4; padding-left: 10px; background: linear-gradient(90deg, #cffafe, transparent); padding-top: 5px; padding-bottom: 5px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0891b2; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-family: monospace; }
        ul { padding-left: 20px; }
        li::marker { color: #06b6d4; font-weight: bold; }
        a { color: #0891b2; text-decoration: none; border-bottom: 1px dashed #06b6d4; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '深邃黑标 (Dark Accent)',
      category: 'Professional',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #1f2937; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 3rem; font-weight: 900; color: #000000; letter-spacing: -2px; margin-bottom: 0; text-transform: uppercase; }
        h1 + p { color: #4b5563; font-size: 1rem; margin-bottom: 30px; font-weight: 500; }
        h2 { font-size: 1.1rem; font-weight: 800; color: #ffffff; background: #000000; padding: 8px 15px; margin-top: 30px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
        h3 { font-size: 1.2rem; font-weight: 700; color: #000000; margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        h3 + p { color: #4b5563; font-weight: 600; font-size: 0.9rem; margin-top: 8px; }
        ul { padding-left: 20px; margin-top: 10px; }
        li { margin-bottom: 5px; }
        a { color: #000; font-weight: bold; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
    },
    {
      name: '技术极客 (Dev Hacker)',
      category: 'Tech',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Fira Code", "Consolas", monospace; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.2rem; font-weight: 700; color: #111827; margin-bottom: 10px; }
        h1::before { content: "> "; color: #10b981; }
        h1 + p { color: #6b7280; font-size: 0.9rem; border-bottom: 1px dashed #d1d5db; padding-bottom: 20px; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #047857; margin-top: 30px; margin-bottom: 15px; display: inline-block; border-bottom: 2px solid #34d399; padding-bottom: 2px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #111827; margin-top: 20px; }
        h3 + p { color: #4b5563; font-size: 0.9rem; margin-top: 4px; margin-bottom: 8px; }
        ul { padding-left: 15px; list-style-type: none; }
        li { margin-bottom: 5px; position: relative; }
        li::before { content: "·"; position: absolute; left: -15px; color: #10b981; font-weight: bold; }
        code { background: #f3f4f6; color: #ef4444; padding: 2px 6px; border-radius: 3px; font-size: 0.85em; }
        a { color: #059669; text-decoration: underline; text-underline-offset: 2px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: true
    },
    {
      name: '极客终端 (Terminal Hacker)',
      category: 'Tech',
      style: 'dark',
      css_styles: `
        .resume { font-family: "Courier New", Courier, monospace; color: #22c55e; line-height: 1.5; background: #000000; padding: 40px; }
        h1 { font-size: 2.2rem; font-weight: bold; color: #4ade80; margin-bottom: 10px; }
        h1::before { content: "root@cv:~# "; color: #16a34a; font-weight: normal; }
        h1 + p { color: #86efac; font-size: 0.9rem; margin-bottom: 30px; border-bottom: 1px dashed #22c55e; padding-bottom: 10px; }
        h2 { font-size: 1.1rem; font-weight: bold; color: #000000; background: #22c55e; padding: 2px 10px; margin-top: 20px; margin-bottom: 15px; display: inline-block; }
        h3::before { content: ">> "; color: #16a34a; }
        h3 { font-size: 1.05rem; font-weight: bold; color: #4ade80; margin-top: 15px; }
        h3 + p { color: #86efac; font-size: 0.85rem; }
        ul { padding-left: 20px; list-style-type: square; }
        li { margin-bottom: 5px; }
        a { color: #86efac; text-decoration: underline; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(60%) sepia(80%) saturate(400%) hue-rotate(80deg) brightness(100%) contrast(100%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'education'] }),
      is_premium: true
    }
  ];
};

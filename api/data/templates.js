export const iconMail = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'%3E%3C/path%3E%3Cpolyline points='22,6 12,13 2,6'%3E%3C/polyline%3E%3C/svg%3E";
export const iconPhone = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'%3E%3C/path%3E%3C/svg%3E";
export const iconLink = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'%3E%3C/path%3E%3Cpath d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'%3E%3C/path%3E%3C/svg%3E";

export const getCommonIconsCss = () => `
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconMail}") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconPhone}") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconLink}") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
`;

export const getTemplates = () => {
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
      name: '科技蓝调 (Tech Blue)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; letter-spacing: -0.5px; }
        h1 + p { color: #64748b; margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; font-size: 0.95rem; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px; margin-top: 2rem; margin-bottom: 1rem; background: #eff6ff; padding: 0.5rem 1rem; border-left: 4px solid #3b82f6; border-radius: 0 4px 4px 0; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0f172a; margin-top: 1.2rem; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-style: italic; margin-bottom: 0.5rem; }
        ul { padding-left: 1.2rem; }
        li { margin-bottom: 0.3rem; }
        li::marker { color: #3b82f6; }
        a { color: #2563eb; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(31%) sepia(96%) saturate(2048%) hue-rotate(211deg) brightness(96%) contrast(94%); opacity: 0.7; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: false
    },

    {
      name: '专业时间轴 (Timeline Pro)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #4b5563; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.4rem; font-weight: 900; color: #111827; letter-spacing: -1px; }
        h1 + p { color: #6b7280; margin-bottom: 2rem; font-size: 0.95rem; display: flex; gap: 15px; flex-wrap: wrap; }
        h2 { font-size: 1.3rem; font-weight: 800; color: #111827; margin-top: 2.5rem; margin-bottom: 1.5rem; border-bottom: 3px solid #111827; padding-bottom: 0.3rem; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin-top: 1.5rem; position: relative; }
        h3::before { content: ""; position: absolute; left: -21px; top: 8px; width: 10px; height: 10px; background: #111827; border-radius: 50%; box-shadow: 0 0 0 3px #ffffff, 0 0 0 4px #111827; }
        .resume > ul, .resume > p { padding-left: 0; }
        h3 ~ p, h3 ~ ul { padding-left: 20px; border-left: 2px solid #e5e7eb; margin-left: -16px; margin-bottom: 0; padding-bottom: 1rem; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 500; margin-top: 0.2rem; margin-bottom: 0.5rem; }
        li { margin-bottom: 0.4rem; }
        a { color: #111827; font-weight: 600; text-decoration: none; border-bottom: 1px solid #d1d5db; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'education'] }),
      is_premium: false
    },
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
      name: '灵动紫韵 (Vibrant Purple)',
      category: 'Creative',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Poppins", sans-serif; color: #4b5563; line-height: 1.6; background: #ffffff; padding: 40px 40px 40px 50px; border-left: 8px solid #8b5cf6; }
        h1 { font-size: 2.6rem; font-weight: 800; color: #4c1d95; margin-bottom: 0.2rem; }
        h1 + p { color: #7c3aed; font-size: 0.95rem; margin-bottom: 2rem; font-weight: 500; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #5b21b6; margin-top: 2rem; margin-bottom: 1rem; position: relative; padding-left: 15px; }
        h2::before { content: ""; position: absolute; left: 0; top: 15%; height: 70%; width: 4px; background: #8b5cf6; border-radius: 4px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #4c1d95; margin-top: 1.5rem; }
        h3 + p { color: #6b7280; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.5px; }
        ul { padding-left: 1.2rem; }
        li { margin-bottom: 0.4rem; }
        li::marker { color: #a78bfa; }
        a { color: #7c3aed; text-decoration: none; background: #f5f3ff; padding: 0 4px; border-radius: 4px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'projects', 'skills'] }),
      is_premium: true
    },
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
      name: '活力炫橙 (Creative Orange)',
      category: 'Creative',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Montserrat", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 900; color: #ea580c; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 0; }
        h1 + p { color: #6b7280; font-size: 0.95rem; margin-bottom: 2rem; }
        h2 { font-size: 1.2rem; font-weight: 800; color: #1f2937; margin-top: 2.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        h2::after { content: ""; flex: 1; height: 2px; background: #ffedd5; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #ea580c; margin-top: 1.5rem; }
        h3 + p { font-weight: 500; font-size: 0.9rem; color: #4b5563; }
        ul { padding-left: 1.2rem; }
        li::marker { color: #f97316; font-size: 1.2em; }
        a { color: #ea580c; font-weight: 600; text-decoration: none; border-bottom: 2px solid #fdba74; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '极简网格 (Minimal Grid)',
      category: 'Modern',
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
      name: '青色划线 (Teal Underline)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Roboto", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: 300; color: #111827; margin-bottom: 5px; }
        h1 + p { color: #6b7280; font-size: 0.9rem; margin-bottom: 25px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin-top: 30px; margin-bottom: 15px; position: relative; padding-bottom: 5px; display: inline-block; }
        h2::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: #0d9488; border-radius: 2px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #0f766e; margin-top: 20px; }
        h3 + p { color: #4b5563; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
        a { color: #0d9488; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '几何空间 (Geometric Base)',
      category: 'Creative',
      style: 'geometric',
      css_styles: `
        .resume { font-family: "Outfit", "Inter", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
        h1 + p { color: #64748b; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 2px; margin-top: 35px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        h2::before { content: ""; display: block; width: 12px; height: 12px; background: #3b82f6; transform: rotate(45deg); }
        h3 { font-size: 1.15rem; font-weight: 600; color: #1e293b; margin-top: 20px; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-weight: 500; }
        ul { padding-left: 20px; list-style: none; }
        li { margin-bottom: 6px; position: relative; }
        li::before { content: ""; position: absolute; left: -15px; top: 8px; width: 6px; height: 6px; background: #94a3b8; }
        a { color: #3b82f6; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
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
      name: '现代排版 (Modern Editorial)',
      category: 'Creative',
      style: 'editorial',
      css_styles: `
        .resume { font-family: "Playfair Display", serif; color: #111; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 3.5rem; font-weight: 900; letter-spacing: -2px; text-align: center; margin-bottom: 10px; line-height: 1; }
        h1 + p { text-align: center; font-family: "Inter", sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 40px; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 10px 0; }
        h2 { font-size: 1.4rem; font-weight: 900; color: #111; margin-top: 30px; margin-bottom: 20px; text-align: center; font-style: italic; }
        h3 { font-family: "Inter", sans-serif; font-size: 1.05rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 25px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        h3 + p { font-family: "Inter", sans-serif; color: #555; font-size: 0.9rem; margin-top: 8px; }
        ul { font-family: "Inter", sans-serif; padding-left: 20px; font-size: 0.95rem; color: #444; }
        a { color: #111; font-weight: bold; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
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
      name: '赤焰醒目 (Red Bold)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #111827; line-height: 1.6; background: #ffffff; padding: 40px; border-top: 12px solid #dc2626; }
        h1 { font-size: 2.8rem; font-weight: 900; color: #dc2626; margin-bottom: 5px; letter-spacing: -1px; }
        h1 + p { color: #4b5563; font-size: 0.95rem; font-weight: 500; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 1px; margin-top: 30px; margin-bottom: 15px; padding-left: 10px; border-left: 5px solid #dc2626; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 500; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
        li::marker { color: #dc2626; }
        a { color: #b91c1c; font-weight: 600; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
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
      name: '动感虚线 (Dynamic Dash)',
      category: 'Creative',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Nunito", sans-serif; color: #4b5563; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 800; color: #0284c7; margin-bottom: 5px; }
        h1 + p { color: #64748b; font-size: 0.95rem; margin-bottom: 30px; font-weight: 600; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #0ea5e9; text-transform: uppercase; letter-spacing: 2px; margin-top: 30px; margin-bottom: 20px; border-bottom: 2px dashed #bae6fd; padding-bottom: 8px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #1f2937; margin-top: 20px; display: inline-block; border: 1px dashed #cbd5e1; padding: 2px 8px; border-radius: 4px; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-weight: 600; margin-top: 8px; }
        ul { padding-left: 20px; border-left: 2px dashed #e2e8f0; margin-left: 10px; padding-top: 5px; padding-bottom: 5px; }
        li { margin-bottom: 6px; }
        a { color: #0284c7; font-weight: bold; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects', 'skills'] }),
      is_premium: true
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
      name: '侧边栏分割 (Sidebar Split)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Helvetica Neue", Arial, sans-serif; color: #4a4a4a; line-height: 1.6; background: #ffffff; padding: 40px; display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        h1 { font-size: 2.4rem; font-weight: 800; color: #2c3e50; margin-bottom: 5px; grid-column: 1 / -1; }
        h1 + p { color: #7f8c8d; font-size: 0.95rem; margin-bottom: 30px; grid-column: 1 / -1; border-bottom: 2px solid #ecf0f1; padding-bottom: 20px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #2c3e50; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; margin-bottom: 15px; border-left: 4px solid #3498db; padding-left: 10px; }
        h3 { font-size: 1.05rem; font-weight: 700; color: #34495e; margin-top: 20px; }
        h3 + p { color: #7f8c8d; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 18px; margin-bottom: 20px; }
        li { margin-bottom: 5px; }
        li::marker { color: #3498db; }
        a { color: #3498db; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills', 'education'] }),
      is_premium: true
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
      name: '清爽块状 (Block Fresh)',
      category: 'Creative',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #4a4a4a; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.6rem; font-weight: 900; color: #0f172a; margin-bottom: 8px; letter-spacing: -1px; }
        h1 + p { color: #64748b; font-size: 0.95rem; margin-bottom: 35px; }
        h2 { font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-top: 30px; margin-bottom: 20px; background: #f8fafc; padding: 10px 15px; border-radius: 8px; box-shadow: inset 2px 0 0 #0ea5e9; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 20px; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-weight: 500; margin-top: 5px; }
        ul { padding-left: 20px; margin-top: 10px; }
        li { margin-bottom: 6px; }
        li::marker { color: #0ea5e9; font-size: 1.2em; }
        a { color: #0ea5e9; font-weight: 600; text-decoration: none; }
        a:hover { color: #0284c7; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '粉彩马卡龙 (Pastel Macaron)',
      category: 'Creative',
      style: 'playful',
      css_styles: `
        .resume { font-family: "Quicksand", sans-serif; color: #57534e; line-height: 1.6; background: #fafaf9; padding: 40px; border: 8px solid #fecaca; border-radius: 16px; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #fb7185; text-align: center; margin-bottom: 5px; }
        h1 + p { color: #a8a29e; text-align: center; margin-bottom: 25px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #6366f1; margin-top: 25px; margin-bottom: 15px; background: #e0e7ff; padding: 5px 15px; border-radius: 20px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #44403c; margin-top: 15px; }
        h3 + p { color: #78716c; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li::marker { color: #f472b6; }
        a { color: #8b5cf6; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
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
        h3 { font-size: 1.05rem; font-weight: bold; color: #4ade80; margin-top: 15px; }
        h3::before { content: ">> "; color: #16a34a; }
        h3 + p { color: #86efac; font-size: 0.85rem; }
        ul { padding-left: 20px; list-style-type: square; }
        li { margin-bottom: 5px; }
        a { color: #86efac; text-decoration: underline; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(60%) sepia(80%) saturate(400%) hue-rotate(80deg) brightness(100%) contrast(100%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '莫兰迪之秋 (Morandi Autumn)',
      category: 'Elegant',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Georgia", serif; color: #4b443c; line-height: 1.7; background: #fdfbf7; padding: 45px; }
        h1 { font-size: 2.4rem; font-weight: normal; color: #8c6b5d; margin-bottom: 5px; letter-spacing: 1px; }
        h1 + p { color: #9a8c83; font-size: 0.95rem; margin-bottom: 35px; border-bottom: 1px solid #e6dfd9; padding-bottom: 20px; }
        h2 { font-size: 1.1rem; font-weight: bold; color: #735c51; text-transform: uppercase; margin-top: 30px; margin-bottom: 20px; letter-spacing: 2px; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #4b443c; margin-top: 20px; }
        h3 + p { color: #8c8279; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { color: #c4b5aa; }
        a { color: #8c6b5d; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '工业硬核 (Industrial Hardcore)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Impact", "Arial Black", sans-serif; color: #1a1a1a; line-height: 1.5; background: #f4f4f4; padding: 40px; border: 10px solid #1a1a1a; }
        h1 { font-size: 3.5rem; color: #1a1a1a; text-transform: uppercase; margin-bottom: 0; line-height: 1; letter-spacing: -1px; }
        h1 + p { font-family: "Arial", sans-serif; color: #4d4d4d; font-weight: bold; text-transform: uppercase; margin-bottom: 30px; margin-top: 10px; }
        h2 { font-size: 1.5rem; color: #ffffff; background: #ff4500; text-transform: uppercase; padding: 5px 10px; margin-top: 30px; margin-bottom: 15px; letter-spacing: 1px; }
        h3 { font-family: "Arial", sans-serif; font-size: 1.2rem; font-weight: bold; color: #1a1a1a; margin-top: 20px; }
        h3 + p { font-family: "Arial", sans-serif; color: #666; font-size: 0.9rem; }
        ul { font-family: "Arial", sans-serif; padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #ff4500; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
    },
    {
      name: '樱花粉黛 (Cherry Blossom)',
      category: 'Elegant',
      style: 'soft',
      css_styles: `
        .resume { font-family: "Noto Sans", sans-serif; color: #4a4a4a; line-height: 1.6; background: #fffafb; padding: 40px; background-image: radial-gradient(#fce7f3 1px, transparent 1px); background-size: 20px 20px; }
        h1 { font-size: 2.6rem; font-weight: 300; color: #db2777; margin-bottom: 5px; }
        h1 + p { color: #f43f5e; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 400; color: #be185d; border-bottom: 2px solid #fbcfe8; padding-bottom: 5px; margin-top: 30px; margin-bottom: 20px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #831843; margin-top: 15px; }
        h3 + p { color: #9ca3af; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li::marker { color: #f9a8d4; content: "✿ "; }
        a { color: #e11d48; text-decoration: none; border-bottom: 1px dotted #fda4af; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '赛博朋克 (Cyberpunk 2077)',
      category: 'Tech',
      style: 'futuristic',
      css_styles: `
        .resume { font-family: "Rajdhani", sans-serif; color: #e0e0e0; line-height: 1.6; background: #0f0f13; padding: 40px; position: relative; z-index: 1; border-left: 4px solid #fce205; border-right: 4px solid #00f0ff; }
        h1 { font-size: 3rem; font-weight: 700; color: #00f0ff; text-transform: uppercase; margin-bottom: 5px; text-shadow: 2px 2px #ff003c; }
        h1 + p { color: #fce205; font-size: 1rem; margin-bottom: 30px; border-bottom: 2px dashed #00f0ff; padding-bottom: 10px; }
        h2 { font-size: 1.3rem; font-weight: 700; color: #0f0f13; background: #fce205; padding: 5px 15px; margin-top: 30px; margin-bottom: 20px; text-transform: uppercase; display: inline-block; clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%); }
        h3 { font-size: 1.15rem; font-weight: bold; color: #ff003c; margin-top: 20px; }
        h3 + p { color: #a0a0a0; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li::marker { color: #00f0ff; }
        a { color: #00f0ff; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(100%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: true
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
      name: '波普艺术 (Pop Art)',
      category: 'Creative',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Comic Sans MS", "Arial", sans-serif; color: #000; line-height: 1.6; background: #fff000; padding: 40px; border: 8px solid #000; box-shadow: 12px 12px 0 #ff007f; }
        h1 { font-size: 3rem; font-weight: 900; color: #ff007f; text-transform: uppercase; margin-bottom: 5px; text-shadow: 3px 3px 0 #00ffff; }
        h1 + p { font-size: 1.1rem; font-weight: bold; background: #000; color: #fff; display: inline-block; padding: 5px 10px; margin-bottom: 30px; transform: rotate(-2deg); }
        h2 { font-size: 1.5rem; font-weight: 900; color: #fff; background: #00ffff; border: 4px solid #000; padding: 5px 15px; margin-top: 30px; margin-bottom: 20px; display: inline-block; box-shadow: 4px 4px 0 #000; transform: rotate(1deg); }
        h3 { font-size: 1.2rem; font-weight: bold; margin-top: 20px; background: #ff007f; color: #fff; padding: 2px 8px; display: inline-block; }
        h3 + p { font-weight: bold; margin-top: 5px; }
        ul { padding-left: 25px; list-style-type: square; }
        li { margin-bottom: 8px; font-weight: bold; }
        a { color: #000; background: #00ffff; text-decoration: none; padding: 0 4px; border: 2px solid #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'projects', 'experience'] }),
      is_premium: true
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
    },
    {
      name: '森林原木 (Woodland Rustic)',
      category: 'Creative',
      style: 'nature',
      css_styles: `
        .resume { font-family: "PT Serif", serif; color: #3e3a35; line-height: 1.6; background: #f4f1ea; padding: 40px; border-left: 12px solid #556b2f; }
        h1 { font-size: 2.8rem; font-weight: bold; color: #3e4a2e; margin-bottom: 5px; }
        h1 + p { color: #6b705c; font-size: 0.95rem; margin-bottom: 30px; font-family: "PT Sans", sans-serif; }
        h2 { font-size: 1.2rem; font-weight: bold; color: #ffffff; background: #556b2f; padding: 5px 15px; margin-top: 30px; margin-bottom: 20px; border-radius: 0 15px 15px 0; display: inline-block; margin-left: -40px; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #3e4a2e; margin-top: 20px; }
        h3 + p { color: #6b705c; font-size: 0.9rem; font-family: "PT Sans", sans-serif; }
        ul { padding-left: 20px; font-family: "PT Sans", sans-serif; }
        li::marker { color: #8f9779; }
        a { color: #556b2f; text-decoration: none; border-bottom: 1px solid #a3b18a; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: false
    },
    {
      name: '极速动感 (Speed Dynamic)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Ubuntu", sans-serif; color: #111827; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 3rem; font-weight: 700; color: #111827; margin-bottom: 5px; font-style: italic; letter-spacing: -1px; }
        h1 + p { color: #ef4444; font-size: 1rem; font-weight: 500; margin-bottom: 30px; display: flex; gap: 20px; }
        h2 { font-size: 1.3rem; font-weight: 700; color: #111827; margin-top: 30px; margin-bottom: 20px; display: flex; align-items: center; }
        h2::before { content: ""; width: 20px; height: 4px; background: #ef4444; margin-right: 10px; transform: skewX(-20deg); }
        h3 { font-size: 1.15rem; font-weight: 700; color: #374151; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        li::marker { color: #ef4444; content: "» "; font-weight: bold; }
        a { color: #ef4444; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'education'] }),
      is_premium: true
    },
    {
      name: '暮光幻影 (Twilight Mirage)',
      category: 'Creative',
      style: 'dark',
      css_styles: `
        .resume { font-family: "Outfit", sans-serif; color: #d1d5db; line-height: 1.6; background: #111827; padding: 40px; }
        h1 { font-size: 3rem; font-weight: 800; color: #fff; margin-bottom: 5px; background: -webkit-linear-gradient(45deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        h1 + p { color: #9ca3af; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #fff; margin-top: 30px; margin-bottom: 20px; border-bottom: 1px solid #374151; padding-bottom: 10px; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #e5e7eb; margin-top: 20px; }
        h3 + p { color: #9ca3af; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li::marker { color: #a855f7; }
        a { color: #d8b4fe; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(100%); opacity: 0.7; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '简约原色 (Basic Primary)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Open Sans", sans-serif; color: #333; line-height: 1.6; background: #fff; padding: 40px; }
        h1 { font-size: 2.4rem; font-weight: bold; color: #000; margin-bottom: 10px; }
        h1 + p { color: #666; font-size: 0.95rem; margin-bottom: 30px; }
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
    },
    {
      name: '霓虹暗夜 (Neon Night)',
      category: 'Tech',
      style: 'futuristic',
      css_styles: `
        .resume { font-family: "Orbitron", sans-serif; color: #e2e8f0; line-height: 1.6; background: #020617; padding: 40px; border: 1px solid #1e293b; box-shadow: inset 0 0 20px #0f172a; }
        h1 { font-size: 3rem; font-weight: 900; color: #22d3ee; margin-bottom: 5px; letter-spacing: 2px; text-shadow: 0 0 10px rgba(34,211,238,0.5); }
        h1 + p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #f8fafc; margin-top: 30px; margin-bottom: 20px; border-left: 4px solid #f43f5e; padding-left: 10px; text-shadow: 0 0 5px rgba(248,250,252,0.3); }
        h3 { font-size: 1.1rem; font-weight: 600; color: #38bdf8; margin-top: 20px; }
        h3 + p { color: #64748b; font-size: 0.9rem; }
        ul { padding-left: 20px; }
        li::marker { color: #f43f5e; }
        a { color: #38bdf8; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(100%); opacity: 0.8; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '质感亚麻 (Linen Texture)',
      category: 'Elegant',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Merriweather", serif; color: #4a4238; line-height: 1.7; background: #fdfbf7; padding: 50px; background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"); }
        h1 { font-size: 2.6rem; font-weight: 400; color: #2d2822; margin-bottom: 5px; }
        h1 + p { color: #7a6e60; font-size: 0.95rem; margin-bottom: 30px; border-bottom: 1px solid #e0d8cf; padding-bottom: 15px; }
        h2 { font-size: 1.15rem; font-weight: 700; color: #2d2822; margin-top: 30px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #5c5346; margin-top: 20px; }
        h3 + p { color: #8a7f71; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #8b7355; text-decoration: none; border-bottom: 1px dashed #8b7355; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '律动线条 (Rhythmic Lines)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Poppins", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 40px; position: relative; }
        .resume::before { content: ""; position: absolute; top: 0; left: 40px; right: 40px; height: 6px; background: repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, #10b981 10px, #10b981 20px); }
        h1 { font-size: 2.8rem; font-weight: 800; color: #111827; margin-top: 20px; margin-bottom: 5px; }
        h1 + p { color: #6b7280; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #1f2937; margin-top: 30px; margin-bottom: 20px; display: inline-block; position: relative; }
        h2::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 8px; background: #dbeafe; z-index: -1; transform: translateY(-4px); }
        h3 { font-size: 1.1rem; font-weight: 600; color: #111827; margin-top: 20px; }
        h3 + p { color: #4b5563; font-size: 0.9rem; font-weight: 500; }
        ul { padding-left: 20px; }
        li::marker { color: #3b82f6; }
        a { color: #2563eb; text-decoration: none; font-weight: 600; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
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
    },
    {
      name: '活力亮黄 (Vibrant Yellow)',
      category: 'Creative',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #111827; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 5px; }
        h1 + p { color: #4b5563; font-size: 1rem; margin-bottom: 30px; font-weight: 500; }
        h2 { font-size: 1.2rem; font-weight: 800; color: #111827; background: #fde047; padding: 8px 15px; margin-top: 30px; margin-bottom: 20px; display: inline-block; transform: skewX(-10deg); }
        h2 span { transform: skewX(10deg); display: block; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #1f2937; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 600; }
        ul { padding-left: 20px; }
        li::marker { color: #eab308; font-size: 1.2em; }
        a { color: #ca8a04; font-weight: 600; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'projects', 'experience'] }),
      is_premium: true
    },
    {
      name: '青绿石光 (Malachite Green)',
      category: 'Elegant',
      style: 'nature',
      css_styles: `
        .resume { font-family: "Optima", serif; color: #2d3748; line-height: 1.7; background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; }
        h1 { font-size: 2.6rem; font-weight: normal; color: #065f46; margin-bottom: 5px; text-align: center; }
        h1 + p { color: #4b5563; font-size: 0.9rem; margin-bottom: 35px; text-align: center; }
        h2 { font-size: 1.15rem; font-weight: bold; color: #065f46; text-transform: uppercase; margin-top: 35px; margin-bottom: 20px; text-align: center; letter-spacing: 2px; }
        h2::after { content: ""; display: block; width: 30px; height: 2px; background: #34d399; margin: 8px auto 0; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #1f2937; margin-top: 20px; }
        h3 + p { color: #6b7280; font-size: 0.9rem; font-family: "Inter", sans-serif; }
        ul { padding-left: 20px; font-family: "Inter", sans-serif; font-size: 0.95rem; }
        li::marker { color: #10b981; }
        a { color: #059669; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '像素玩家 (Pixel Gamer)',
      category: 'Tech',
      style: 'playful',
      css_styles: `
        .resume { font-family: "Courier New", Courier, monospace; color: #333; line-height: 1.6; background: #fff; padding: 40px; }
        h1 { font-size: 2.5rem; font-weight: bold; color: #000; margin-bottom: 10px; text-shadow: 2px 2px 0 #ccc; }
        h1 + p { color: #666; font-size: 1rem; margin-bottom: 30px; font-weight: bold; }
        h2 { color: #fff; font-size: 1.2rem; font-weight: bold; background: #ef4444; padding: 5px 10px; margin-top: 30px; margin-bottom: 20px; display: inline-block; box-shadow: 4px 4px 0 #000; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #000; margin-top: 20px; }
        h3 + p { color: #555; font-size: 0.9rem; font-weight: bold; }
        ul { padding-left: 20px; list-style-type: square; }
        li { margin-bottom: 5px; }
        a { color: #3b82f6; text-decoration: none; border-bottom: 2px solid #3b82f6; font-weight: bold; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'projects', 'skills', 'experience'] }),
      is_premium: true
    },
    {
      name: '极光紫电 (Aurora Purple)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Inter", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; }
        h1 { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
        h1 + p { color: #64748b; font-size: 0.95rem; margin-bottom: 30px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #ffffff; background: linear-gradient(90deg, #8b5cf6, #3b82f6); padding: 8px 15px; margin-top: 30px; margin-bottom: 20px; border-radius: 4px; }
        h3 { font-size: 1.15rem; font-weight: 600; color: #1e293b; margin-top: 20px; }
        h3 + p { color: #64748b; font-size: 0.9rem; font-weight: 500; }
        ul { padding-left: 20px; }
        li::marker { color: #8b5cf6; }
        a { color: #6d28d9; text-decoration: none; font-weight: 500; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '禅意水墨 (Zen Ink)',
      category: 'Creative',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Noto Serif SC", serif; color: #111; line-height: 1.8; background: #fcfbf9; padding: 50px; background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='90' cy='10' r='5' fill='%23e5e5e5' opacity='0.5'/%3E%3C/svg%3E"); }
        h1 { font-size: 2.5rem; font-weight: normal; color: #000; margin-bottom: 10px; letter-spacing: 2px; }
        h1 + p { color: #666; font-size: 0.9rem; margin-bottom: 40px; }
        h2 { font-size: 1.1rem; font-weight: bold; color: #000; margin-top: 40px; margin-bottom: 25px; display: flex; align-items: center; justify-content: center; }
        h2::before, h2::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #000, transparent); margin: 0 20px; }
        h3 { font-size: 1.1rem; font-weight: bold; color: #222; margin-top: 20px; }
        h3 + p { color: #555; font-size: 0.85rem; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { content: "◦ "; color: #999; }
        a { color: #333; text-decoration: none; border-bottom: 1px solid #ccc; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: true
    }
  ];
};

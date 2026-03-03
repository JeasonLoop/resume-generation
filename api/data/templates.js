
export const iconMail = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'%3E%3C/path%3E%3Cpolyline points='22,6 12,13 2,6'%3E%3C/polyline%3E%3C/svg%3E";
export const iconPhone = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'%3E%3C/path%3E%3C/svg%3E";
export const iconLink = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'%3E%3C/path%3E%3Cpath d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'%3E%3C/path%3E%3C/svg%3E";

export const getCommonIconsCss = () => `
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconMail}") no-repeat center; margin-right: 0.4em; vertical-align: middle; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconPhone}") no-repeat center; margin-right: 0.4em; vertical-align: middle; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("${iconLink}") no-repeat center; margin-right: 0.4em; vertical-align: middle; }
`;

export const getTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
    {
      name: '极简商务 (Professional)',
      category: 'General',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #1a1a1a; line-height: 1.65; }
        h1 { margin: 0 0 6px 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; color: #111; }
        h1 + p { color: #555; font-size: 13px; margin-bottom: 20px; padding-bottom: 18px; border-bottom: 1.5px solid #e5e5e5; }
        h2 { font-size: 13px; color: #111; margin-top: 24px; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
        h3 { color: #111; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        h3 + p { margin-top: 0; }
        p { margin-bottom: 8px; font-size: 13.5px; line-height: 1.65; color: #333; }
        em { color: #777; font-style: normal; font-size: 12.5px; }
        strong { font-weight: 600; color: #111; }
        ul { padding-left: 18px; margin-bottom: 8px; }
        li { margin-bottom: 3px; font-size: 13.5px; line-height: 1.6; color: #333; }
        li::marker { color: #bbb; }
        a { color: #333; text-decoration: none; border-bottom: 1px solid #ddd; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #111; }
        blockquote { border-left: 2px solid #e5e5e5; padding-left: 14px; margin: 12px 0; color: #666; font-size: 13px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '摩登雅致 (Modern Elegance)',
      category: 'Creative',
      style: 'modern',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #2c2c2c; }
        h1 { margin: 0; font-size: 36px; font-weight: 300; letter-spacing: 4px; text-align: center; margin-bottom: 6px; color: #1a1a1a; text-transform: uppercase; }
        h1 + p { text-align: center; color: #888; font-size: 12px; letter-spacing: 1.5px; padding-bottom: 24px; margin-bottom: 8px; position: relative; }
        h1 + p::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40px; height: 1.5px; background: linear-gradient(90deg, #c9a96e, #e0c992); }
        h2 { font-size: 11px; color: #c9a96e; margin-top: 28px; margin-bottom: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 3.5px; text-align: center; }
        h2::before, h2::after { content: "\\2014\\2014"; margin: 0 12px; color: #e0d5c0; font-weight: 300; }
        h3 { color: #333; margin-top: 16px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        p { margin-bottom: 8px; font-size: 13px; line-height: 1.7; color: #555; }
        em { color: #999; font-style: normal; font-size: 12px; }
        ul { padding-left: 0; list-style: none; }
        li { margin-bottom: 5px; font-size: 13px; position: relative; padding-left: 16px; color: #555; line-height: 1.65; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 4px; height: 4px; border-radius: 50%; background: #c9a96e; }
        a { color: #7a6b55; text-decoration: none; transition: color 0.2s; }
        a:hover { color: #1a1a1a; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: sepia(1) saturate(200%) hue-rotate(10deg); opacity: 0.6; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects', 'education'] }),
      is_premium: true
    },
    {
      name: '科技极简 (Tech Minimal)',
      category: 'Tech',
      style: 'clean',
      css_styles: `
        .resume { font-family: "SF Mono", "JetBrains Mono", "Noto Sans SC", monospace; color: #1a1a1a; font-size: 13px; }
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.5px; color: #0f172a; }
        h1 + p { font-size: 12px; color: #64748b; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #e2e8f0; }
        h2 { font-size: 11px; font-weight: 700; color: #475569; margin-top: 22px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; position: relative; }
        h2::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 48px; height: 2px; background: #3b82f6; }
        h3 { color: #0f172a; margin-top: 12px; margin-bottom: 3px; font-size: 13px; font-weight: 600; }
        p { margin-bottom: 6px; line-height: 1.6; color: #475569; }
        em { color: #94a3b8; font-style: normal; font-size: 11.5px; }
        ul { padding-left: 16px; }
        li { margin-bottom: 3px; line-height: 1.55; color: #475569; }
        li::marker { color: #cbd5e1; }
        a { color: #3b82f6; text-decoration: none; transition: color 0.2s; }
        a:hover { color: #1d4ed8; }
        code { background: #f1f5f9; padding: 2px 5px; border-radius: 3px; font-size: 12px; color: #0f172a; }
        strong { color: #0f172a; font-weight: 600; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(31%) sepia(96%) saturate(2048%) hue-rotate(211deg) brightness(96%) contrast(94%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills', 'education'] }),
      is_premium: false
    },
    {
      name: '瑞士国际 (Swiss Intl)',
      category: 'General',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif; color: #000; line-height: 1.45; }
        h1 { font-size: 44px; font-weight: 900; margin-bottom: 4px; letter-spacing: -1.5px; line-height: 1; text-transform: uppercase; }
        h1 + p { font-size: 12px; color: #666; letter-spacing: 0.5px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 3px solid #000; }
        h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 24px; margin-bottom: 10px; letter-spacing: 2.5px; color: #000; padding-top: 10px; border-top: 1px solid #000; }
        h3 { font-size: 13px; font-weight: 700; margin-top: 14px; margin-bottom: 3px; }
        p { margin-bottom: 8px; font-size: 13px; max-width: 580px; line-height: 1.6; color: #333; }
        em { color: #888; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; font-size: 13px; line-height: 1.5; padding-left: 14px; position: relative; }
        li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 1px; background: #000; }
        a { color: #000; text-decoration: none; border-bottom: 1px solid #000; }
        a:hover { background: #000; color: #fff; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '常青藤 (Ivy League)',
      category: 'Academic',
      style: 'traditional',
      css_styles: `
        .resume { font-family: "Garamond", "Georgia", "Noto Serif SC", serif; color: #1a1a1a; line-height: 1.55; }
        h1 { font-size: 28px; font-weight: normal; text-align: center; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 5px; }
        h1 + p { text-align: center; font-size: 12px; color: #555; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #999; }
        h2 { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 22px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1.5px solid #1a1a1a; }
        h3 { font-size: 14.5px; font-weight: 600; margin-top: 14px; margin-bottom: 2px; color: #1a1a1a; }
        p { margin-bottom: 6px; font-size: 13.5px; text-align: justify; line-height: 1.6; color: #333; }
        em { color: #777; font-style: italic; font-size: 13px; }
        ul { padding-left: 18px; margin-bottom: 8px; }
        li { margin-bottom: 3px; font-size: 13.5px; line-height: 1.55; }
        li::marker { color: #999; }
        a { color: #1a1a1a; text-decoration: none; border-bottom: 1px solid #ccc; }
        a:hover { border-bottom-color: #1a1a1a; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'experience', 'publications'] }),
      is_premium: false
    },
    {
      name: '翡翠绿韵 (Emerald)',
      category: 'Creative',
      style: 'nature',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #1a2e1a; line-height: 1.6; }
        h1 { font-size: 30px; color: #14532d; margin-bottom: 4px; font-weight: 700; letter-spacing: -0.3px; }
        h1 + p { font-size: 12px; color: #6b7280; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #bbf7d0; }
        h2 { font-size: 12px; color: #166534; margin-top: 24px; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding-left: 14px; border-left: 3px solid #22c55e; }
        h3 { color: #14532d; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        p { font-size: 13px; color: #374151; line-height: 1.65; margin-bottom: 6px; }
        em { color: #6b7280; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; padding-left: 18px; position: relative; font-size: 13px; color: #374151; line-height: 1.6; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 6px; height: 6px; border-radius: 50%; border: 1.5px solid #22c55e; }
        a { color: #166534; text-decoration: none; font-weight: 500; border-bottom: 1px solid #bbf7d0; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #166534; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(90deg) saturate(150%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'skills', 'experience'] }),
      is_premium: true
    },
    {
      name: '暖橘 (Warm Tangerine)',
      category: 'Creative',
      style: 'modern',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #292524; line-height: 1.6; }
        h1 { font-size: 32px; font-weight: 800; color: #1c1917; margin-bottom: 4px; letter-spacing: -0.5px; }
        h1 + p { font-size: 12.5px; color: #78716c; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #fed7aa; }
        h2 { font-size: 12px; font-weight: 700; color: #c2410c; margin-top: 24px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 6px; border-bottom: 1px solid #fed7aa; }
        h3 { color: #1c1917; margin-top: 14px; margin-bottom: 3px; font-size: 14px; font-weight: 600; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.65; color: #44403c; }
        em { color: #a8a29e; font-style: normal; font-size: 12px; }
        strong { color: #c2410c; font-weight: 600; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; padding-left: 18px; position: relative; font-size: 13px; color: #44403c; line-height: 1.6; }
        li::before { content: ""; position: absolute; left: 2px; top: 7px; width: 0; height: 0; border-left: 5px solid #f97316; border-top: 3px solid transparent; border-bottom: 3px solid transparent; }
        a { color: #c2410c; text-decoration: none; border-bottom: 1px solid #fdba74; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #c2410c; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(-30deg) saturate(200%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: false
    },
    {
      name: '深邃午夜 (Midnight)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #e4e4e7; background: #18181b; }
        h1 { font-size: 34px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; color: #fafafa; }
        h1 + p { font-size: 12px; color: #71717a; letter-spacing: 1px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #27272a; }
        h2 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-top: 28px; margin-bottom: 14px; color: #a1a1aa; padding-bottom: 8px; border-bottom: 1px solid #27272a; }
        h3 { color: #fafafa; margin-top: 16px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        p { font-size: 13px; color: #a1a1aa; line-height: 1.65; margin-bottom: 6px; }
        em { color: #52525b; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 5px; font-size: 13px; line-height: 1.6; color: #a1a1aa; padding-left: 16px; position: relative; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 4px; height: 4px; border-radius: 50%; background: #52525b; }
        a { color: #a1a1aa; text-decoration: none; border-bottom: 1px solid #3f3f46; transition: all 0.2s; }
        a:hover { color: #fafafa; border-bottom-color: #fafafa; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(1); opacity: 0.4; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '玫瑰金 (Rose Gold)',
      category: 'Creative',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #3f3f46; line-height: 1.6; }
        h1 { font-size: 30px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; color: #1c1917; text-align: center; }
        h1 + p { text-align: center; font-size: 12px; color: #a8a29e; letter-spacing: 1px; margin-bottom: 20px; padding-bottom: 16px; position: relative; }
        h1 + p::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 50px; height: 1px; background: linear-gradient(90deg, transparent, #d4a574, transparent); }
        h2 { font-size: 11px; color: #d4a574; margin-top: 26px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; text-align: center; }
        h3 { color: #1c1917; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 500; text-align: center; }
        p { font-size: 13px; margin-bottom: 6px; line-height: 1.65; color: #57534e; }
        em { color: #a8a29e; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 4px; font-size: 13px; line-height: 1.6; color: #57534e; padding-left: 16px; position: relative; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 4px; height: 4px; border-radius: 50%; background: #d4a574; }
        a { color: #92400e; text-decoration: none; border-bottom: 1px solid #e7d5c0; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #92400e; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: sepia(1) saturate(200%) hue-rotate(10deg); opacity: 0.4; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
    },
    {
      name: '商务蓝调 (Corporate Blue)',
      category: 'General',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #1e293b; line-height: 1.6; }
        h1 { font-size: 30px; color: #0f172a; margin-bottom: 4px; font-weight: 700; letter-spacing: -0.3px; }
        h1 + p { font-size: 12.5px; color: #64748b; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #3b82f6; }
        h2 { font-size: 12px; color: #1e40af; margin-top: 24px; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px; border-bottom: 1px solid #dbeafe; position: relative; }
        h2::after { content: ""; position: absolute; bottom: -1px; left: 0; width: 40px; height: 1px; background: #3b82f6; }
        h3 { color: #0f172a; margin-top: 14px; margin-bottom: 3px; font-size: 14px; font-weight: 600; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.65; color: #475569; }
        em { color: #94a3b8; font-style: normal; font-size: 12px; }
        ul { padding-left: 18px; }
        li { margin-bottom: 3px; font-size: 13px; line-height: 1.6; color: #475569; }
        li::marker { color: #93c5fd; }
        a { color: #1e40af; text-decoration: none; border-bottom: 1px solid #bfdbfe; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #1e40af; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(21%) sepia(88%) saturate(2252%) hue-rotate(206deg) brightness(96%) contrast(98%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '极简居中 (Minimal Center)',
      category: 'General',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #374151; text-align: center; line-height: 1.6; }
        h1 { font-size: 28px; font-weight: 300; margin-bottom: 4px; letter-spacing: 5px; text-transform: uppercase; color: #111; }
        h1 + p { font-size: 12px; color: #9ca3af; letter-spacing: 1px; margin-bottom: 22px; padding-bottom: 18px; position: relative; }
        h1 + p::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 30px; height: 1px; background: #d1d5db; }
        h2 { font-size: 10px; font-weight: 600; color: #9ca3af; margin-top: 28px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 4px; }
        h3 { color: #111827; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 500; }
        p { margin-bottom: 8px; font-size: 13px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.65; color: #6b7280; }
        em { color: #9ca3af; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 5px; font-size: 13px; line-height: 1.6; color: #6b7280; }
        a { color: #374151; text-decoration: none; border-bottom: 1px solid #e5e7eb; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #374151; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'skills', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '深紫优雅 (Deep Purple)',
      category: 'Modern',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Inter", "Noto Serif SC", sans-serif; color: #1f2937; line-height: 1.6; }
        h1 { font-size: 32px; font-weight: 300; letter-spacing: 1px; margin-bottom: 4px; color: #1e1b4b; }
        h1 + p { font-size: 12.5px; color: #6b7280; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #c4b5fd; }
        h2 { font-size: 12px; color: #5b21b6; margin-top: 26px; margin-bottom: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding-left: 14px; border-left: 3px solid #8b5cf6; }
        h3 { color: #1e1b4b; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.65; color: #4b5563; }
        em { color: #9ca3af; font-style: normal; font-size: 12px; }
        ul { padding-left: 18px; }
        li { margin-bottom: 4px; font-size: 13px; line-height: 1.6; color: #4b5563; }
        li::marker { color: #c4b5fd; }
        a { color: #6d28d9; text-decoration: none; border-bottom: 1px solid #ddd6fe; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #6d28d9; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(260deg) saturate(200%) brightness(85%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills', 'projects'] }),
      is_premium: true
    },
    {
      name: '金秋暖调 (Autumn Warm)',
      category: 'Warm',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Georgia", "Noto Serif SC", serif; color: #292524; line-height: 1.6; }
        h1 { font-size: 30px; font-weight: 700; color: #78350f; margin-bottom: 4px; letter-spacing: -0.3px; }
        h1 + p { font-size: 12.5px; color: #a8a29e; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #fbbf24; }
        h2 { font-size: 12px; color: #92400e; margin-top: 24px; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 6px; border-bottom: 1px solid #fde68a; }
        h3 { color: #78350f; margin-top: 14px; margin-bottom: 3px; font-size: 14.5px; font-weight: 600; }
        p { margin-bottom: 6px; font-size: 13.5px; line-height: 1.65; color: #44403c; }
        em { color: #a8a29e; font-style: italic; font-size: 12.5px; }
        ul { padding-left: 18px; }
        li { margin-bottom: 4px; font-size: 13.5px; line-height: 1.6; color: #44403c; }
        li::marker { color: #fbbf24; }
        a { color: #92400e; text-decoration: none; border-bottom: 1px solid #fde68a; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #92400e; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(30deg) saturate(200%) brightness(90%); opacity: 0.5; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '霓虹都市 (Neon City)',
      category: 'Creative',
      style: 'futuristic',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #d4d4d8; background: #09090b; line-height: 1.6; }
        h1 { font-size: 30px; font-weight: 700; margin-bottom: 4px; background: linear-gradient(90deg, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.3px; }
        h1 + p { font-size: 12px; color: #52525b; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #27272a; }
        h2 { font-size: 11px; color: #22d3ee; margin-top: 26px; margin-bottom: 12px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; padding-bottom: 6px; border-bottom: 1px solid #27272a; position: relative; }
        h2::after { content: ""; position: absolute; bottom: -1px; left: 0; width: 36px; height: 1px; background: #a78bfa; }
        h3 { color: #e4e4e7; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 600; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.65; color: #71717a; }
        em { color: #3f3f46; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; padding-left: 18px; position: relative; font-size: 13px; color: #71717a; line-height: 1.6; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border: 1px solid #22d3ee; border-radius: 1px; transform: rotate(45deg); }
        a { color: #22d3ee; text-decoration: none; border-bottom: 1px solid #27272a; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #22d3ee; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(1) hue-rotate(180deg); opacity: 0.4; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    },
    {
      name: '杂志排版 (Editorial)',
      category: 'Creative',
      style: 'editorial',
      css_styles: `
        .resume { font-family: "Georgia", "Noto Serif SC", serif; color: #1a1a1a; line-height: 1.55; }
        h1 { font-size: 48px; font-weight: 900; margin-bottom: 4px; line-height: 0.95; letter-spacing: -2px; color: #000; }
        h1 + p { font-size: 12px; color: #999; letter-spacing: 0.5px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 3px solid #c8102e; }
        h2 { font-size: 11px; font-weight: 900; margin-top: 26px; margin-bottom: 12px; color: #c8102e; text-transform: uppercase; letter-spacing: 2.5px; }
        h3 { font-size: 15px; font-weight: 700; margin-top: 14px; margin-bottom: 3px; color: #000; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.6; text-align: justify; color: #333; }
        em { color: #999; font-style: italic; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; font-size: 13px; line-height: 1.55; padding-left: 16px; position: relative; }
        li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #c8102e; }
        a { color: #c8102e; text-decoration: none; font-weight: 700; }
        a:hover { border-bottom: 1px solid #c8102e; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: true
    },
    {
      name: '几何现代 (Geometric)',
      category: 'Modern',
      style: 'geometric',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #2d3436; line-height: 1.6; }
        h1 { font-size: 34px; font-weight: 700; margin-bottom: 4px; color: #000; letter-spacing: -1px; }
        h1 + p { font-size: 12.5px; color: #636e72; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 4px solid #6c5ce7; }
        h2 { font-size: 12px; font-weight: 700; margin-top: 26px; margin-bottom: 12px; color: #6c5ce7; text-transform: uppercase; letter-spacing: 2px; padding-left: 18px; position: relative; }
        h2::before { content: ""; position: absolute; left: 0; top: 50%; width: 8px; height: 8px; background: #6c5ce7; transform: translateY(-50%) rotate(45deg); }
        h3 { color: #2d3436; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 700; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.65; color: #636e72; }
        em { color: #b2bec3; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; padding-left: 20px; position: relative; font-size: 13px; color: #636e72; line-height: 1.6; }
        li::before { content: ""; position: absolute; left: 2px; top: 7px; width: 5px; height: 5px; background: #a29bfe; transform: rotate(45deg); }
        a { color: #6c5ce7; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        a:hover { color: #5f27cd; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills', 'education'] }),
      is_premium: true
    },
    {
      name: '极简线条 (Line Art)',
      category: 'Minimal',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Inter", "Noto Sans SC", sans-serif; color: #2d3436; line-height: 1.65; }
        h1 { font-size: 28px; font-weight: 200; margin-bottom: 4px; color: #000; letter-spacing: 4px; text-transform: uppercase; }
        h1 + p { font-size: 12px; color: #b2bec3; letter-spacing: 1px; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid #e0e0e0; }
        h2 { font-size: 11px; font-weight: 400; margin-top: 28px; margin-bottom: 14px; color: #636e72; letter-spacing: 3px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0; }
        h3 { color: #2d3436; margin-top: 14px; margin-bottom: 4px; font-size: 14px; font-weight: 500; }
        p { margin-bottom: 6px; font-size: 13px; line-height: 1.7; color: #636e72; }
        em { color: #b2bec3; font-style: normal; font-size: 12px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 5px; font-size: 13px; line-height: 1.6; padding-left: 18px; position: relative; color: #636e72; }
        li::before { content: ""; position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: #b2bec3; }
        a { color: #636e72; text-decoration: none; border-bottom: 1px solid #dfe6e9; transition: all 0.2s; }
        a:hover { color: #000; border-bottom-color: #000; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills', 'education'] }),
      is_premium: false
    },
    {
      name: '复古打字机 (Typewriter)',
      category: 'Retro',
      style: 'vintage',
      css_styles: `
        .resume { font-family: "Courier New", "Noto Sans SC", monospace; color: #1a1a1a; line-height: 1.55; background: #faf8f5; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; color: #000; letter-spacing: 3px; text-transform: uppercase; }
        h1 + p { font-size: 12px; color: #888; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px double #1a1a1a; }
        h2 { font-size: 12px; font-weight: 700; margin-top: 24px; margin-bottom: 10px; color: #000; letter-spacing: 2px; text-transform: uppercase; padding: 4px 8px; background: #f0ece4; display: inline-block; }
        h3 { color: #1a1a1a; margin-top: 14px; margin-bottom: 3px; font-size: 13px; font-weight: 700; }
        p { margin-bottom: 6px; font-size: 12.5px; line-height: 1.65; color: #444; }
        em { color: #999; font-style: normal; font-size: 11.5px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 4px; font-size: 12.5px; line-height: 1.55; padding-left: 18px; position: relative; color: #444; }
        li::before { content: ">"; position: absolute; left: 2px; color: #999; font-weight: 700; }
        a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 2px; }
        a:hover { background: #f0ece4; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '奢华金黑 (Luxury Gold)',
      category: 'Professional',
      style: 'luxury',
      css_styles: `
        .resume { font-family: "Georgia", "Noto Serif SC", serif; color: #d4d4d8; background: #0a0a0a; line-height: 1.6; }
        h1 { font-size: 32px; font-weight: 400; margin-bottom: 4px; color: #d4af37; letter-spacing: 4px; text-transform: uppercase; text-align: center; }
        h1 + p { text-align: center; font-size: 12px; color: #52525b; letter-spacing: 1.5px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #27272a; }
        h2 { font-size: 11px; font-weight: 600; margin-top: 28px; margin-bottom: 14px; color: #d4af37; letter-spacing: 3px; text-transform: uppercase; text-align: center; }
        h3 { color: #e5e5e5; margin-top: 16px; margin-bottom: 4px; font-size: 15px; font-weight: 500; }
        p { margin-bottom: 8px; font-size: 13.5px; line-height: 1.7; color: #71717a; }
        em { color: #3f3f46; font-style: italic; font-size: 12.5px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 5px; font-size: 13.5px; line-height: 1.6; color: #71717a; padding-left: 18px; position: relative; }
        li::before { content: ""; position: absolute; left: 4px; top: 8px; width: 4px; height: 4px; border: 1px solid #d4af37; border-radius: 50%; }
        a { color: #d4af37; text-decoration: none; border-bottom: 1px solid #3f3f46; transition: border-color 0.2s; }
        a:hover { border-bottom-color: #d4af37; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(1); opacity: 0.3; }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills'] }),
      is_premium: true
    }
  ];
};

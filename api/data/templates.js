
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
        .resume { font-family: "Noto Serif SC", serif; color: #333; line-height: 1.6; }
        h1 { margin: 0 0 10px 0; font-size: 32px; font-weight: 700; border-bottom: 3px solid #333; padding-bottom: 10px; letter-spacing: 1px; }
        h2 { font-size: 18px; color: #000; margin-top: 25px; margin-bottom: 15px; font-weight: 700; border-left: 4px solid #333; padding-left: 10px; text-transform: uppercase; letter-spacing: 1px; }
        p { margin-bottom: 10px; font-size: 14px; }
        ul { padding-left: 20px; margin-bottom: 10px; }
        li { margin-bottom: 5px; font-size: 14px; }
        a { color: #333; text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; }
        blockquote { border-left: 2px solid #ccc; padding-left: 10px; margin: 10px 0; font-style: italic; color: #666; }
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
        .resume { font-family: "Quicksand", "Noto Sans SC", sans-serif; color: #444; background: #fff; }
        h1 { margin: 0; font-size: 36px; font-weight: 300; letter-spacing: 2px; text-align: center; margin-bottom: 30px; color: #000; }
        h2 { font-size: 16px; color: #b89c72; margin-top: 30px; margin-bottom: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; text-align: center; position: relative; }
        h2::after { content: ""; display: block; width: 40px; height: 1px; background: #b89c72; margin: 10px auto 0; }
        p { margin-bottom: 12px; font-size: 13px; text-align: justify; }
        ul { padding-left: 0; list-style: none; text-align: center; }
        li { margin-bottom: 8px; font-size: 13px; }
        a { color: #8a7b66; text-decoration: none; transition: color 0.3s; }
        a:hover { color: #000; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: sepia(1) saturate(200%) hue-rotate(10deg); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'projects', 'education'] }),
      is_premium: true
    },
    {
      name: '科技极简 (Tech Minimal)',
      category: 'Tech',
      style: 'clean',
      css_styles: `
        .resume { font-family: "JetBrains Mono", "Consolas", monospace; color: #1a1a1a; font-size: 12px; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 5px; letter-spacing: -0.5px; }
        h2 { font-size: 14px; font-weight: 700; color: #2563eb; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
        p { margin-bottom: 8px; line-height: 1.5; }
        ul { padding-left: 15px; }
        li { margin-bottom: 4px; }
        a { color: #2563eb; text-decoration: none; border-bottom: 1px solid transparent; }
        a:hover { border-bottom-color: #2563eb; }
        code { background: #f1f5f9; padding: 2px 4px; borderRadius: 2px; font-size: 11px; color: #0f172a; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(31%) sepia(96%) saturate(2048%) hue-rotate(211deg) brightness(96%) contrast(94%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'skills', 'education'] }),
      is_premium: false
    },
    {
      name: '瑞士国际 (Swiss Intl)',
      category: 'General',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Helvetica Neue", "Arial", sans-serif; color: #000; line-height: 1.4; }
        h1 { font-size: 48px; font-weight: 900; margin-bottom: 20px; letter-spacing: -1px; line-height: 0.9; text-transform: uppercase; }
        h2 { font-size: 14px; font-weight: 700; text-transform: uppercase; margin-top: 30px; margin-bottom: 10px; border-top: 4px solid #000; padding-top: 10px; display: inline-block; }
        p { margin-bottom: 10px; font-size: 14px; max-width: 600px; }
        ul { list-style: square; padding-left: 20px; }
        li { margin-bottom: 5px; font-size: 14px; }
        a { color: #000; text-decoration: underline; }
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
        .resume { font-family: "Garamond", "Georgia", serif; color: #222; line-height: 1.5; }
        h1 { font-size: 28px; font-weight: normal; text-align: center; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px; }
        h2 { font-size: 16px; font-weight: bold; border-bottom: 1px solid #000; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
        p { margin-bottom: 8px; font-size: 14px; text-align: justify; }
        ul { padding-left: 20px; margin-bottom: 10px; }
        li { margin-bottom: 4px; font-size: 14px; }
        a { color: #222; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'education', 'experience', 'publications'] }),
      is_premium: false
    },
    {
      name: '柔和森系 (Soft Forest)',
      category: 'Creative',
      style: 'nature',
      css_styles: `
        .resume { font-family: "Varela Round", "Noto Sans SC", sans-serif; color: #2c3e50; background: #fdfdfd; }
        h1 { font-size: 32px; color: #2e7d32; margin-bottom: 10px; font-weight: 600; }
        h2 { font-size: 18px; color: #4caf50; border-bottom: 2px solid #a5d6a7; margin-top: 25px; margin-bottom: 15px; padding-bottom: 5px; }
        p { font-size: 14px; color: #455a64; line-height: 1.6; }
        a { color: #2e7d32; text-decoration: none; font-weight: 500; }
        li::marker { color: #66bb6a; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(90deg) saturate(150%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'skills', 'experience'] }),
      is_premium: true
    },
    {
      name: '活力橙光 (Vibrant Orange)',
      category: 'Creative',
      style: 'modern',
      css_styles: `
        .resume { font-family: "Roboto", "Noto Sans SC", sans-serif; color: #333; }
        h1 { font-size: 36px; font-weight: 900; color: #e65100; margin-bottom: 5px; letter-spacing: -1px; }
        h2 { font-size: 20px; font-weight: 700; color: #333; margin-top: 30px; margin-bottom: 15px; border-left: 6px solid #ff9800; padding-left: 12px; }
        p { margin-bottom: 10px; font-size: 14px; }
        strong { color: #e65100; }
        a { color: #f57c00; text-decoration: none; border-bottom: 2px solid #ffe0b2; }
        a:hover { background: #ffe0b2; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(-30deg) saturate(200%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'skills', 'experience', 'projects'] }),
      is_premium: false
    },
    {
      name: '深邃午夜 (Midnight Header)',
      category: 'Modern',
      style: 'bold',
      css_styles: `
        .resume { font-family: "Montserrat", "Noto Sans SC", sans-serif; color: #333; }
        h1 { background: #1a1a1a; color: #fff; padding: 40px 20px; margin: -20px -20px 30px -20px; text-align: center; font-size: 32px; letter-spacing: 2px; font-weight: 300; }
        h2 { font-size: 16px; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 3px; margin-top: 40px; margin-bottom: 20px; color: #1a1a1a; }
        h2::after { content: "•"; display: block; color: #ccc; margin-top: 10px; font-size: 20px; }
        p { text-align: center; max-width: 600px; margin: 0 auto 15px auto; font-size: 14px; color: #555; }
        ul { list-style: none; padding: 0; text-align: center; }
        li { margin-bottom: 8px; font-size: 14px; }
        a { color: #555; border-bottom: 1px dotted #555; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '粉彩艺术 (Pastel Art)',
      category: 'Creative',
      style: 'soft',
      css_styles: `
        .resume { font-family: "Quicksand", "Noto Sans SC", sans-serif; color: #555; }
        h1 { font-size: 36px; color: #d81b60; margin-bottom: 10px; font-weight: 700; text-align: right; }
        h2 { font-size: 18px; color: #8e24aa; margin-top: 30px; margin-bottom: 10px; font-weight: 600; text-align: right; border-bottom: 1px dashed #ce93d8; padding-bottom: 5px; }
        p, li { text-align: right; font-size: 14px; margin-bottom: 8px; }
        ul { list-style: none; padding: 0; }
        a { color: #d81b60; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(280deg) saturate(150%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'projects', 'skills'] }),
      is_premium: true
    },
    {
      name: '左侧强调 (Left Focus)',
      category: 'Modern',
      style: 'clean',
      css_styles: `
        .resume { font-family: "Lato", "Noto Sans SC", sans-serif; color: #333; }
        h1 { font-size: 32px; font-weight: 300; margin-bottom: 30px; border-left: 10px solid #333; padding-left: 20px; line-height: 1; }
        h2 { font-size: 16px; font-weight: 900; text-transform: uppercase; margin-top: 30px; margin-bottom: 15px; color: #888; letter-spacing: 1px; }
        p { margin-bottom: 12px; font-size: 14px; border-left: 1px solid #eee; padding-left: 20px; }
        ul { padding-left: 20px; border-left: 1px solid #eee; margin-left: 0; }
        li { margin-bottom: 8px; font-size: 14px; padding-left: 10px; }
        a { color: #000; font-weight: 700; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '商务蓝调 (Corporate Blue)',
      category: 'General',
      style: 'professional',
      css_styles: `
        .resume { font-family: "Arial", "Noto Sans SC", sans-serif; color: #333; }
        h1 { font-size: 30px; color: #0d47a1; margin-bottom: 5px; font-weight: 700; }
        h2 { font-size: 18px; color: #1565c0; border-bottom: 2px solid #bbdefb; margin-top: 25px; margin-bottom: 10px; padding-bottom: 5px; }
        p { margin-bottom: 10px; font-size: 14px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; font-size: 14px; }
        a { color: #0d47a1; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(21%) sepia(88%) saturate(2252%) hue-rotate(206deg) brightness(96%) contrast(98%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '极简居中 (Minimal Center)',
      category: 'General',
      style: 'minimal',
      css_styles: `
        .resume { font-family: "Open Sans", "Noto Sans SC", sans-serif; color: #444; text-align: center; }
        h1 { font-size: 28px; font-weight: 600; margin-bottom: 15px; letter-spacing: 2px; text-transform: uppercase; }
        h2 { font-size: 14px; font-weight: 600; color: #999; margin-top: 40px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 3px; }
        p { margin-bottom: 15px; font-size: 14px; max-width: 80%; margin-left: auto; margin-right: auto; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 8px; font-size: 14px; }
        a { color: #444; text-decoration: none; border-bottom: 1px solid #ccc; padding-bottom: 1px; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'skills', 'experience', 'education'] }),
      is_premium: false
    },
    {
      name: '海洋蓝调 (Ocean Blue)',
      category: 'Creative',
      style: 'fresh',
      css_styles: `
        .resume { font-family: "Nunito", "Noto Sans SC", sans-serif; color: #2d3748; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); }
        h1 { font-size: 32px; font-weight: 700; color: #0369a1; margin-bottom: 10px; letter-spacing: 0.5px; }
        h2 { font-size: 18px; color: #0ea5e9; margin-top: 25px; margin-bottom: 15px; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid #7dd3fc; }
        p { margin-bottom: 10px; font-size: 14px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; font-size: 14px; }
        a { color: #0369a1; text-decoration: none; font-weight: 500; }
        a:hover { color: #0c4a6e; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(180deg) saturate(150%) brightness(90%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'skills', 'experience', 'projects'] }),
      is_premium: false
    },
    {
      name: '樱花粉韵 (Cherry Blossom)',
      category: 'Creative',
      style: 'romantic',
      css_styles: `
        .resume { font-family: "Hiragino Mincho ProN", "Noto Serif SC", serif; color: #4a4a4a; background: #fff5f7; }
        h1 { font-size: 36px; font-weight: 300; color: #be185d; margin-bottom: 15px; letter-spacing: 2px; }
        h2 { font-size: 16px; color: #db2777; margin-top: 30px; margin-bottom: 15px; font-weight: 500; padding-bottom: 5px; border-bottom: 1px dotted #f9a8d4; }
        p { margin-bottom: 12px; font-size: 14px; line-height: 1.8; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; font-size: 14px; }
        a { color: #be185d; text-decoration: none; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(300deg) saturate(180%) brightness(95%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education'] }),
      is_premium: true
    },
    {
      name: '深紫优雅 (Deep Purple)',
      category: 'Modern',
      style: 'elegant',
      css_styles: `
        .resume { font-family: "Playfair Display", "Noto Serif SC", serif; color: #1f2937; }
        h1 { font-size: 38px; font-weight: 400; color: #4c1d95; margin-bottom: 20px; font-style: italic; }
        h2 { font-size: 18px; color: #7c3aed; margin-top: 30px; margin-bottom: 15px; font-weight: 600; letter-spacing: 1px; position: relative; padding-left: 15px; }
        h2::before { content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 100%; background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%); }
        p { margin-bottom: 12px; font-size: 14px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; font-size: 14px; }
        a { color: #7c3aed; text-decoration: none; }
        a:hover { color: #4c1d95; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(260deg) saturate(200%) brightness(85%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'skills', 'projects'] }),
      is_premium: true
    },
    {
      name: '金秋收获 (Autumn Gold)',
      category: 'Warm',
      style: 'warm',
      css_styles: `
        .resume { font-family: "Crimson Pro", "Noto Serif SC", serif; color: #44403c; background: linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%); }
        h1 { font-size: 34px; font-weight: 600; color: #c2410c; margin-bottom: 15px; }
        h2 { font-size: 18px; color: #ea580c; margin-top: 25px; margin-bottom: 15px; font-weight: 600; border-bottom: 2px solid #fbbf24; padding-bottom: 5px; }
        p { margin-bottom: 12px; font-size: 15px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; font-size: 14px; }
        a { color: #c2410c; text-decoration: none; font-weight: 500; }
        a:hover { color: #9a3412; }
        ${commonIconsCss}
        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(30deg) saturate(200%) brightness(90%); }
      `,
      structure_json: JSON.stringify({ sections: ['header', 'experience', 'education', 'skills'] }),
      is_premium: false
    },
    {
      name: '经典黑白 (Classic B&amp;W)',
      category: 'Professional',
      style: 'classic',
      css_styles: `
        .resume { font-family: "Baskerville", "Noto Serif SC", serif; color: #000; }
        h1 { font-size: 30px; font-weight: 700; margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 10px; }
        h2 { font-size: 14px; font-weight: 700; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; border-top: 1px solid #ccc; padding-top: 10px; }
        p { margin-bottom: 8px; font-size: 14px; line-height: 1.7; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; font-size: 14px; }
        a { color: #000; text-decoration: underline; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'experience', 'education', 'skills'] }),
      is_premium: false
    }
  ];
};


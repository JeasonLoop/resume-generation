import { getCommonIconsCss } from './common.js';

export const creativeTemplates = () => {
  const commonIconsCss = getCommonIconsCss();

  return [
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
        h3 + p { color: #6b7280; font-size: 0.9rem; font-weight: 600; margin-top: 4px; }
        ul { padding-left: 20px; }
        li::marker { color: #eab308; font-size: 1.2em; }
        a { color: #ca8a04; font-weight: 600; text-decoration: none; }
        ${commonIconsCss}
      `,
      structure_json: JSON.stringify({ sections: ['header', 'summary', 'projects', 'experience'] }),
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
      name: '青绿石光 (Malachite Green)',
      category: 'Elegant',
      style: 'nature',
      css_styles: `
        .resume { font-family: "Optima", serif; color: #2d3748; line-height: 1.7; background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; }
        h1 { font-size: 2.6rem; font-weight: normal; color: #065f46; margin-bottom: 5px; text-align: center; }
        h1 + p { color: #4b5563; font-size: 0.9rem; margin-bottom: 35px; text-align: center; }
        h2 { font-size: 1.15rem; font-weight: bold; color: #065f46; text-transform: uppercase; margin-top: 35px; margin-bottom: 20px; text-align: center; letter-spacing: 2px; }
        h2::after { content: ""; display: block; width: 30px; height: 2px; background: #34d399; margin: 8px auto 0 auto; border-radius: 2px; }
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

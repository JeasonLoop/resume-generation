-- Auto-generated from SQLite by api/scripts/export-sqlite-for-d1.js
-- Import command example:
-- wrangler d1 execute resume_generation --remote --file ./migrations/9000_import_from_sqlite.sql

-- users: 2 rows
INSERT INTO users (id, email, password_hash, name, avatar_url, is_premium, ai_usage_count, custom_api_key, custom_base_url, custom_model, created_at, updated_at) VALUES (1, 'test@example.com', '$2a$10$Fer3G8imMTqyoQJdvl7whe2e29arvUESlAbE7Kni4MWbdMeGl4vOa', '测试用户', NULL, 1, 0, NULL, NULL, NULL, '2026-03-04 04:02:39.017 +00:00', '2026-03-04 04:02:39.017 +00:00');
INSERT INTO users (id, email, password_hash, name, avatar_url, is_premium, ai_usage_count, custom_api_key, custom_base_url, custom_model, created_at, updated_at) VALUES (2, 'fsj77524@163.com', '$2a$10$qygz2/..PZazczs4isIuIONCR5m2BXMyareCqAFfTH60N7Lp54dKS', 'jeff', NULL, 0, 0, NULL, NULL, NULL, '2026-03-04 04:06:54.072 +00:00', '2026-03-04 04:06:54.072 +00:00');

-- templates: 27 rows
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (1, '极简北欧 (Nordic Minimal)', 'Minimal', 'minimal', '
        .resume { font-family: "Inter", -apple-system, sans-serif; color: #1a1a1a; line-height: 1.6; background: #ffffff; padding: 50px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 2.2rem; font-weight: 300; letter-spacing: -0.02em; margin-bottom: 8px; color: #000; }
        h1 + p { font-size: 0.9rem; color: #666; margin-bottom: 40px; letter-spacing: 0.05em; text-transform: uppercase; }
        h2 { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-top: 45px; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        h3 { font-size: 1.1rem; font-weight: 500; color: #111; margin-top: 25px; display: flex; justify-content: space-between; }
        h3 + p { font-size: 0.85rem; color: #888; margin-bottom: 12px; }
        ul { padding-left: 18px; list-style-type: square; }
        li { margin-bottom: 6px; color: #444; font-size: 0.95rem; }
        li::marker { color: #ddd; }
        a { color: #000; text-decoration: none; border-bottom: 1px solid #eee; transition: all 0.2s; }
        a:hover { border-bottom-color: #000; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education","skills"]}', 0, 0, '2026-04-08 02:28:22.125 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (2, '纯净网格 (Clean Grid)', 'Minimal', 'minimal', '
        .resume { font-family: "IBM Plex Sans", sans-serif; color: #2d3436; line-height: 1.7; background: #fff; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #000; margin-bottom: 10px; }
        h1 + p { font-size: 0.95rem; color: #636e72; margin-bottom: 35px; display: flex; gap: 15px; }
        h2 { font-size: 1rem; font-weight: 700; text-transform: uppercase; color: #000; margin-top: 35px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        h2::after { content: ""; flex: 1; height: 1px; background: #dfe6e9; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #2d3436; margin-top: 20px; }
        h3 + p { font-size: 0.85rem; color: #b2bec3; margin-bottom: 10px; font-weight: 600; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #0984e3; text-decoration: none; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","skills"]}', 0, 0, '2026-04-08 02:28:22.193 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (3, '瑞士风格 (Swiss Style)', 'Minimal', 'minimal', '
        .resume { font-family: "Helvetica", Arial, sans-serif; color: #000; line-height: 1.4; background: #fff; padding: 50px; }
        h1 { font-size: 4rem; font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; margin-bottom: 20px; text-transform: uppercase; }
        h1 + p { font-size: 1.1rem; font-weight: 700; margin-bottom: 50px; color: #ff3e00; }
        h2 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; border-top: 4px solid #000; padding-top: 10px; margin-top: 40px; margin-bottom: 20px; }
        h3 { font-size: 1.1rem; font-weight: 700; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; font-weight: 700; color: #666; margin-bottom: 10px; }
        ul { padding-left: 0; list-style: none; }
        li { margin-bottom: 8px; position: relative; padding-left: 20px; }
        li::before { content: "■"; position: absolute; left: 0; font-size: 8px; top: 6px; }
        a { color: #000; text-decoration: none; font-weight: 900; border-bottom: 3px solid #000; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education"]}', 1, 0, '2026-04-08 02:28:22.273 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (4, '禅意留白 (Zen Space)', 'Minimal', 'clean', '
        .resume { font-family: "Noto Serif SC", serif; color: #444; line-height: 2; background: #fcfaf7; padding: 60px; }
        h1 { font-size: 2rem; font-weight: 400; color: #111; text-align: center; letter-spacing: 0.2em; margin-bottom: 15px; }
        h1 + p { font-size: 0.9rem; color: #999; text-align: center; margin-bottom: 50px; }
        h2 { font-size: 0.9rem; font-weight: 400; color: #888; text-align: center; text-transform: uppercase; letter-spacing: 0.4em; margin-top: 50px; margin-bottom: 30px; position: relative; }
        h2::before { content: ""; position: absolute; top: 50%; left: 0; width: 35%; height: 1px; background: #eee; }
        h2::after { content: ""; position: absolute; top: 50%; right: 0; width: 35%; height: 1px; background: #eee; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #222; margin-top: 30px; }
        h3 + p { font-size: 0.85rem; color: #aaa; margin-bottom: 15px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
        a { color: #666; text-decoration: none; border-bottom: 1px solid #ddd; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience"]}', 1, 0, '2026-04-08 02:28:22.354 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (5, '华尔街精英 (Wall Street)', 'Professional', 'professional', '
        .resume { font-family: "Garamond", serif; color: #1a1a1a; line-height: 1.4; background: #ffffff; padding: 50px; }
        h1 { font-size: 2.4rem; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px; }
        h1 + p { text-align: center; font-size: 0.9rem; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
        h2 { font-size: 1.1rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 25px; margin-bottom: 12px; padding-bottom: 2px; }
        h3 { font-size: 1.05rem; font-weight: bold; margin-top: 15px; display: flex; justify-content: space-between; }
        h3 + p { font-style: italic; font-size: 0.95rem; color: #444; margin-bottom: 8px; }
        ul { padding-left: 20px; list-style-type: disc; }
        li { margin-bottom: 4px; text-align: justify; }
        a { color: #000; text-decoration: none; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education","skills"]}', 0, 0, '2026-04-08 02:28:22.436 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (6, '硅谷之光 (Silicon Valley)', 'Professional', 'professional', '
        .resume { font-family: "Inter", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 45px; }
        h1 { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        h1 + p { font-size: 1rem; color: #64748b; margin-bottom: 35px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 30px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        h2::after { content: ""; flex: 1; height: 1px; background: #e2e8f0; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #1e293b; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #3b82f6; font-weight: 600; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { color: #94a3b8; }
        a { color: #2563eb; font-weight: 500; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","skills"]}', 0, 0, '2026-04-08 02:28:22.529 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (7, '蓝色经典 (Classic Blue)', 'Professional', 'professional', '
        .resume { font-family: "Roboto", sans-serif; color: #374151; line-height: 1.6; background: #ffffff; padding: 45px; border-left: 10px solid #1e40af; }
        h1 { font-size: 2.6rem; font-weight: 900; color: #1e3a8a; margin-bottom: 5px; }
        h1 + p { font-size: 1rem; color: #6b7280; margin-bottom: 35px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #1e40af; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #dbeafe; padding-bottom: 5px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #1e40af; font-weight: 500; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        li::marker { color: #1e40af; }
        a { color: #1e40af; font-weight: 600; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education","skills"]}', 1, 0, '2026-04-08 02:28:22.611 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (8, '深邃灰调 (Deep Grey)', 'Professional', 'professional', '
        .resume { font-family: "Lato", sans-serif; color: #333; line-height: 1.6; background: #fdfdfd; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 900; color: #2c3e50; margin-bottom: 5px; }
        h1 + p { font-size: 1rem; color: #7f8c8d; margin-bottom: 35px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #fff; background: #2c3e50; padding: 6px 15px; margin-top: 30px; margin-bottom: 15px; display: inline-block; border-radius: 4px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #2c3e50; margin-top: 20px; }
        h3 + p { font-size: 0.9rem; color: #3498db; font-weight: 700; margin-top: 2px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { color: #2c3e50; }
        a { color: #2980b9; font-weight: 600; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","projects"]}', 1, 0, '2026-04-08 02:28:22.704 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (9, '未来主义 (Neo Future)', 'Modern', 'clean', '
        .resume { font-family: "Outfit", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; letter-spacing: -0.03em; }
        h1 + p { font-size: 1rem; color: #64748b; margin-bottom: 30px; font-weight: 500; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #1e293b; margin-top: 35px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        h2::before { content: ""; width: 32px; height: 4px; background: #6366f1; border-radius: 2px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #6366f1; font-weight: 600; margin-bottom: 12px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; position: relative; }
        li::marker { color: #a855f7; }
        a { color: #6366f1; text-decoration: none; font-weight: 600; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","skills"]}', 1, 0, '2026-04-08 02:28:22.835 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (10, '渐变呼吸 (Gradient Breath)', 'Modern', 'clean', '
        .resume { font-family: "Inter", sans-serif; color: #475569; line-height: 1.7; background: #f8fafc; padding: 50px; }
        .resume > *:first-child { background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 40px; margin: -50px -50px 40px -50px; }
        h1 { font-size: 2.8rem; font-weight: 800; margin-bottom: 8px; background: linear-gradient(to right, #1e293b, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        h1 + p { font-size: 1rem; color: #64748b; font-weight: 500; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 35px; margin-bottom: 20px; border-left: 4px solid #3b82f6; padding-left: 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #3b82f6; font-weight: 500; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #2563eb; font-weight: 600; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education","skills"]}', 0, 0, '2026-04-08 02:28:22.916 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (11, '极简阴影 (Soft Shadow)', 'Modern', 'clean', '
        .resume { font-family: "Plus Jakarta Sans", sans-serif; color: #334155; line-height: 1.6; background: #ffffff; padding: 45px; }
        h1 { font-size: 2.6rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        h1 + p { color: #64748b; margin-bottom: 35px; display: flex; gap: 20px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-top: 35px; margin-bottom: 20px; background: #f1f5f9; padding: 10px 20px; border-radius: 12px; display: inline-block; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { color: #3b82f6; }
        a { color: #0f172a; font-weight: 700; text-decoration: underline; text-decoration-color: #cbd5e1; text-underline-offset: 4px; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","projects"]}', 0, 0, '2026-04-08 02:28:23.011 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (12, '动感青绿 (Dynamic Teal)', 'Modern', 'clean', '
        .resume { font-family: "Urbanist", sans-serif; color: #1e293b; line-height: 1.6; background: #fff; padding: 45px; border-top: 10px solid #0d9488; }
        h1 { font-size: 3.2rem; font-weight: 900; color: #0f172a; margin-bottom: 5px; letter-spacing: -0.04em; }
        h1 + p { font-size: 1.1rem; color: #0d9488; font-weight: 700; margin-bottom: 35px; }
        h2 { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-top: 35px; margin-bottom: 20px; display: flex; align-items: center; }
        h2::after { content: ""; flex: 1; height: 2px; background: #ccfbf1; margin-left: 15px; }
        h3 { font-size: 1.15rem; font-weight: 700; color: #111827; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #0d9488; font-weight: 600; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        li::marker { content: "→ "; color: #0d9488; }
        a { color: #0d9488; font-weight: 700; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","projects","skills"]}', 1, 0, '2026-04-08 02:28:23.090 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (13, '法式优雅 (French Elegance)', 'Elegant', 'elegant', '
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
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","education"]}', 1, 0, '2026-04-08 02:28:23.145 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (14, '大理石纹 (Marble Texture)', 'Elegant', 'elegant', '
        .resume { font-family: "Montserrat", sans-serif; color: #444; line-height: 1.7; background: #ffffff; padding: 50px; background-image: radial-gradient(#f0f0f0 1px, transparent 1px); background-size: 20px 20px; }
        h1 { font-size: 2.8rem; font-weight: 300; color: #000; margin-bottom: 5px; letter-spacing: 5px; text-transform: uppercase; text-align: center; }
        h1 + p { text-align: center; font-size: 0.9rem; color: #666; margin-bottom: 40px; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 10px 0; display: inline-block; width: 100%; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 2px; margin-top: 40px; margin-bottom: 20px; border-left: 5px solid #000; padding-left: 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #222; margin-top: 25px; }
        h3 + p { font-size: 0.85rem; color: #888; font-weight: 600; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #000; font-weight: 700; text-decoration: none; box-shadow: inset 0 -2px 0 #eee; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","skills"]}', 1, 0, '2026-04-08 02:28:23.214 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (15, '香槟晨曦 (Champagne Dawn)', 'Elegant', 'soft', '
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
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","education"]}', 0, 0, '2026-04-08 02:28:23.269 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (16, '午夜丝绒 (Midnight Velvet)', 'Elegant', 'dark', '
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
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(70%) sepia(40%) saturate(600%) hue-rotate(5deg); }
      ', '{"sections":["header","experience","education","skills"]}', 1, 0, '2026-04-08 02:28:23.353 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (17, '波普色彩 (Pop Color)', 'Creative', 'bold', '
        .resume { font-family: "Space Grotesk", sans-serif; color: #000; line-height: 1.5; background: #fff; padding: 45px; border: 4px solid #000; box-shadow: 15px 15px 0 #ff0055; }
        h1 { font-size: 3.5rem; font-weight: 900; color: #000; text-transform: uppercase; margin-bottom: 10px; letter-spacing: -2px; }
        h1 + p { font-size: 1.2rem; background: #00ffcc; display: inline-block; padding: 5px 15px; font-weight: 900; margin-bottom: 40px; transform: rotate(-1deg); }
        h2 { font-size: 1.5rem; font-weight: 900; background: #ffff00; color: #000; padding: 5px 15px; margin-top: 40px; margin-bottom: 20px; display: inline-block; border: 3px solid #000; }
        h3 { font-size: 1.2rem; font-weight: 800; margin-top: 25px; color: #ff0055; }
        h3 + p { font-size: 1rem; font-weight: 700; color: #000; }
        ul { padding-left: 25px; list-style-type: square; }
        li { margin-bottom: 8px; font-weight: 500; }
        a { color: #000; background: #00ffcc; padding: 0 5px; font-weight: 900; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","summary","experience","projects"]}', 1, 0, '2026-04-08 02:28:23.475 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (18, '孟菲斯 (Memphis)', 'Creative', 'bold', '
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
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","skills"]}', 1, 0, '2026-04-08 02:28:23.574 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (19, '赛博霓虹 (Cyber Neon)', 'Creative', 'dark', '
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
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(100%) brightness(200%); }
      ', '{"sections":["header","experience","skills","projects"]}', 1, 0, '2026-04-08 02:28:23.636 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (20, '艺术拼贴 (Art Collage)', 'Creative', 'bold', '
        .resume { font-family: "DM Sans", sans-serif; color: #1a1a1a; line-height: 1.6; background: #f4f4f4; padding: 50px; }
        h1 { font-size: 4rem; font-weight: 900; line-height: 0.8; margin-bottom: 20px; letter-spacing: -0.05em; }
        h1 + p { font-size: 1.2rem; font-weight: 400; color: #666; margin-bottom: 50px; border-left: 10px solid #000; padding-left: 20px; }
        h2 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; margin-top: 50px; margin-bottom: 25px; background: #000; color: #fff; padding: 10px 20px; transform: skew(-10deg); display: inline-block; }
        h3 { font-size: 1.2rem; font-weight: 700; margin-top: 30px; border-bottom: 4px solid #000; display: inline-block; }
        h3 + p { font-size: 1rem; font-weight: 500; color: #444; margin-top: 8px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 12px; font-size: 1.1rem; }
        a { color: #000; font-weight: 900; text-decoration: underline; text-decoration-thickness: 4px; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education"]}', 1, 0, '2026-04-08 02:28:23.712 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (21, '代码极客 (Code Geek)', 'Tech', 'clean', '
        .resume { font-family: "Fira Code", monospace; color: #d1d5db; line-height: 1.6; background: #0f172a; padding: 45px; border-radius: 12px; }
        h1 { font-size: 2.4rem; font-weight: 700; color: #38bdf8; margin-bottom: 10px; }
        h1::before { content: "const name = ''"; color: #94a3b8; font-weight: 400; font-size: 1.2rem; }
        h1::after { content: "'';"; color: #94a3b8; font-weight: 400; font-size: 1.2rem; }
        h1 + p { font-size: 1rem; color: #818cf8; margin-bottom: 40px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #fbbf24; margin-top: 35px; margin-bottom: 20px; }
        h2::before { content: "## "; color: #64748b; }
        h3 { font-size: 1.1rem; font-weight: 600; color: #38bdf8; margin-top: 25px; }
        h3::before { content: "### "; color: #64748b; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; margin-top: 4px; }
        ul { padding-left: 20px; list-style-type: none; }
        li { margin-bottom: 8px; position: relative; }
        li::before { content: "- "; color: #38bdf8; position: absolute; left: -15px; }
        a { color: #38bdf8; text-decoration: none; border-bottom: 1px dashed #38bdf8; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(80%) sepia(20%) saturate(1000%) hue-rotate(180deg); }
      ', '{"sections":["header","skills","experience","projects"]}', 1, 0, '2026-04-08 02:28:23.824 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (22, '终端控制台 (Terminal)', 'Tech', 'dark', '
        .resume { font-family: "JetBrains Mono", monospace; color: #10b981; line-height: 1.5; background: #000; padding: 40px; border: 1px solid #10b981; }
        h1 { font-size: 2.2rem; font-weight: 700; color: #fff; margin-bottom: 10px; }
        h1::before { content: "$ whoami "; color: #10b981; font-size: 1rem; }
        h1 + p { font-size: 0.9rem; color: #10b981; margin-bottom: 40px; opacity: 0.8; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #000; background: #10b981; padding: 4px 12px; margin-top: 30px; margin-bottom: 20px; display: inline-block; }
        h3 { font-size: 1.05rem; font-weight: 700; color: #fff; margin-top: 20px; }
        h3::before { content: "> "; color: #10b981; }
        h3 + p { font-size: 0.85rem; color: #10b981; margin-top: 4px; }
        ul { padding-left: 20px; list-style-type: square; }
        li { margin-bottom: 6px; }
        a { color: #fff; text-decoration: underline; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(100deg); }
      ', '{"sections":["header","skills","experience","education"]}', 1, 0, '2026-04-08 02:28:23.923 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (23, '极简算法 (Algorithm)', 'Tech', 'clean', '
        .resume { font-family: "Roboto Mono", monospace; color: #334155; line-height: 1.6; background: #fff; padding: 45px; }
        h1 { font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 5px; }
        h1 + p { font-size: 0.95rem; color: #64748b; margin-bottom: 35px; border-left: 4px solid #e2e8f0; padding-left: 15px; }
        h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 35px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-top: 25px; }
        h3 + p { font-size: 0.9rem; color: #94a3b8; font-weight: 500; margin-top: 4px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { content: "0x"; color: #cbd5e1; font-size: 0.8rem; }
        a { color: #0f172a; font-weight: 700; text-decoration: none; border-bottom: 2px solid #38bdf8; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","skills","experience","projects"]}', 0, 0, '2026-04-08 02:28:23.986 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (24, '矩阵空间 (Matrix)', 'Tech', 'dark', '
        .resume { font-family: "Share Tech Mono", monospace; color: #00ff41; line-height: 1.4; background: #000; padding: 50px; }
        h1 { font-size: 3rem; font-weight: 400; color: #00ff41; text-align: center; text-shadow: 0 0 10px #00ff41; margin-bottom: 10px; }
        h1 + p { text-align: center; color: #008f11; font-size: 1.1rem; margin-bottom: 50px; text-transform: uppercase; letter-spacing: 10px; }
        h2 { font-size: 1.4rem; font-weight: 400; color: #00ff41; border: 1px solid #00ff41; padding: 5px 20px; margin-top: 40px; margin-bottom: 25px; display: inline-block; }
        h3 { font-size: 1.2rem; font-weight: 400; color: #00ff41; margin-top: 30px; }
        h3 + p { color: #008f11; font-size: 0.9rem; }
        ul { padding-left: 20px; list-style-type: none; }
        li { margin-bottom: 10px; position: relative; }
        li::before { content: ">>"; color: #00ff41; position: absolute; left: -30px; }
        a { color: #00ff41; text-decoration: none; border: 1px solid #00ff41; padding: 0 5px; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

        a[href^="mailto:"]::before, a[href^="tel:"]::before, a[href^="http"]::before { filter: hue-rotate(120deg) brightness(1.5); }
      ', '{"sections":["header","skills","experience","projects"]}', 1, 0, '2026-04-08 02:28:24.062 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (25, '学术标准 (Academic Standard)', 'Academic', 'traditional', '
        .resume { font-family: "Times New Roman", Times, serif; color: #000; line-height: 1.5; background: #fff; padding: 50px; }
        h1 { font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 5px; }
        h1 + p { text-align: center; font-size: 1rem; margin-bottom: 30px; }
        h2 { font-size: 1.1rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 25px; margin-bottom: 15px; padding-bottom: 2px; }
        h3 { font-size: 1.05rem; font-weight: bold; margin-top: 15px; display: flex; justify-content: space-between; }
        h3 + p { font-style: italic; font-size: 1rem; margin-bottom: 8px; }
        ul { padding-left: 25px; list-style-type: disc; }
        li { margin-bottom: 5px; text-align: justify; }
        a { color: #000; text-decoration: underline; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","education","experience","skills"]}', 0, 0, '2026-04-08 02:28:24.153 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (26, '复古报纸 (Retro News)', 'Academic', 'traditional', '
        .resume { font-family: "Georgia", serif; color: #1a1a1a; line-height: 1.4; background: #f4f1ea; padding: 50px; border: 1px solid #d3d3d3; }
        h1 { font-size: 3.5rem; font-weight: 900; text-align: center; text-transform: uppercase; border-bottom: 4px double #000; padding-bottom: 10px; margin-bottom: 10px; }
        h1 + p { text-align: center; font-size: 1rem; font-style: italic; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 40px; }
        h2 { font-size: 1.4rem; font-weight: bold; text-transform: uppercase; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 5px 0; margin-top: 30px; margin-bottom: 20px; text-align: center; }
        h3 { font-size: 1.1rem; font-weight: bold; margin-top: 20px; }
        h3 + p { font-size: 0.95rem; color: #333; margin-bottom: 10px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; text-align: justify; }
        a { color: #000; text-decoration: underline; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","experience","education"]}', 1, 0, '2026-04-08 02:28:24.231 +00:00');
INSERT INTO templates (id, name, category, style, css_styles, structure_json, is_premium, usage_count, created_at) VALUES (27, '书香门第 (Literary)', 'Academic', 'traditional', '
        .resume { font-family: "Noto Serif SC", serif; color: #2c2c2c; line-height: 1.8; background: #fff; padding: 50px; }
        h1 { font-size: 2.4rem; font-weight: 700; color: #111; margin-bottom: 10px; border-left: 8px solid #111; padding-left: 20px; }
        h1 + p { color: #666; font-size: 0.95rem; margin-bottom: 40px; }
        h2 { font-size: 1.2rem; font-weight: 700; color: #111; margin-top: 40px; margin-bottom: 20px; background: #f5f5f5; padding: 5px 15px; }
        h3 { font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 25px; }
        h3 + p { color: #666; font-size: 0.9rem; font-style: italic; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        li::marker { content: "◈ "; color: #111; }
        a { color: #111; text-decoration: none; border-bottom: 1px solid #999; }
        
  a[href^="mailto:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z''%3E%3C/path%3E%3Cpolyline points=''22,6 12,13 2,6''%3E%3C/polyline%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="tel:"]::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }
  a[href^="http"]:not([href*="linkedin"]):not([href*="github"])::before { content: ""; display: inline-block; width: 1em; height: 1em; background: url("data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none'' stroke=''%23666'' stroke-width=''2'' stroke-linecap=''round'' stroke-linejoin=''round''%3E%3Cpath d=''M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71''%3E%3C/path%3E%3Cpath d=''M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71''%3E%3C/path%3E%3C/svg%3E") no-repeat center; margin-right: 0.4em; vertical-align: text-bottom; }

      ', '{"sections":["header","education","experience"]}', 0, 0, '2026-04-08 02:28:24.293 +00:00');

-- resumes: 1 rows
INSERT INTO resumes (id, user_id, template_id, title, content_json, content_markdown, is_public, created_at, updated_at) VALUES (1, 2, 6, '未命名简历', '{}', '# 您的姓名

[your.email@example.com](mailto:your.email@example.com) | [123-456-7890](tel:1234567890) | [个人网站](https://example.com)

## 个人总结

富有激情和创造力的专业人士，拥有5年以上的行业经验。擅长团队协作、项目管理和创新解决方案的设计与实施。致力于通过技术和设计提升用户体验，并在快节奏的环境中保持高效产出。

## 工作经历

### 高级项目经理 | 某知名科技公司
*2020年1月 - 至今*

- 领导跨职能团队完成核心产品的迭代开发，提升用户活跃度30%。
- 优化敏捷开发流程，缩短产品上市周期20%。
- 负责与关键客户沟通需求，确保项目交付符合预期标准。

### 软件工程师 | 某初创企业
*2017年6月 - 2019年12月

- 参与核心业务系统的架构设计与编码实现。
- 解决高并发场景下的性能瓶颈，系统吞吐量提升50%。
- 编写高质量的技术文档，协助新成员快速上手。

## 教育背景

### 计算机科学与技术 | 某重点大学
*本科 | 2013年9月 - 2017年6月*

## 技能特长

- **编程语言**: JavaScript, Python, Java
- **框架/工具**: React, Node.js, Docker
- **语言能力**: 英语 (流利), 中文 (母语)
', 0, '2026-03-04 04:06:57.454 +00:00', '2026-04-08 02:52:11.025 +00:00');

-- resume_versions: 2 rows
INSERT INTO resume_versions (id, resume_id, title, content_markdown, content_json, template_id, version_number, created_at) VALUES (2, 1, '未命名简历', '# 您的姓名

[your.email@example.com](mailto:your.email@example.com) | [123-456-7890](tel:1234567890) | [个人网站](https://example.com)

## 个人总结

富有激情和创造力的专业人士，拥有5年以上的行业经验。擅长团队协作、项目管理和创新解决方案的设计与实施。致力于通过技术和设计提升用户体验，并在快节奏的环境中保持高效产出。

## 工作经历

### 高级项目经理 | 某知名科技公司
*2020年1月 - 至今*

- 领导跨职能团队完成核心产品的迭代开发，提升用户活跃度30%。
- 优化敏捷开发流程，缩短产品上市周期20%。
- 负责与关键客户沟通需求，确保项目交付符合预期标准。

### 软件工程师 | 某初创企业
*2017年6月 - 2019年12月

- 参与核心业务系统的架构设计与编码实现。
- 解决高并发场景下的性能瓶颈，系统吞吐量提升50%。
- 编写高质量的技术文档，协助新成员快速上手。

## 教育背景

### 计算机科学与技术 | 某重点大学
*本科 | 2013年9月 - 2017年6月*

## 技能特长

- **编程语言**: JavaScript, Python, Java
- **框架/工具**: React, Node.js, Docker
- **语言能力**: 英语 (流利), 中文 (母语)
', '{}', 6, 2, '2026-04-08 02:52:11.159 +00:00');
INSERT INTO resume_versions (id, resume_id, title, content_markdown, content_json, template_id, version_number, created_at) VALUES (3, 1, '未命名简历', '# 您的姓名

[your.email@example.com](mailto:your.email@example.com) | [123-456-7890](tel:1234567890) | [个人网站](https://example.com)

## 个人总结

富有激情和创造力的专业人士，拥有5年以上的行业经验。擅长团队协作、项目管理和创新解决方案的设计与实施。致力于通过技术和设计提升用户体验，并在快节奏的环境中保持高效产出。

## 工作经历

### 高级项目经理 | 某知名科技公司
*2020年1月 - 至今*

- 领导跨职能团队完成核心产品的迭代开发，提升用户活跃度30%。
- 优化敏捷开发流程，缩短产品上市周期20%。
- 负责与关键客户沟通需求，确保项目交付符合预期标准。

### 软件工程师 | 某初创企业
*2017年6月 - 2019年12月

- 参与核心业务系统的架构设计与编码实现。
- 解决高并发场景下的性能瓶颈，系统吞吐量提升50%。
- 编写高质量的技术文档，协助新成员快速上手。

## 教育背景

### 计算机科学与技术 | 某重点大学
*本科 | 2013年9月 - 2017年6月*

## 技能特长

- **编程语言**: JavaScript, Python, Java
- **框架/工具**: React, Node.js, Docker
- **语言能力**: 英语 (流利), 中文 (母语)
', '{}', 6, 3, '2026-04-08 02:52:13.491 +00:00');


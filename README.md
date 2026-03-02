
# Resume Generation Platform

一个现代化的 AI 驱动简历生成平台，支持 Markdown 编辑、实时预览、多模板切换和 AI 内容优化。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.1-06b6d4.svg)

## ✨ 功能特性

### 📝 核心功能
- **Markdown 编辑器** - 双栏实时预览，支持 GFM 语法
- **16+ 精美模板** - 涵盖商务、创意、科技、学术等多种风格
- **AI 智能优化** - 基于 GLM-4.7 的内容优化和建议生成
- **PDF 导出** - 一键导出高质量 PDF 简历
- **批量操作** - 支持批量删除简历
- **文件导入** - 直接导入 Markdown 文件

### 🎨 模板展示
| 模板名称 | 风格 | 类型 |
|---------|------|------|
| 极简商务 | Professional | 免费 |
| 摩登雅致 | Modern Elegance | 高级 |
| 科技极简 | Tech Minimal | 免费 |
| 瑞士国际 | Swiss Intl | 免费 |
| 常青藤 | Ivy League | 免费 |
| 柔和森系 | Soft Forest | 高级 |
| 活力橙光 | Vibrant Orange | 免费 |
| 深邃午夜 | Midnight Header | 高级 |
| 粉彩艺术 | Pastel Art | 高级 |
| 左侧强调 | Left Focus | 免费 |
| 商务蓝调 | Corporate Blue | 免费 |
| 极简居中 | Minimal Center | 免费 |
| 海洋蓝调 | Ocean Blue | 免费 |
| 樱花粉韵 | Cherry Blossom | 高级 |
| 深紫优雅 | Deep Purple | 高级 |
| 金秋收获 | Autumn Gold | 免费 |
| 经典黑白 | Classic B&amp;W | 免费 |

### ⌨️ 快捷键
- `Ctrl + S` - 保存简历
- `Ctrl + P` - 打印/导出 PDF
- `Ctrl + Shift + N` - 新建简历

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装与运行

```bash
# 克隆项目
git clone git@github.com:JeasonLoop/resume-generation.git
cd resume-generation

# 安装根目录依赖
npm install

# 安装后端依赖
cd api
npm install
cd ..

# 启动开发服务器（前后端同时启动）
npm run dev
```

### 单独运行

```bash
# 只启动前端 (Vite, 端口 5173)
npm run client

# 只启动后端 (Express, 端口 3001)
npm run server
```

### 环境变量配置

**前端** (`.env`):
```env
VITE_API_URL=http://localhost:3001/api
```

**后端** (`api/.env`):
```env
PORT=3001
JWT_SECRET=your_super_secret_jwt_key_change_in_production
SILICONFLOW_API_KEY=your_siliconflow_api_key
OPENAI_API_KEY=your_openai_api_key_here
```

## 🛠️ 技术栈

### 前端
- **React 19.2** - UI 框架
- **Vite 7.3** - 构建工具
- **React Router 7.13** - 路由管理
- **Zustand 5.0** - 状态管理
- **TailwindCSS 4.2** - CSS 框架
- **React Markdown 10.1** - Markdown 渲染
- **Lucide React** - 图标库

### 后端
- **Node.js** - 运行时
- **Express 4.18** - Web 框架
- **Sequelize 6.28** - ORM
- **SQLite3** - 数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **SiliconFlow API** - AI 服务

## 📁 项目结构

```
resume-generation/
├── api/                          # 后端 API
│   ├── config/                   # 数据库配置
│   ├── controllers/              # 控制器
│   ├── middleware/               # 中间件
│   ├── models/                   # 数据模型
│   ├── routes/                   # 路由定义
│   ├── index.js                  # 服务器入口
│   └── package.json
├── src/                          # 前端应用
│   ├── components/               # React 组件
│   │   ├── Editor/              # 编辑器组件
│   │   ├── dashboard/           # 仪表板组件
│   │   └── common/              # 通用组件
│   ├── pages/                   # 页面组件
│   ├── store/                   # Zustand 状态管理
│   ├── hooks/                   # 自定义 Hooks
│   ├── utils/                   # 工具函数
│   ├── App.jsx                  # 主应用组件
│   ├── main.jsx                 # React 入口
│   └── index.css                # 全局样式
├── public/                       # 静态资源
├── package.json                  # 根 package.json
├── vite.config.js               # Vite 配置
└── database.sqlite              # SQLite 数据库
```

## 🔑 测试账号

系统预置了测试账号：

- **邮箱**: `test@example.com`
- **密码**: `123456`
- **高级会员**: ✅ 是

## 🤖 AI 配置

项目使用 SiliconFlow API 提供 AI 功能：

1. 注册 [SiliconFlow](https://siliconflow.cn) 账号
2. 获取 API Key
3. 在 `api/.env` 中配置 `SILICONFLOW_API_KEY`

如果没有配置 API Key，系统会使用模拟响应。

## 🔒 安全特性

- JWT Token 认证 (24小时过期)
- bcryptjs 密码加密
- 受保护的 API 路由
- CORS 配置

## 📄 API 文档

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 简历管理
- `POST /api/resumes` - 创建简历
- `GET /api/resumes` - 获取简历列表
- `GET /api/resumes/:id` - 获取单个简历
- `PUT /api/resumes/:id` - 更新简历
- `DELETE /api/resumes/:id` - 删除简历
- `POST /api/resumes/batch-delete` - 批量删除

### AI 服务
- `POST /api/ai/optimize` - 优化内容
- `POST /api/ai/suggest` - 生成建议

### 模板
- `GET /api/templates` - 获取所有模板
- `GET /api/templates/:id` - 获取单个模板

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**享受制作专业简历的乐趣！** 🎉


# ==========================================
# 多阶段构建：前端构建 + 后端运行
# 适配2核2G轻量服务器
# ==========================================

# 阶段1: 构建前端
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# 复制前端依赖文件（不复制 package-lock.json，避免跨平台原生绑定问题）
COPY package.json ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY eslint.config.js ./

# 安装所有依赖（使用 npm install 确保原生依赖正确编译）
RUN npm install

# 复制前端源代码
COPY index.html ./
COPY public/ ./public/
COPY src/ ./src/

# 构建前端（增加Node内存限制）
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# 阶段2: 构建后端镜像
FROM node:20-alpine

# 安装轻量化系统依赖 + 编译工具（sqlite3 需要）
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash \
    python3 \
    py3-setuptools \
    make \
    g++ \
    sqlite

# 设置 Puppeteer 使用系统 Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# 复制后端依赖文件
COPY api/package.json ./api/

# 安装后端依赖
WORKDIR /app/api
RUN npm install --only=production

# 回到应用根目录
WORKDIR /app

# 复制后端代码
COPY api/ ./api/

# 从前端构建阶段复制构建产物
COPY --from=frontend-builder /app/dist ./dist

# 创建数据目录
RUN mkdir -p /var/www/resume-generation/data

# 设置环境变量（针对轻量服务器优化）
ENV NODE_ENV=production \
    PORT=3001 \
    DATA_PATH=/var/www/resume-generation/data \
    NODE_OPTIONS="--max-old-space-size=512"

# 暴露端口
EXPOSE 3001

# 健康检查（减少频率以节省资源）
HEALTHCHECK --interval=60s --timeout=15s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

# 启动应用（增加内存限制）
CMD ["node", "--max-old-space-size=512", "api/index.js"]

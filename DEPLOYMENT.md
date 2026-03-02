# 简历生成平台 - Docker 部署指南

本文档提供完整的 Docker 部署步骤，帮助你将简历生成平台部署到腾讯云服务器。

---

## 📋 部署前准备

### 1. 服务器要求

- **操作系统**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- **配置**: 2核4GB以上
- **存储**: 20GB以上可用空间
- **网络**: 开放 80 和 443 端口

### 2. 域名（可选）

如果有域名，建议配置：
- 已解析到服务器IP
- 用于配置HTTPS（推荐）

---

## 🚀 快速部署（推荐）

### 第一步：在本地准备部署文件

1. **修改环境变量**

   编辑 `.env.production` 文件，修改以下配置：
   
   ```bash
   # 修改为你的服务器IP或域名
   ALLOWED_ORIGINS=http://你的服务器IP:3001
   
   # 如果需要AI功能，填写API密钥
   SILICONFLOW_API_KEY=你的API密钥
   OPENAI_API_KEY=你的API密钥
   ```

2. **打包项目文件**
   
   将以下文件打包上传到服务器：
   ```
   resume-generation/
   ├── api/
   ├── src/
   ├── public/
   ├── index.html
   ├── package.json
   ├── package-lock.json
   ├── vite.config.js
   ├── postcss.config.js
   ├── eslint.config.js
   ├── .env.production
   ├── Dockerfile
   ├── docker-compose.yml
   ├── .dockerignore
   ├── deploy.sh
   └── nginx/
       └── nginx.conf
   ```

### 第二步：在服务器上安装Docker

1. **登录服务器**
   ```bash
   ssh root@你的服务器IP
   ```

2. **安装Docker**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com | bash
   
   # CentOS
   yum install -y docker
   ```

3. **安装Docker Compose**
   ```bash
   curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   ```

4. **启动Docker服务**
   ```bash
   systemctl start docker
   systemctl enable docker
   ```

5. **验证安装**
   ```bash
   docker --version
   docker-compose --version
   ```

### 第三步：上传项目文件

1. **创建项目目录**
   ```bash
   mkdir -p /var/www/resume-generation
   cd /var/www/resume-generation
   ```

2. **上传文件**
   
   在本地执行（使用scp或其他工具）：
   ```bash
   scp -r resume-generation/* root@你的服务器IP:/var/www/resume-generation/
   ```

### 第四步：执行部署

1. **进入项目目录**
   ```bash
   cd /var/www/resume-generation
   ```

2. **赋予部署脚本执行权限**
   ```bash
   chmod +x deploy.sh
   ```

3. **执行部署**
   ```bash
   ./deploy.sh
   ```

4. **等待部署完成**
   
   脚本会自动完成：
   - 检查环境
   - 构建Docker镜像
   - 启动容器
   - 健康检查

### 第五步：验证部署

1. **查看容器状态**
   ```bash
   docker-compose ps
   ```

2. **查看日志**
   ```bash
   docker-compose logs -f
   ```

3. **访问应用**
   
   打开浏览器访问：`http://你的服务器IP`

4. **测试登录**
   - 邮箱: `test@example.com`
   - 密码: `123456`

---

## 🔧 手动部署（可选）

如果自动脚本失败，可以手动执行：

### 1. 构建镜像
```bash
docker-compose build --no-cache
```

### 2. 启动服务
```bash
docker-compose up -d
```

### 3. 查看日志
```bash
docker-compose logs -f
```

### 4. 停止服务
```bash
docker-compose down
```

---

## 🔒 配置HTTPS（推荐）

### 方案一：使用Let's Encrypt免费证书

1. **安装Certbot**
   ```bash
   apt install certbot
   ```

2. **申请证书**
   ```bash
   certbot certonly --standalone -d your-domain.com
   ```

3. **复制证书到项目**
   ```bash
   cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/cert.pem
   cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/key.pem
   ```

4. **修改Nginx配置**
   
   编辑 `nginx/nginx.conf`，取消HTTPS部分的注释并修改域名。

5. **重启服务**
   ```bash
   docker-compose restart nginx
   ```

### 方案二：使用自定义证书

1. **准备证书文件**
   ```bash
   mkdir -p nginx/ssl
   # 将证书文件放到 nginx/ssl/ 目录
   # - cert.pem (证书文件)
   # - key.pem (私钥文件)
   ```

2. **修改Nginx配置**
   
   取消 `nginx/nginx.conf` 中HTTPS部分的注释。

---

## 🛠️ 常用命令

### 查看服务状态
```bash
docker-compose ps
```

### 查看实时日志
```bash
docker-compose logs -f
```

### 重启服务
```bash
docker-compose restart
```

### 停止服务
```bash
docker-compose down
```

### 进入容器
```bash
docker-compose exec app sh
```

### 更新部署
```bash
# 拉取最新代码后重新部署
./deploy.sh
```

### 清理资源
```bash
docker system prune -f
```

---

## 🔥 防火墙配置

### Ubuntu (UFW)
```bash
# 开放必要端口
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp

# 启用防火墙
ufw enable

# 查看状态
ufw status
```

### CentOS (Firewalld)
```bash
# 开放必要端口
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=22/tcp

# 重载防火墙
firewall-cmd --reload

# 查看状态
firewall-cmd --list-ports
```

### 腾讯云安全组

在腾讯云控制台配置安全组规则：
1. 登录腾讯云控制台
2. 进入云服务器实例详情
3. 点击"安全组"标签
4. 添加入站规则：
   - 协议: TCP
   - 端口: 80, 443, 22
   - 来源: 0.0.0.0/0

---

## 📊 性能优化

### 1. 调整Docker资源限制

编辑 `docker-compose.yml`，添加资源限制：
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### 2. 启用Nginx缓存

在 `nginx/nginx.conf` 中添加缓存配置：
```nginx
# 缓存路径
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

# 在location块中使用
location / {
    proxy_cache my_cache;
    proxy_cache_valid 200 60m;
    # ... 其他配置
}
```

### 3. 数据库优化

- 定期备份数据库文件
- 监控数据库大小
- 考虑迁移到MySQL/PostgreSQL（高并发场景）

---

## 🐛 故障排查

### 容器无法启动
```bash
# 查看详细错误日志
docker-compose logs app

# 检查容器状态
docker ps -a

# 检查镜像
docker images
```

### 无法访问应用
```bash
# 检查端口占用
netstat -tlnp | grep :80

# 检查防火墙
ufw status  # Ubuntu
firewall-cmd --list-ports  # CentOS

# 检查Nginx配置
docker-compose exec nginx nginx -t
```

### 数据库错误
```bash
# 检查数据卷
docker volume ls

# 进入容器检查数据库
docker-compose exec app sh
ls -la /var/www/resume-generation/data/
```

### 内存不足
```bash
# 查看内存使用
free -h

# 查看容器资源使用
docker stats

# 清理未使用的资源
docker system prune -a
```

---

## 📦 数据备份

### 备份数据卷
```bash
# 备份数据库
docker run --rm -v resume-generation_resume-data:/data -v $(pwd):/backup alpine tar czf /backup/data-backup-$(date +%Y%m%d).tar.gz /data

# 恢复数据
docker run --rm -v resume-generation_resume-data:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/data-backup-YYYYMMDD.tar.gz --strip-components 1"
```

### 定时备份（Cron）
```bash
# 编辑crontab
crontab -e

# 每天凌晨2点备份
0 2 * * * cd /var/www/resume-generation && docker run --rm -v resume-generation_resume-data:/data -v $(pwd):/backup alpine tar czf /backup/data-backup-$(date +\%Y\%m\%d).tar.gz /data
```

---

## 🔄 更新部署

### 更新代码
```bash
# 1. 停止服务
docker-compose down

# 2. 拉取最新代码
git pull

# 3. 重新构建并启动
docker-compose build --no-cache
docker-compose up -d

# 4. 查看日志
docker-compose logs -f
```

### 更新环境变量
```bash
# 1. 编辑.env.production
vim .env.production

# 2. 重启服务
docker-compose restart

# 3. 验证
docker-compose logs -f
```

---

## 🎯 下一步

- ✅ 配置域名解析
- ✅ 启用HTTPS
- ✅ 配置监控告警
- ✅ 设置定时备份
- ✅ 优化性能配置

---

## 📞 获取帮助

如遇问题，请检查：
1. Docker日志: `docker-compose logs -f`
2. 容器状态: `docker-compose ps`
3. 系统资源: `free -h`, `df -h`
4. 网络连接: `curl http://localhost:3001/api/health`

---

**祝你部署顺利！🎉**

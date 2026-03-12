# 轻量服务器优化指南（2核2G）

本文档针对轻量级服务器（2核2G）提供额外的优化建议和配置说明。

---

## 🔧 已优化的配置

### 1. Docker资源限制

**docker-compose.yml** 已配置资源限制：

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.5'      # 限制最多使用1.5核CPU
          memory: 1200M    # 限制最多使用1.2GB内存
        reservations:
          cpus: '0.5'      # 保留0.5核CPU
          memory: 600M     # 保留600MB内存

  nginx:
    deploy:
      resources:
        limits:
          cpus: '0.5'      # Nginx占用较少
          memory: 256M
        reservations:
          cpus: '0.1'
          memory: 64M
```

### 2. Node.js内存优化

**Dockerfile** 已添加内存限制：

```dockerfile
# 设置Node.js内存限制为512MB
ENV NODE_OPTIONS="--max-old-space-size=512"

# 启动命令增加内存限制
CMD ["node", "--max-old-space-size=512", "api/index.js"]
```

### 3. 健康检查优化

减少健康检查频率以节省资源：

```yaml
healthcheck:
  interval: 60s    # 从30秒增加到60秒
  timeout: 15s
  start_period: 60s
```

---

## 💾 Swap配置（推荐）

如果遇到内存不足问题，建议配置Swap：

### 检查当前Swap
```bash
free -h
```

### 创建Swap文件
```bash
# 创建2GB的swap文件
sudo fallocate -l 2G /swapfile

# 设置权限
sudo chmod 600 /swapfile

# 创建swap空间
sudo mkswap /swapfile

# 启用swap
sudo swapon /swapfile

# 永久生效
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 优化Swap使用
```bash
# 查看当前swappiness值（默认60）
cat /proc/sys/vm/swappiness

# 降低swappiness值（建议10-20）
sudo sysctl vm.swappiness=10

# 永久生效
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

---

## 🎯 性能监控

### 实时监控资源使用

```bash
# 查看容器资源使用
docker stats

# 查看系统内存
free -h

# 查看磁盘使用
df -h

# 查看CPU负载
top
```

### 设置监控脚本

创建监控脚本 `/usr/local/bin/monitor.sh`：

```bash
#!/bin/bash
# 资源监控脚本

while true; do
    clear
    echo "=========================================="
    echo "系统资源监控 - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "=========================================="
    echo ""
    echo "内存使用："
    free -h
    echo ""
    echo "磁盘使用："
    df -h | grep -E '(Filesystem|/dev/)'
    echo ""
    echo "容器状态："
    docker ps --format "table {{.Names}}\t{{.Status}}"
    echo ""
    echo "容器资源使用："
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    echo ""
    echo "按Ctrl+C退出"
    sleep 5
done
```

赋予执行权限：
```bash
chmod +x /usr/local/bin/monitor.sh
```

---

## 🚨 常见问题处理

### 1. 容器频繁重启

**原因**：内存不足导致OOM（Out of Memory）

**解决方案**：
```bash
# 检查是否OOM
dmesg | grep -i 'out of memory'

# 查看容器日志
docker-compose logs --tail=100

# 降低内存限制或增加Swap
```

### 2. 服务响应慢

**原因**：CPU或内存资源紧张

**解决方案**：
```bash
# 检查资源使用
docker stats

# 如果内存不足，考虑：
# 1. 增加Swap空间
# 2. 减少并发连接数
# 3. 优化数据库查询
```

### 3. Puppeteer占用过多资源

**原因**：Chromium进程占用大量内存

**解决方案**：

如果你的应用不需要Puppeteer功能，可以创建轻量版Dockerfile：

```dockerfile
# Dockerfile.lightweight - 无Puppeteer版本
FROM node:18-alpine AS frontend-builder
# ... 前端构建部分相同 ...

FROM node:18-alpine
# 不安装Chromium，节省约300MB内存

WORKDIR /app
COPY api/package*.json ./api/

WORKDIR /app/api
RUN npm ci --only=production

WORKDIR /app
COPY api/ ./api/
COPY --from=frontend-builder /app/dist ./dist

RUN mkdir -p /var/www/resume-generation/data

ENV NODE_ENV=production \
    PORT=3001 \
    DATA_PATH=/var/www/resume-generation/data \
    NODE_OPTIONS="--max-old-space-size=512"

EXPOSE 3001

HEALTHCHECK --interval=60s --timeout=15s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

CMD ["node", "--max-old-space-size=512", "api/index.js"]
```

使用轻量版：
```bash
docker build -f Dockerfile.lightweight -t resume-generation:lightweight .
```

---

## 📊 性能优化建议

### 1. 数据库优化

```bash
# 定期清理数据库
sqlite3 /var/www/resume-generation/data/database.sqlite "VACUUM;"

# 查看数据库大小
ls -lh /var/www/resume-generation/data/database.sqlite
```

### 2. 日志管理

限制日志大小，编辑 `docker-compose.yml`：

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  nginx:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 3. Nginx优化

编辑 `nginx/nginx.conf`，添加缓存和连接优化：

```nginx
# 在http块中添加
client_body_buffer_size 128k;
client_max_body_size 50m;

# 工作进程数（2核服务器）
worker_processes 2;

# 连接优化
keepalive_timeout 30;
keepalive_requests 1000;
```

---

## 🔄 自动化运维

### 设置定时重启（可选）

避免长期运行导致的内存泄漏：

```bash
# 编辑crontab
crontab -e

# 每天凌晨4点重启服务
0 4 * * * cd /var/www/resume-generation && docker-compose restart
```

### 自动清理Docker资源

```bash
# 编辑crontab
crontab -e

# 每周日凌晨3点清理
0 3 * * 0 docker system prune -f
```

---

## 📈 扩容建议

如果以下情况，建议升级服务器配置：

1. **CPU持续超过80%**
   ```bash
   # 查看CPU使用
   top
   ```

2. **内存使用超过90%**
   ```bash
   # 查看内存使用
   free -h
   ```

3. **Swap使用超过50%**
   ```bash
   # 查看Swap使用
   swapon -s
   ```

4. **并发用户超过50人**

**建议配置**：
- 基础版：2核4G（支持50-100并发）
- 标准版：4核8G（支持200-500并发）
- 高级版：8核16G（支持1000+并发）

---

## 💡 其他优化技巧

### 1. 使用CDN

将静态资源（图片、CSS、JS）放到CDN，减轻服务器压力。

### 2. 启用Gzip压缩

已在Nginx配置中启用，确保生效：
```bash
# 测试Gzip是否生效
curl -H "Accept-Encoding: gzip" -I http://你的服务器IP
```

### 3. 浏览器缓存

Nginx配置中已添加缓存头，检查是否生效：
```bash
curl -I http://你的服务器IP
```

---

## 🆘 紧急情况处理

### 服务完全无响应

```bash
# 1. 检查容器状态
docker-compose ps

# 2. 查看日志
docker-compose logs --tail=100

# 3. 重启服务
docker-compose restart

# 4. 如果重启失败，重建容器
docker-compose down
docker-compose up -d

# 5. 最后手段：重启服务器
reboot
```

### 磁盘空间不足

```bash
# 1. 查看磁盘使用
df -h

# 2. 清理Docker资源
docker system prune -a

# 3. 清理日志
truncate -s 0 /var/log/nginx/*.log

# 4. 清理旧备份
find /var/www/resume-generation -name "*.tar.gz" -mtime +7 -delete
```

---

**记住：2核2G的服务器可以稳定运行此应用，但需要合理配置和定期维护！**

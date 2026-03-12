# SSL 证书目录

Nginx 当前使用的证书文件（与 `nginx.conf` 中 443 配置一致）：

- **cert_bundle.crt** — 证书链（腾讯云 Nginx 格式的「证书」文件）
- **cert.key** — 私钥（腾讯云 Nginx 格式的「私钥」文件）

---

## 腾讯云证书部署步骤

### 1. 下载证书（Nginx 格式）

1. 登录 [腾讯云 SSL 证书控制台](https://console.cloud.tencent.com/ssl)
2. 找到已签发的证书，点击 **下载**
3. 选择 **Nginx** 格式，下载得到 `域名_nginx.zip`（例如 `resumegen.jeasonloop.online_nginx.zip`）

### 2. 解压并确认文件

解压后通常包含：

- `域名_bundle.crt` — 证书（含链）
- `域名.key` — 私钥
  （可能还有 `域名_bundle.pem`、`域名.csr` 等，Nginx 只需上面两个）

### 3. 放到服务器并改名

在**服务器**上进入项目目录，把证书放到 `nginx/ssl/` 并改成 Nginx 期望的文件名：

```bash
# 进入项目目录（按你实际路径改）
cd /path/to/resume-generation

# 若 nginx/ssl 不存在则创建
mkdir -p nginx/ssl

# 把解压出的「证书」改名为 cert_bundle.crt（域名替换成你的实际文件名）
cp 解压路径/resumegen.jeasonloop.online_bundle.crt nginx/ssl/cert_bundle.crt

# 把解压出的「私钥」改名为 cert.key
cp 解压路径/resumegen.jeasonloop.online.key nginx/ssl/cert.key

# 建议设置私钥仅 root 可读（可选）
chmod 600 nginx/ssl/cert.key
```

若你在本机 Windows 下载的 zip，可以：

- 用 SFTP/SCP 把 `域名_bundle.crt`、`域名.key` 传到服务器后，再在服务器上执行上述 `cp` 和 `chmod`；或
- 在本地把这两个文件重命名为 `cert_bundle.crt`、`cert.key`，再上传到服务器的 `nginx/ssl/` 目录。

### 4. 重启 Nginx 使证书生效

```bash
# Docker 部署
docker compose restart nginx

# 或先校验配置再重启
docker compose exec nginx nginx -t && docker compose restart nginx
```

### 5. 验证 HTTPS

浏览器访问：**https://resumegen.jeasonloop.online**，确认地址栏为锁状且无证书错误。

---

## 其他证书来源

- **Let's Encrypt**：若使用 certbot，一般为 `fullchain.pem` + `privkey.pem`。可将二者复制到此目录后，在 `nginx.conf` 的 443 server 中把 `ssl_certificate` 改为 `/etc/nginx/ssl/fullchain.pem`，`ssl_certificate_key` 改为 `/etc/nginx/ssl/privkey.pem`。

## 未配置证书时

若尚未配置证书，请暂时注释掉 `nginx.conf` 中整个 **HTTPS 的 server { ... }** 块，否则 nginx 会因找不到证书文件而无法启动。

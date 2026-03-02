#!/bin/bash

# ==========================================
# 简历生成平台 - 自动部署脚本
# ==========================================

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Docker是否安装
check_docker() {
    log_info "检查Docker安装..."
    if ! command -v docker &> /dev/null; then
        log_error "Docker未安装，请先安装Docker"
        exit 1
    fi
    
    # 检查Docker Compose（支持插件版和独立版）
    COMPOSE_CMD=""
    if docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
        log_info "检测到Docker Compose插件版"
    elif command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
        log_info "检测到Docker Compose独立版"
    else
        log_error "Docker Compose未安装"
        log_info "请安装Docker Compose："
        log_info "  插件版：Docker 20.10+ 自动包含"
        log_info "  独立版：pip install docker-compose"
        exit 1
    fi
    
    # 导出COMPOSE_CMD供其他函数使用
    export COMPOSE_CMD
    log_success "Docker环境检查通过"
}

# 检查环境变量文件
check_env_file() {
    log_info "检查环境变量文件..."
    
    if [ ! -f ".env.production" ]; then
        log_error ".env.production 文件不存在"
        exit 1
    fi
    
    # 检查必要的环境变量
    if grep -q "change_in_production" .env.production; then
        log_warning "检测到JWT_SECRET仍为默认值，正在生成随机密钥..."
        
        # 生成32位随机密钥（只包含字母数字，避免sed定界符冲突）
        RANDOM_SECRET=$(openssl rand -hex 16)
        
        # 替换JWT_SECRET（使用#作为定界符）
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s#JWT_SECRET=.*#JWT_SECRET=${RANDOM_SECRET}#" .env.production
        else
            # Linux
            sed -i "s#JWT_SECRET=.*#JWT_SECRET=${RANDOM_SECRET}#" .env.production
        fi
        
        log_success "已自动生成JWT_SECRET: ${RANDOM_SECRET}"
    fi
    
    log_success "环境变量检查通过"
}

# 构建Docker镜像
# 参数: $1 = --no-cache 表示不使用缓存
build_image() {
    local build_args=""
    
    # 检查是否传入 --no-cache 参数
    if [ "$1" = "--no-cache" ]; then
        log_info "构建Docker镜像（不使用缓存）..."
        build_args="--no-cache"
    else
        log_info "构建Docker镜像（使用缓存）..."
    fi
    
    $COMPOSE_CMD build $build_args
    
    log_success "Docker镜像构建完成"
}

# 停止旧容器
stop_old_containers() {
    log_info "停止旧容器..."
    
    $COMPOSE_CMD down
    
    log_success "旧容器已停止"
}

# 启动新容器
start_containers() {
    log_info "启动新容器..."
    
    $COMPOSE_CMD up -d
    
    log_success "容器启动成功"
}

# 等待服务启动
wait_for_service() {
    log_info "等待服务启动..."
    
    local max_retries=60  # 增加重试次数（轻量服务器启动较慢）
    local retry=0
    local check_url="http://localhost:8080/api/health"  # 通过 Nginx 端口检查
    
    while [ $retry -lt $max_retries ]; do
        # 方式1: 通过 Nginx 端口检查
        if curl -f "$check_url" > /dev/null 2>&1; then
            log_success "服务健康检查通过"
            return 0
        fi
        
        # 方式2: 检查容器内部健康状态
        if docker inspect --format='{{.State.Health.Status}}' resume-generation-app 2>/dev/null | grep -q "healthy"; then
            log_success "容器健康检查通过"
            return 0
        fi
        
        retry=$((retry + 1))
        echo -n "."
        sleep 3
    done
    
    echo ""
    log_error "服务启动超时"
    log_warning "请检查容器日志: $COMPOSE_CMD logs app"
    return 1
}

# 查看容器状态
show_status() {
    log_info "容器状态:"
    $COMPOSE_CMD ps
    
    echo ""
    log_info "容器日志（最近20行）:"
    $COMPOSE_CMD logs --tail=20
}

# 清理旧镜像
cleanup() {
    log_info "清理未使用的Docker资源..."
    
    docker system prune -f
    
    log_success "清理完成"
}

# 显示访问信息
show_access_info() {
    echo ""
    echo "=========================================="
    log_success "部署完成！"
    echo "=========================================="
    echo ""
    echo "访问地址:"
    echo "  - 应用地址: http://你的服务器IP"
    echo "  - API地址: http://你的服务器IP/api"
    echo "  - 健康检查: http://你的服务器IP/api/health"
    echo ""
    echo "测试账号:"
    echo "  - 邮箱: test@example.com"
    echo "  - 密码: 123456"
    echo ""
    echo "常用命令:"
    echo "  - 查看日志: $COMPOSE_CMD logs -f"
    echo "  - 查看状态: $COMPOSE_CMD ps"
    echo "  - 停止服务: $COMPOSE_CMD down"
    echo "  - 重启服务: $COMPOSE_CMD restart"
    echo ""
}

# 显示帮助信息
show_help() {
    echo "用法: ./deploy.sh [选项]"
    echo ""
    echo "选项:"
    echo "  --no-cache    构建时不使用Docker缓存（完整重建）"
    echo "  --help, -h    显示此帮助信息"
    echo ""
    echo "默认使用Docker缓存加速构建。"
}

# 主部署流程
main() {
    local build_cache=""
    
    # 解析命令行参数
    case "$1" in
        --no-cache)
            build_cache="--no-cache"
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        "")
            # 无参数，使用缓存
            ;;
        *)
            log_error "未知参数: $1"
            show_help
            exit 1
            ;;
    esac
    
    echo "=========================================="
    echo "   简历生成平台 - 自动部署脚本"
    echo "=========================================="
    echo ""
    
    # 1. 检查环境
    check_docker
    
    # 2. 检查环境变量
    check_env_file
    
    # 3. 停止旧容器
    stop_old_containers
    
    # 4. 构建镜像
    build_image "$build_cache"
    
    # 5. 启动容器
    start_containers
    
    # 6. 等待服务启动
    wait_for_service
    
    # 7. 显示状态
    show_status
    
    # 8. 清理
    cleanup
    
    # 9. 显示访问信息
    show_access_info
}

# 运行主流程
main "$@"

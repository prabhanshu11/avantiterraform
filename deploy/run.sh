#!/bin/bash

# Deploy script for avantiterraform.com
# Run this on the VPS after pushing changes
# Usage: ./deploy/run.sh

set -e  # Exit on error

echo "🚀 Starting Avanti Terraform deployment..."

# Navigate to project directory
cd /var/www/avantiterraform

# Pull latest changes from GitHub (force reset to handle SSL config changes)
echo "📥 Pulling latest changes from GitHub..."
git fetch origin master
git reset --hard origin/master

# ==========================================
# V0 - STATIC WEBSITE (root)
# ==========================================
echo "📄 V0 static site is served directly by nginx from this directory"

# ==========================================
# V1 - NEXT.JS WEBSITE (preview)
# ==========================================
echo "🐳 Building v1 Next.js Docker image..."
cd v1

# Install dependencies and build
echo "📦 Installing dependencies..."
npm ci --production=false

echo "🔨 Building Next.js app..."
npm run build

echo "🐳 Building Docker image..."
docker build -t avantiterraform-v1 .

echo "🛑 Stopping existing v1 container..."
docker stop avantiterraform-v1 || true
docker rm avantiterraform-v1 || true

echo "▶️  Running v1 container..."
docker run -d \
  --name avantiterraform-v1 \
  --restart always \
  -p 3001:3000 \
  avantiterraform-v1

cd ..

# ==========================================
# API - CONTACT FORM BACKEND
# ==========================================
echo "🐳 Building API Docker image..."
cd api

docker build -t avantiterraform-api .

echo "🛑 Stopping existing API container..."
docker stop avantiterraform-api || true
docker rm avantiterraform-api || true

echo "▶️  Running API container..."
docker run -d \
  --name avantiterraform-api \
  --restart always \
  -p 8001:8001 \
  -v /var/www/avantiterraform/data:/var/www/avantiterraform/data \
  --env-file /var/www/avantiterraform/.env \
  avantiterraform-api

cd ..

# ==========================================
# NGINX CONFIG UPDATE
# ==========================================
echo "🔧 Updating nginx configuration..."
NGINX_CONF="/etc/nginx/sites-available/avantiterraform.conf"
REPO_NGINX_CONF="deploy/nginx/avantiterraform.conf"

# Always backup existing config with timestamp
sudo cp "$NGINX_CONF" "${NGINX_CONF}.bak.$(date +%Y%m%d_%H%M%S)" 2>/dev/null || true

# Copy new config
echo "📝 Installing new nginx config..."
sudo cp "$REPO_NGINX_CONF" "$NGINX_CONF"
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/avantiterraform.conf 2>/dev/null || true

# Test and reload nginx
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Nginx config updated and reloaded"
else
    echo "❌ Nginx config test failed!"
    exit 1
fi

# ==========================================
# SSL CONFIGURATION
# ==========================================
# Always reinstall SSL config after copying nginx config, since the repo
# version is HTTP-only and certbot needs to add the SSL directives
if [ ! -f /etc/letsencrypt/live/avantiterraform.com/fullchain.pem ]; then
    echo "🔒 Obtaining new SSL certificate..."
    sudo certbot --nginx -d avantiterraform.com -d www.avantiterraform.com \
        --non-interactive --agree-tos --email bharat@avantiterraform.com --redirect || true
else
    echo "🔒 Reinstalling SSL configuration to nginx..."
    sudo certbot --nginx -d avantiterraform.com -d www.avantiterraform.com \
        --reinstall --redirect --non-interactive || true
fi

# ==========================================
# HEALTH CHECKS
# ==========================================
echo "🔍 Waiting for services to start..."
sleep 5

echo "🔍 Testing v0 static site..."
if curl -f http://localhost:80/ > /dev/null 2>&1; then
    echo "✅ V0 static site is healthy!"
else
    echo "⚠️  V0 static site check failed (may need nginx)"
fi

echo "🔍 Testing v1 Next.js..."
if curl -f http://localhost:3001/new > /dev/null 2>&1; then
    echo "✅ V1 Next.js is healthy!"
else
    echo "⚠️  V1 Next.js not responding"
    docker logs avantiterraform-v1 2>/dev/null | tail -20 || true
fi

echo "🔍 Testing API..."
if curl -f http://localhost:8001/health > /dev/null 2>&1; then
    echo "✅ API is healthy!"
else
    echo "⚠️  API not responding"
    docker logs avantiterraform-api 2>/dev/null | tail -20 || true
fi

echo "🎉 Deployment completed!"
echo "================================================"
echo "V0 (current): https://avantiterraform.com/"
echo "V1 (new):     https://avantiterraform.com/new"
echo "================================================"

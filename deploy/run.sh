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
# SSL CERTIFICATE (must exist before the nginx config is installed)
# ==========================================
# The repo nginx config contains the SSL directives itself, so the certificate
# has to be on disk before `nginx -t` runs. Certbot never edits our config.
if [ ! -f /etc/letsencrypt/live/avantiterraform.com/fullchain.pem ]; then
    echo "🔒 Obtaining SSL certificate (webroot)..."
    sudo certbot certonly --webroot -w /var/www/avantiterraform \
        -d avantiterraform.com -d www.avantiterraform.com \
        --non-interactive --agree-tos --email bharat@avantiterraform.com
else
    echo "🔒 SSL certificate present: $(sudo openssl x509 -in /etc/letsencrypt/live/avantiterraform.com/fullchain.pem -noout -enddate)"
fi

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

# Guard: the installed config MUST have an SSL server block. Without one, nginx
# falls through to prabhanshu.space for https://avantiterraform.com.
if ! grep -q "listen 443 ssl" "$NGINX_CONF"; then
    echo "❌ Installed nginx config has no 'listen 443 ssl' block — refusing to reload!"
    exit 1
fi

# Test and reload nginx
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Nginx config updated and reloaded"
else
    echo "❌ Nginx config test failed!"
    exit 1
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

echo "🔍 Testing HTTPS is served by OUR server block..."
SERVED_CN=$(echo | openssl s_client -connect 127.0.0.1:443 -servername avantiterraform.com 2>/dev/null \
    | openssl x509 -noout -subject 2>/dev/null)
if echo "$SERVED_CN" | grep -q "avantiterraform.com"; then
    echo "✅ HTTPS serving correct certificate ($SERVED_CN)"
else
    echo "❌ HTTPS is serving the WRONG certificate: ${SERVED_CN:-<none>}"
    echo "   avantiterraform.com is falling through to another site's 443 block."
    exit 1
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

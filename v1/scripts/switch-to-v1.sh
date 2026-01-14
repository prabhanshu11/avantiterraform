#!/bin/bash
# Switch from static HTML site to Next.js v1
# Run this on VPS as deploy user (or with sudo)

set -e

echo "=== Switching Avanti Terraform to v1 ==="

# Check if running as appropriate user
if [ "$EUID" -ne 0 ] && [ "$USER" != "deploy" ]; then
    echo "Please run as root or deploy user"
    exit 1
fi

# Paths
V1_DIR="/var/www/avantiterraform/v1"
NGINX_CONF="/etc/nginx/sites-available/avantiterraform.conf"
V1_NGINX_CONF="$V1_DIR/nginx/avantiterraform-v1.conf"

# 1. Build and start the v1 Docker container
echo "Building and starting v1 container..."
cd "$V1_DIR"
docker compose down 2>/dev/null || true
docker compose build
docker compose up -d

# 2. Wait for container to be healthy
echo "Waiting for container to start..."
sleep 5

# 3. Test the container is responding
if curl -sf http://localhost:3001 > /dev/null; then
    echo "✓ v1 container is responding"
else
    echo "✗ v1 container not responding, aborting"
    exit 1
fi

# 4. Switch nginx configuration
echo "Switching nginx configuration..."
sudo cp "$V1_NGINX_CONF" "$NGINX_CONF"

# 5. Test nginx config
if sudo nginx -t; then
    echo "✓ nginx config valid"
else
    echo "✗ nginx config invalid, reverting..."
    exit 1
fi

# 6. Reload nginx
sudo systemctl reload nginx

# 7. Stop old API container (if running)
echo "Stopping old API container..."
docker stop avantiterraform-api 2>/dev/null || true
docker rm avantiterraform-api 2>/dev/null || true

echo ""
echo "=== Switch complete! ==="
echo "v1 is now live at https://avantiterraform.com"
echo ""
echo "To rollback, run: ./scripts/rollback-to-v0.sh"

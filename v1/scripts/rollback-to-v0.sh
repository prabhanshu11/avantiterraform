#!/bin/bash
# Rollback from v1 to static HTML site
# Run this on VPS as deploy user (or with sudo)

set -e

echo "=== Rolling back to v0 (static HTML) ==="

# Paths
NGINX_CONF="/etc/nginx/sites-available/avantiterraform.conf"
V0_NGINX_CONF="/var/www/avantiterraform/nginx/avantiterraform.conf"

# 1. Restore original nginx config
echo "Restoring original nginx configuration..."
sudo cp "$V0_NGINX_CONF" "$NGINX_CONF"

# 2. Test nginx config
if sudo nginx -t; then
    echo "✓ nginx config valid"
else
    echo "✗ nginx config invalid"
    exit 1
fi

# 3. Reload nginx
sudo systemctl reload nginx

# 4. Stop v1 container
echo "Stopping v1 container..."
cd /var/www/avantiterraform/v1
docker compose down 2>/dev/null || true

# 5. Restart old API container
echo "Restarting old API container..."
cd /var/www/avantiterraform/api
docker build -t avantiterraform-api .
docker run -d \
    --name avantiterraform-api \
    --restart always \
    -p 8001:8001 \
    -v /var/www/avantiterraform/data:/var/www/avantiterraform/data \
    --env-file /var/www/avantiterraform/.env \
    avantiterraform-api

echo ""
echo "=== Rollback complete! ==="
echo "v0 (static HTML) is now live at https://avantiterraform.com"

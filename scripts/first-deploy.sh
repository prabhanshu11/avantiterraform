#!/bin/bash
# First-time VPS setup for avantiterraform.com
# Run this ONCE on the VPS as root BEFORE the first GitHub Actions deploy
#
# Usage: ssh root@72.60.218.33
#        curl -fsSL https://raw.githubusercontent.com/prabhanshu11/avantiterraform/master/scripts/first-deploy.sh | bash

set -e

DOMAIN="avantiterraform.com"
WEBROOT="/var/www/avantiterraform"
DEPLOY_USER="deploy"

echo "Setting up $DOMAIN on VPS..."

# 1. Create web directory with deploy user ownership
echo "Creating web directory..."
mkdir -p "$WEBROOT"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$WEBROOT"
chmod 755 "$WEBROOT"

# 2. Create nginx config (HTTP only - SSL added by certbot)
echo "Creating nginx config..."
cat > /etc/nginx/sites-available/avantiterraform << 'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name avantiterraform.com www.avantiterraform.com;

    root /var/www/avantiterraform;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # For Let's Encrypt SSL certificate verification
    location /.well-known/acme-challenge/ {
        root /var/www/avantiterraform;
    }
}
NGINX_CONFIG

# 3. Enable site
ln -sf /etc/nginx/sites-available/avantiterraform /etc/nginx/sites-enabled/

# 4. Test and reload nginx
nginx -t && systemctl reload nginx
echo "Nginx configured for HTTP"

# 5. Create placeholder index.html
cat > "$WEBROOT/index.html" << 'HTML'
<!DOCTYPE html>
<html>
<head><title>Avanti Terraform</title></head>
<body>
<h1>Avanti Terraform</h1>
<p>Site deploying... Refresh in a moment.</p>
</body>
</html>
HTML
chown "$DEPLOY_USER:$DEPLOY_USER" "$WEBROOT/index.html"

echo ""
echo "=========================================="
echo "Setup complete! Next steps:"
echo ""
echo "1. Update DNS: Point avantiterraform.com to 72.60.218.33"
echo "   - A record: @ -> 72.60.218.33"
echo "   - CNAME: www -> avantiterraform.com (or A record)"
echo ""
echo "2. Wait for DNS propagation (5-30 min)"
echo ""
echo "3. Get SSL certificate:"
echo "   certbot --nginx -d avantiterraform.com -d www.avantiterraform.com"
echo ""
echo "4. Trigger GitHub Actions deploy or push to master"
echo "=========================================="

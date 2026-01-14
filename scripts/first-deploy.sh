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
mkdir -p "$WEBROOT/data"
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

    # API proxy to contact form backend
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
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

# 6. Create .env template for API (email notifications)
if [ ! -f "$WEBROOT/.env" ]; then
    cat > "$WEBROOT/.env" << 'ENVFILE'
# SMTP settings for contact form email notifications
# Using Zoho Mail SMTP
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_USER=bharat@avantiterraform.com
SMTP_PASS=your_zoho_app_password_here
NOTIFY_EMAIL=bharat@avantiterraform.com
ENVFILE
    chown "$DEPLOY_USER:$DEPLOY_USER" "$WEBROOT/.env"
    echo "Created .env template - UPDATE SMTP_PASS with Zoho app password!"
fi

echo ""
echo "=========================================="
echo "Setup complete! Next steps:"
echo ""
echo "1. Update DNS: Point avantiterraform.com to 72.60.218.33"
echo "   - A record: @ -> 72.60.218.33"
echo "   - CNAME: www -> avantiterraform.com"
echo ""
echo "2. Wait for DNS propagation (5-30 min)"
echo ""
echo "3. Get SSL certificate:"
echo "   certbot --nginx -d avantiterraform.com -d www.avantiterraform.com"
echo ""
echo "4. Update /var/www/avantiterraform/.env with Zoho app password"
echo "   (Generate app password at: https://accounts.zoho.in/)"
echo ""
echo "5. Trigger GitHub Actions deploy (push to master)"
echo "=========================================="

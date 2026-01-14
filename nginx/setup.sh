#!/bin/bash
# nginx setup script for avantiterraform.com
# This runs on each deploy - only creates config if not exists

set -e

DOMAIN="avantiterraform.com"
CONFIG_FILE="/etc/nginx/sites-available/avantiterraform"

# Check if nginx config already exists
if [ -f "$CONFIG_FILE" ]; then
    echo "nginx config already exists, skipping setup"
    exit 0
fi

echo "First deploy - setting up nginx for $DOMAIN..."

# Create HTTP-only config (for initial deploy and certbot SSL setup)
cat > "$CONFIG_FILE" << 'NGINX_CONFIG'
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

# Enable the site
ln -sf "$CONFIG_FILE" /etc/nginx/sites-enabled/avantiterraform

echo "HTTP nginx config created and enabled."
echo ""
echo "To enable HTTPS, run on VPS:"
echo "  certbot --nginx -d avantiterraform.com -d www.avantiterraform.com"

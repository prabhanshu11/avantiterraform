#!/bin/bash
# First-time VPS setup for avantiterraform.com
# Run this ONCE on the VPS to set up nginx and SSL

set -e

DOMAIN="avantiterraform.com"
WEBROOT="/var/www/avantiterraform"

echo "Setting up avantiterraform.com on VPS..."

# Create web directory
mkdir -p $WEBROOT

# Copy nginx config
cp /var/www/avantiterraform/nginx/avantiterraform.conf /etc/nginx/sites-available/avantiterraform

# Create temporary HTTP-only config for certbot
cat > /etc/nginx/sites-available/avantiterraform-temp << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name avantiterraform.com www.avantiterraform.com;

    root /var/www/avantiterraform;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/avantiterraform;
    }
}
EOF

# Enable temporary config
ln -sf /etc/nginx/sites-available/avantiterraform-temp /etc/nginx/sites-enabled/avantiterraform
nginx -t && systemctl reload nginx

echo "HTTP config active. Now run certbot:"
echo "  certbot --nginx -d avantiterraform.com -d www.avantiterraform.com"
echo ""
echo "After certbot succeeds:"
echo "  rm /etc/nginx/sites-available/avantiterraform-temp"
echo "  ln -sf /etc/nginx/sites-available/avantiterraform /etc/nginx/sites-enabled/avantiterraform"
echo "  nginx -t && systemctl reload nginx"

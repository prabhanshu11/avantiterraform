#!/bin/bash

# One-time VPS setup script for avantiterraform.com
# Run this script ONCE on the VPS to set up everything
# Prerequisites: SSH into VPS as root

set -e  # Exit on error

echo "🔧 Starting VPS setup for avantiterraform.com..."

# --- Configuration ---
APP_DIR="/var/www/avantiterraform"
DEPLOY_USER="deploy"
REPO_URL="https://github.com/prabhanshu11/avantiterraform.git"
DOMAIN="avantiterraform.com"

# --- 1. Check if deploy user exists ---
echo "👤 Checking deploy user..."
if id "$DEPLOY_USER" &>/dev/null; then
    echo "   ✅ User '$DEPLOY_USER' already exists."
else
    echo "   Creating user '$DEPLOY_USER'..."
    sudo useradd -m -s /bin/bash "$DEPLOY_USER"
fi

# --- 2. Install required packages ---
echo "📦 Installing required software..."
sudo apt update
sudo apt install -y \
    nginx certbot python3-certbot-nginx \
    curl git ca-certificates gnupg \
    nodejs npm

# --- 3. Docker Setup (if not installed) ---
echo "🐳 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "   Installing Docker..."
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

# Configure Docker permissions
echo "🐳 Configuring Docker permissions..."
sudo usermod -aG docker "$DEPLOY_USER"

# --- 4. Directory & Permissions ---
echo "📁 Configuring application directory..."
sudo mkdir -p "$APP_DIR"
sudo mkdir -p "$APP_DIR/data"
sudo chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

# --- 5. Clone Repository ---
echo "📥 Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
    echo "   Repo exists, pulling latest..."
    sudo -u "$DEPLOY_USER" git -C "$APP_DIR" pull origin master
else
    echo "   Cloning fresh..."
    # Backup .env if exists
    if [ -f "$APP_DIR/.env" ]; then
        sudo mv "$APP_DIR/.env" /tmp/avanti_env_backup
    fi

    sudo rm -rf "${APP_DIR:?}/"* "${APP_DIR:?}/".* 2>/dev/null || true
    sudo -u "$DEPLOY_USER" git clone "$REPO_URL" "$APP_DIR"

    # Restore .env
    if [ -f /tmp/avanti_env_backup ]; then
        sudo mv /tmp/avanti_env_backup "$APP_DIR/.env"
        sudo chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR/.env"
    fi
fi

# --- 6. Environment Variables ---
echo "🔐 Configuring environment variables..."
ENV_FILE="$APP_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "   Creating .env file..."
    cat <<EOF | sudo -u "$DEPLOY_USER" tee "$ENV_FILE" > /dev/null
# SMTP Configuration for contact form
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=587
SMTP_USER=prabhanshu@avantiterraform.com
SMTP_PASS=YOUR_APP_PASSWORD_HERE
NOTIFY_EMAIL=prabhanshu@avantiterraform.com
EOF
    echo "   ⚠️  Please update SMTP_PASS in $ENV_FILE with the Fastmail app password!"
else
    echo "   ✅ .env file already exists."
fi

# --- 7. Sudoers for deploy user ---
echo "⚙️  Configuring sudo permissions for deploy user..."
cat <<EOF | sudo tee /etc/sudoers.d/deploy-avantiterraform > /dev/null
# Allow deploy user to manage nginx and certbot without password
deploy ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx, /bin/systemctl restart nginx
deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t, /usr/sbin/nginx
deploy ALL=(ALL) NOPASSWD: /bin/cp * /etc/nginx/sites-available/*
deploy ALL=(ALL) NOPASSWD: /bin/ln -sf * /etc/nginx/sites-enabled/*
deploy ALL=(ALL) NOPASSWD: /usr/bin/certbot *
EOF
sudo chmod 440 /etc/sudoers.d/deploy-avantiterraform

# --- 8. Nginx Configuration ---
echo "🌐 Configuring Nginx..."
sudo cp "$APP_DIR/deploy/nginx/avantiterraform.conf" /etc/nginx/sites-available/avantiterraform.conf
sudo ln -sf /etc/nginx/sites-available/avantiterraform.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# --- 9. SSL Certificate ---
echo "🔒 Setting up SSL..."
if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo "   Requesting new certificate..."
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN \
        --non-interactive --agree-tos --email bharat@avantiterraform.com --redirect
else
    echo "   ✅ Certificate already exists."
fi

# --- 10. Create deploy shortcut ---
echo "🔗 Creating shortcuts..."
chmod +x "$APP_DIR/deploy/run.sh"
sudo ln -sf "$APP_DIR/deploy/run.sh" /usr/local/bin/deploy-avantiterraform

echo ""
echo "🎉 VPS setup completed successfully!"
echo "================================================"
echo "Next steps:"
echo "1. Update $ENV_FILE with Fastmail app password"
echo "2. Run: deploy-avantiterraform (or /var/www/avantiterraform/deploy/run.sh)"
echo "3. Set up GitHub Actions secrets:"
echo "   - SSH_PRIVATE_KEY: Same deploy key as personal-website"
echo "   - VPS_HOST: 72.60.218.33"
echo "   - VPS_USERNAME: deploy"
echo "================================================"

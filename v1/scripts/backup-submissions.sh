#!/bin/bash
# Backup avantiterraform submissions from VPS to local machine
# Add to crontab: 0 */6 * * * /path/to/backup-submissions.sh

set -e

# Configuration
VPS_HOST="72.60.218.33"
VPS_USER="deploy"
VPS_DATA_DIR="/var/www/avantiterraform/data"
LOCAL_BACKUP_DIR="$HOME/Programs/local-bootstrapping/backups/avantiterraform"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$LOCAL_BACKUP_DIR"

# Sync from VPS
echo "[$(date)] Starting backup from VPS..."
rsync -avz --progress \
    -e "ssh -i $HOME/.ssh/id_ed25519" \
    "$VPS_USER@$VPS_HOST:$VPS_DATA_DIR/" \
    "$LOCAL_BACKUP_DIR/"

# Create timestamped backup
if [ -f "$LOCAL_BACKUP_DIR/submissions.json" ]; then
    cp "$LOCAL_BACKUP_DIR/submissions.json" "$LOCAL_BACKUP_DIR/submissions_$TIMESTAMP.json"

    # Keep only last 30 backups
    ls -t "$LOCAL_BACKUP_DIR"/submissions_*.json 2>/dev/null | tail -n +31 | xargs -r rm
fi

echo "[$(date)] Backup complete: $LOCAL_BACKUP_DIR"

# Count submissions
if [ -f "$LOCAL_BACKUP_DIR/submissions.json" ]; then
    COUNT=$(jq length "$LOCAL_BACKUP_DIR/submissions.json" 2>/dev/null || echo "unknown")
    echo "Total submissions: $COUNT"
fi

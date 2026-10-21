#!/usr/bin/env bash
# Usage: copy the Fastmail app password to the clipboard, then run this script.
# Afterwards re-create the api container: gh workflow run deploy.yml --repo prabhanshu11/avantiterraform --ref master
# (docker restart does NOT re-read --env-file; only a fresh `docker run` from deploy/run.sh does).
# Writes Fastmail SMTP settings to the VPS .env for the avantiterraform contact form.
# The app password is read from the Wayland clipboard and piped straight to the VPS;
# it is never printed or stored locally.
set -euo pipefail
SCRATCH="${XDG_RUNTIME_DIR:-/tmp}"
KEY="$(mktemp -p "$SCRATCH")"
trap 'rm -f "$KEY"' EXIT
pass show github/vps-deploy-key > "$KEY"; chmod 600 "$KEY"
PW="$(wl-paste -n)"
if [ "${#PW}" -lt 12 ] || [[ "$PW" == *" "* ]] || [[ "$PW" == *$'\n'* ]]; then
  echo "clipboard does not look like an app password (len=${#PW}); aborting" >&2; exit 1
fi
printf '%s\n' "# SMTP settings for contact form email notifications" \
  "# Fastmail SMTP, app password named avantiterraform-website-smtp (set $(date +%F))" \
  "SMTP_HOST=smtp.fastmail.com" "SMTP_PORT=587" \
  "SMTP_USER=prabhanshu@avantiterraform.com" "SMTP_PASS=$PW" \
  "NOTIFY_EMAIL=prabhanshu@avantiterraform.com" \
| ssh -o BatchMode=yes -i "$KEY" root@72.60.218.33 \
  'cp /var/www/avantiterraform/.env /var/www/avantiterraform/.env.bak-zoho 2>/dev/null; umask 077; cat > /var/www/avantiterraform/.env && chown deploy:deploy /var/www/avantiterraform/.env && chmod 600 /var/www/avantiterraform/.env && ls -l /var/www/avantiterraform/.env && sed -E "s/=(.{0,3}).*/=\1***/" /var/www/avantiterraform/.env'
unset PW

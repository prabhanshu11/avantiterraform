# Avanti Terraform - AI Agent Context

## Project Overview
- **Domain**: avantiterraform.com
- **Business**: Construction, Infrastructure Development, Engineering Consultancy (Goa, India)
- **Owner**: Bharat Singh Rajpoot & Prabhanshu Rajpoot (Partnership)

## Architecture

### Deployed Versions
| Version | URL | Technology | Port |
|---------|-----|------------|------|
| V0 | https://avantiterraform.com/ | Static HTML | nginx direct |
| V1 | https://avantiterraform.com/new | Next.js (Docker) | 3001 |
| API | /api/* | Python (Docker) | 8001 |

### Directory Structure on VPS
```
/var/www/avantiterraform/
├── index.html          # V0 static site (served by nginx)
├── v1/                 # Next.js app (Docker container)
├── api/                # Contact form backend (Docker container)
├── deploy/             # Deployment scripts
│   ├── run.sh          # Main deployment script
│   └── nginx/          # nginx configs (INCLUDING SSL — certbot never edits these)
├── data/               # Persistent data (contact form submissions)
└── .env                # Environment variables (SMTP credentials)
```

## Related Repositories

### Same VPS (72.60.218.33)
- **personal-website** (prabhanshu.space) - Main personal site with dashboard
- **vps_bootstrap** - VPS setup and maintenance scripts

### Local Development
- **local-bootstrapping** - Machine setup, dotfiles, skills (desktop/laptop sync)

## Deployment

### CI/CD Pipeline
- **Trigger**: Push to `master` branch or manual `workflow_dispatch`
- **Workflow**: `.github/workflows/deploy.yml`
- **Method**: SSH to VPS, run `deploy/run.sh`

### Deploy Key
- **Fingerprint**: `SHA256:0/FaydVfteN4xqu70OdgGli3R54JiLvFECM4SIn4/Kg`
- **Storage**: `pass show github/vps-deploy-key` (on desktop)
- **Shared with**: personal-website (same key for all VPS deployments)

### Critical Deployment Pattern
The deployment script uses `git fetch + git reset --hard` instead of `git pull` because:
1. Historically certbot modified nginx config files on the VPS
2. Any such local changes would cause `git pull` to fail
3. The reset ensures repo state matches remote exactly

```bash
# In deploy/run.sh AND workflow
git fetch origin master
git reset --hard origin/master
```

## SSL/nginx Configuration

### The Avantiterraform Incident (Jan 2026, recurred Aug 2026)
**Problem**: avantiterraform.com shows a cert warning, then serves prabhanshu.space content

**Root Cause**:
- nginx with only ONE SSL-enabled server block serves that site for ALL HTTPS traffic
- If site A has SSL but site B doesn't, https://siteB.com shows site A content
- Deployment overwrote certbot's SSL additions; the `certbot --reinstall` step that
  was supposed to restore them ran with `|| true`, so a silent certbot failure left
  the site HTTP-only for months without failing the deploy

**Solution (Aug 2026 — the durable one)**:
1. The 443 server block lives in `deploy/nginx/avantiterraform.conf`, in git.
   Certbot no longer edits nginx config at all.
2. `deploy/run.sh` obtains the cert with `certbot certonly --webroot` BEFORE
   installing the config (the config references the cert files, so `nginx -t`
   needs them present).
3. Two guards fail the deploy loudly instead of silently degrading:
   - installed config must contain `listen 443 ssl`
   - post-deploy TLS handshake on `127.0.0.1:443` must present the
     avantiterraform.com certificate
4. Do NOT reintroduce `certbot --nginx` / `--reinstall` here — that is the
   fragile pattern that failed twice.

**Diagnostic Commands** (read-only on VPS):
```bash
# Check which sites have SSL
grep -r "listen 443" /etc/nginx/sites-enabled/

# List certificates
ls /etc/letsencrypt/live/

# View cert details
openssl s_client -servername avantiterraform.com -connect avantiterraform.com:443 | openssl x509 -noout -subject
```

## VPS Access Rules

**READ-ONLY ONLY** - All changes must go through GitHub:
- Allowed: `cat`, `grep`, `ls`, `docker logs`, `systemctl status`, `nginx -t`
- PROHIBITED: `sudo cp`, `systemctl reload`, `docker run`, file modifications

**If deployment fails**: Diagnose via logs, fix locally, push to redeploy. Never "fix manually on VPS".

## Contact Form Configuration

### SMTP (Fastmail)
- **Host**: smtp.fastmail.com:587
- **User**: prabhanshu@avantiterraform.com
- **Notify Email**: prabhanshu@avantiterraform.com
- **Password**: Fastmail app password, not the account login password

### Email Aliases
- Fastmail catch-all is enabled for `avantiterraform.com`.
- Add explicit send aliases in Fastmail for `contact@avantiterraform.com`,
  `bharat@avantiterraform.com`, and `careers@avantiterraform.com`.

### Mail Migration Status
- Mail was moved from Zoho to Fastmail on 2026-07-02.
- Namecheap DNS remains authoritative; website A/CNAME records were preserved.
- Fastmail accepted the domain for send/receive.
- Old Zoho mailbox history still needs a later import via Zoho IMAP.

## Development Workflow

### Updating V1 (Next.js)
1. Make changes in `v1/` directory
2. Test locally: `cd v1 && npm run dev`
3. Commit and push to master
4. GitHub Actions deploys automatically

### Changing basePath
If moving V1 to a different URL (e.g., from /new to /):
1. Update `v1/next.config.ts` - change `basePath` and `assetPrefix`
2. Update `deploy/nginx/avantiterraform.conf` - change location blocks
3. Update `deploy/run.sh` - change health check URL
4. Push and let deployment run

## Cross-Machine Sync

This repo is cloned on both desktop and laptop. Before starting work:
```bash
git status
git log --oneline -5
ssh laptop "cd ~/Programs/avantiterraform && git status --short"
```

## Key Files

| File | Purpose |
|------|---------|
| `initial_cooking.md` | Project context, business details, conversation history |
| `v1/next.config.ts` | Next.js config including basePath |
| `deploy/run.sh` | Main deployment script |
| `deploy/nginx/avantiterraform.conf` | nginx config (HTTP + HTTPS/SSL) |
| `.github/workflows/deploy.yml` | CI/CD workflow |

## Debugging

### V1 Not Loading
```bash
# Check container is running
ssh root@72.60.218.33 "docker ps | grep avantiterraform-v1"

# Check container logs
ssh root@72.60.218.33 "docker logs avantiterraform-v1 --tail 50"

# Check nginx routing
ssh root@72.60.218.33 "curl -I http://localhost:3001/new"
```

### API Not Working
```bash
# Check API container
ssh root@72.60.218.33 "docker logs avantiterraform-api --tail 50"

# Test health endpoint
ssh root@72.60.218.33 "curl http://localhost:8001/health"
```

### SSL Issues
```bash
# Test SSL certificate
curl -vI https://avantiterraform.com 2>&1 | grep -A5 "Server certificate"

# Check certbot status
ssh root@72.60.218.33 "certbot certificates"
```

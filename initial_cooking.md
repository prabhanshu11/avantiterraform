# Avanti Terraform - Initial Cooking Document

## Project Context

### Company Details
- **Legal Name**: AVANTI TERRAFORM
- **Type**: Partnership (2 partners)
- **PAN**: ACMFA4980F
- **GSTIN**: 30ACMFA4980F1ZI
- **Firm Registration**: MOR-F34-2025
- **Date of Establishment**: 26/08/2025
- **Date of Registration**: 04/11/2025

### Partners
1. Bharat Singh Rajpoot (Resident: Uttar Pradesh)
2. Prabhanshu Rajpoot (Resident: Goa)

### Principal Place of Business
H NO 176/1, F.NO. UG-2
Gomti Residency
Near MES College, Bharat Nagar
Sancoale, South Goa, Goa 403726

### Services
- Construction (Commercial & Residential)
- Infratech Solutions
- Engineering Consultancy
- Material Supply

---

## Conversation Datapoints (v0 to v1)

### Contact Information
- **Phone 1**: +91 86181 12720
- **Phone 2**: +91 86606 81084
- **Email (display)**: contact@avantiterraform.com (alias to bharat@)
- **Email (owner)**: bharat@avantiterraform.com (actual Zoho account)
- **Careers Email**: careers@avantiterraform.com (alias for hiring)

### SMTP Configuration (Zoho)
- **Host**: smtppro.zoho.in
- **Port**: 587
- **User**: bharat@avantiterraform.com (NOT contact@, which is just an alias)
- **Password**: App password (not login password) - set by user
- **Notify Email**: bharat@avantiterraform.com

### Key Business Details
- **Experience**: 25+ years combined
- **Projects Completed**: None yet (new firm)
- **Location**: Goa-based but NOT tourism-focused

### Brand Guidelines (from conversation)
- No "Goa" in headlines or hero text
- No coconut trees, beaches, tourism imagery
- No filler pages or dead-end buttons
- Changed "Start Your Project" to "Get a Quote" (sounds more construction-oriented)
- Changed "End-to-end" to "Turnkey" (engineering term)
- Hiring banner: simple text link, not flashy banner

---

## Infrastructure Setup

### Domain & VPS
- **Domain**: avantiterraform.com (Namecheap)
- **VPS**: 72.60.218.33 (Hostinger - srv1065721.hstgr.cloud)
- **User**: deploy (for GitHub Actions)
- **SSH Key**: Uses deploy_key from personal-website repo

### GitHub Repository
- **Repo**: prabhanshu11/avantiterraform
- **Branch**: master
- **Secrets Used**:
  - SSH_PRIVATE_KEY (from personal-website deploy_key)
  - VPS_HOST (72.60.218.33)

### Current v0 Setup (Static HTML)
- **Location**: /var/www/avantiterraform/
- **Port**: 80/443 via nginx
- **API**: FastAPI Docker on port 8001
- **Contact Form**: Saves to JSON + sends email via Zoho

### v1 Setup (Next.js)
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Location**: /home/prabhanshu/Programs/avantiterraform/v1/
- **Docker**: Dockerfile and docker-compose.yml ready

---

## v1 Spec Summary (from avanti-terraform-website-spec.md)

### Pages
1. **Homepage**: Hero with contrast images, services overview, "What We Offer", blog preview
2. **Services**: Single page with anchor sections
3. **Blog**: 3 articles (Waterproofing, Slope Calculator, CRZ Compliance)
4. **Contact**: Multi-step quote form

### Design System
- **Primary text**: #1a1a1a
- **Secondary text**: #4a4a4a
- **Accent**: #2c3e50
- **CTA buttons**: #d35400 (muted orange)
- **Background**: #fafafa

### Key Features
- Interactive slope stability calculator with dynamic SVG
- Multi-step quote form
- WhatsApp floating button
- Lead magnet CTAs in blog articles

---

## Files Reference

### v0 (Current Live)
- `/home/prabhanshu/Programs/avantiterraform/index.html` - Static site
- `/home/prabhanshu/Programs/avantiterraform/api/main.py` - FastAPI backend
- `/home/prabhanshu/Programs/avantiterraform/.github/workflows/deploy.yml` - Deployment

### v1 (New Next.js)
- `/home/prabhanshu/Programs/avantiterraform/v1/src/app/` - Next.js pages
- `/home/prabhanshu/Programs/avantiterraform/v1/src/components/` - React components
- `/home/prabhanshu/Programs/avantiterraform/v1/src/lib/calculations.ts` - Slope calculator logic

### Documentation
- `/home/prabhanshu/Downloads/avanti-terraform-website-spec.md` - Full spec
- `/home/prabhanshu/Documents/avantiterraform/email-config.md` - Email setup guide

---

## Deployment Strategy

### Current State
- v0 (static) is LIVE at avantiterraform.com
- v1 (Next.js) built and ready in /v1/

### Testing Approach
- Deploy v1 to a testing URL (avantiterraform.com/preview-{random}/)
- Keep v0 running at root
- User reviews v1, then tells Claude to switch

### Switchover Process
1. Update nginx to route / to Next.js container
2. Keep API backend running
3. Update deployment workflow

---

## Session Notes

### What Works
- v0 static site is live with SSL
- Contact form saves to JSON and sends email
- GitHub Actions deployment pipeline
- v1 builds successfully

### What Needs Attention
- careers@ alias needs to be created in Zoho (for hiring link)
- **NGINX UPDATE NEEDED**: Deploy user needs NOPASSWD for nginx commands
  - Add to /etc/sudoers.d/deploy-nginx: `deploy ALL=(ALL) NOPASSWD: /bin/cp /var/www/avantiterraform/*, /usr/sbin/nginx, /bin/systemctl reload nginx`
- Database integration (user table in personal-website DB)
- Backup cron job setup

### Deployment Status (2026-01-14)
- v0 static: LIVE at https://avantiterraform.com/
- v1 Next.js: Container built and running on port 3001
- **PENDING**: nginx config update (sudo permission issue)
- Preview URL (when nginx updated): https://avantiterraform.com/preview-560b5aae

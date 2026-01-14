# Avanti Terraform - Initial Cooking Notes

## Context from Previous Sessions

### Company Details
- **Legal Name**: AVANTI TERRAFORM
- **Type**: Partnership (2 partners)
- **PAN**: ACMFA4980F
- **GSTIN**: 30ACMFA4980F1ZI
- **Firm Registration**: MOR-F34-2025
- **Location**: Sancoale, South Goa, Goa 403726
- **Services**: Construction, Infratech, Supply, Engineering Consultancy

### Partners
1. Bharat Singh Rajpoot (Resident: Uttar Pradesh)
2. Prabhanshu Rajpoot (Resident: Goa)

### Contact Information (CONFIRMED)
- **Phone 1**: +91 86181 12720
- **Phone 2**: +91 86606 81084
- **Email (display)**: contact@avantiterraform.com (alias → bharat@)
- **Email (owner)**: bharat@avantiterraform.com
- **Email (careers)**: careers@avantiterraform.com (alias → bharat@)
- **WhatsApp**: Use phone numbers above

### Infrastructure
- **Domain**: avantiterraform.com
- **VPS**: 72.60.218.33 (Hostinger)
- **GitHub Repo**: prabhanshu11/avantiterraform
- **Deploy User**: deploy (SSH key from personal-website)
- **Current Site Port**: Static HTML via nginx
- **API Port**: 8001 (FastAPI contact form)

### Email/SMTP Configuration
- **Provider**: Zoho Mail
- **SMTP Host**: smtppro.zoho.in
- **SMTP Port**: 587
- **SMTP User**: bharat@avantiterraform.com (NOT contact@ - that's just an alias)
- **App Password**: Set on VPS at /var/www/avantiterraform/.env
- **Note**: App password ≠ login password (generated separately in Zoho)

### Brand Voice Decisions (from conversation)
1. "Start Your Project" → "Get a Quote" (sounds less software-y)
2. "End-to-end" → "Turnkey" (proper construction term)
3. No "Goa" in headlines - local expertise shown through content depth
4. No tourism imagery (coconut trees, beaches)
5. Professional, understated - not marketing speak

### Statistics Confirmed
- **Years Experience**: 25+ (combined)
- **Projects Completed**: NOT displayed (no projects yet)
- **Other stats**: Service Areas (4), Commitment (100%), Availability (24/7)

### Current MVP Features
- Single-page static HTML
- Hero section with "Building Tomorrow's Infrastructure"
- 4 service cards
- About section "Built on Experience"
- Contact form (FastAPI backend, saves to JSON, emails via Zoho)
- Careers section: "We're hiring — join our team. Apply Now"
- Footer with copyright

---

## v1 Implementation Notes

### Architecture Changes
- **From**: Static HTML + FastAPI
- **To**: Next.js 14 (App Router) + Shared SQLite DB

### Database Integration
- Use SQLite database (like personal-website pattern)
- Create `avanti_contacts` table for form submissions
- Shared DB location or separate file TBD
- Backup via SSH cron to local-bootstrapping

### New Features for v1 (from spec)
1. Hero with dual images (weathered vs modern building)
2. "What We Offer" section (4 client-need-based cards)
3. Services page with anchor sections
4. Blog section with 3 articles:
   - Waterproofing skills article
   - Slope construction + calculator
   - CRZ compliance guide
5. Multi-step quote form
6. WhatsApp floating button

### Color Palette (from spec)
| Use | Hex |
|-----|-----|
| Primary text | #1a1a1a |
| Secondary text | #4a4a4a |
| Accent | #2c3e50 |
| CTA buttons | #d35400 |
| Background | #fafafa |
| Card background | #ffffff |
| Borders | #e0e0e0 |

### Typography
- Headings: Inter (500-700)
- Body: System font stack
- Hero tagline: Serif (Merriweather) for "In the seasons..."

---

## Development Checklist

### Phase 1: Core
- [ ] Next.js 14 project setup with Tailwind
- [ ] Homepage: hero, services overview, offers section
- [ ] Header/footer with registration numbers
- [ ] Mobile responsive navigation
- [ ] WhatsApp floating button

### Phase 2: Content Pages
- [ ] Services page with sections
- [ ] Multi-step contact/quote form
- [ ] Database integration for submissions

### Phase 3: Blog
- [ ] Blog listing page
- [ ] Waterproofing article
- [ ] Slope construction article + calculator
- [ ] CRZ compliance article

### Phase 4: Polish & Deploy
- [ ] Selenium tests with screenshots
- [ ] SEO meta tags
- [ ] Performance optimization
- [ ] Docker setup for production
- [ ] Backup cron job setup

---

## Reference Links
- Spec doc: ~/Downloads/avanti-terraform-website-spec.md
- personal-website (for patterns): ~/Programs/personal-website
- Email config notes: ~/Documents/avantiterraform/email-config.md

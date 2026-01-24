# Avanti Terraform - SEO Audit Report

**Date:** January 2026
**Auditor:** Claude Code
**Site:** avantiterraform.com

---

## Executive Summary

The site has basic SEO foundations but lacks critical local SEO elements needed to rank for location-based searches like "construction consultancy goa" or "project management construction goa".

**Current Local SEO Score: 2/10**

---

## What Currently Exists

### Meta Tags (Basic)
- Title tags present on all pages
- Meta descriptions present
- Keywords meta tag (limited value for Google, but present)
- OpenGraph tags (basic implementation, missing og:image)

### Content
- Footer mentions "Sancoale, South Goa"
- Contact info displayed: WhatsApp, phone, email
- CRZ Compliance blog post has excellent Goa-specific content (15+ location mentions)
- Per-page metadata for some blog posts

### Technical
- Next.js 15 with App Router
- Clean URL structure
- Mobile responsive design
- Fast loading (static generation)

---

## Critical Gaps

| Feature | Status | SEO Impact | Priority |
|---------|--------|------------|----------|
| Google Business Profile | None | Can't appear in Google Maps or local pack | Critical |
| sitemap.xml | Missing | Google can't efficiently discover all pages | High |
| robots.txt | Missing | No crawl guidance for search engines | High |
| LocalBusiness Schema (JSON-LD) | Missing | No structured local business signals | High |
| Canonical tags | Missing | Potential duplicate content issues | Medium |
| Location keywords in content | Minimal (except CRZ blog) | Won't match local search queries | Medium |
| Search engine ping on deploy | None | Slow indexing of content updates | Low |
| og:image | Missing | Poor social sharing appearance | Low |

---

## Page-by-Page Analysis

### Homepage (/)
- **Title:** "Avanti Terraform - Engineering Excellence in Construction"
- **Issue:** No location mention in title or H1
- **Recommendation:** Include "Goa" or "South India" in headline

### Services (/services)
- **Title:** "Our Services - Avanti Terraform"
- **Issue:** Generic, no location context
- **Recommendation:** Add "in Goa" to service descriptions

### Contact (/contact)
- **Current:** Shows contact form, phone, WhatsApp
- **Issue:** No full physical address displayed
- **Recommendation:** Add complete address for NAP consistency

### Blog (/blog)
- **Strength:** CRZ Compliance post has excellent local content
- **Issue:** Other posts lack location context
- **Recommendation:** Add Goa-specific content to existing posts

---

## Competitor Analysis (Manual Research Needed)

To complete competitive analysis, research these queries:
- "construction consultant goa"
- "building contractor south goa"
- "project management construction goa"
- "CRZ compliance consultant goa"

Note which competitors:
- Appear in Google Maps pack
- Have Google Business Profile
- Use location keywords in titles
- Have LocalBusiness schema

---

## Technical SEO Checklist

### Missing (To Implement)
- [ ] sitemap.xml (Next.js built-in)
- [ ] robots.txt
- [ ] LocalBusiness JSON-LD schema
- [ ] Canonical URL tags
- [ ] og:image for social sharing
- [ ] IndexNow ping on deployment

### Present (Good)
- [x] HTTPS enabled
- [x] Mobile responsive
- [x] Clean URL structure
- [x] Fast page loads
- [x] Basic meta tags

---

## Content SEO Recommendations

### High-Value Keywords to Target
- "construction consultancy goa"
- "building contractor south goa"
- "project management construction goa"
- "CRZ compliance consultant goa"
- "waterproofing contractor goa"
- "slope stabilization goa"

### Content Gaps
1. No dedicated location pages (e.g., /services/construction-goa)
2. No FAQ section targeting local queries
3. No case studies with Goa project examples
4. Limited location mentions on main pages

---

## Action Items Summary

### Immediate (Technical)
1. Create sitemap.xml
2. Create robots.txt
3. Add LocalBusiness schema to layout
4. Add canonical tags

### Short-term (Content)
1. Update homepage H1 with location
2. Add location context to services page
3. Expand footer with full address and service areas
4. Add og:image for social sharing

### Medium-term (External)
1. Create/claim Google Business Profile
2. Set up Google Search Console
3. Submit sitemap to Google

### Long-term (Content Strategy)
1. Create location-specific service pages
2. Add FAQ section with local queries
3. Write more Goa-specific blog content
4. Add case studies (anonymized local projects)

---

## Resources

- Google Business Profile: https://business.google.com
- Google Search Console: https://search.google.com/search-console
- Schema Validator: https://validator.schema.org
- Rich Results Test: https://search.google.com/test/rich-results

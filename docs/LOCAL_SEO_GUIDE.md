# Avanti Terraform - Local SEO Implementation Guide

**Purpose:** Rank for location-based searches like "construction consultancy goa"
**Status:** Planned (not yet implemented)
**Last Updated:** January 2026

---

## Overview

This guide documents the implementation plan for adding local SEO features to avantiterraform.com. The goal is to improve visibility in local search results and Google Maps.

---

## Implementation Phases

### Phase 1: Foundation (Technical SEO)

**1.1 Add sitemap.xml generation**
```typescript
// File: v1/src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://avantiterraform.com'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    // Add blog posts dynamically
  ]
}
```

**1.2 Add robots.txt**
```
# File: v1/public/robots.txt
User-agent: *
Allow: /

Sitemap: https://avantiterraform.com/sitemap.xml
```

**1.3 Add LocalBusiness Schema**
```typescript
// Add to v1/src/app/layout.tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Avanti Terraform",
  "description": "Construction and infrastructure consultancy in Goa, India",
  "url": "https://avantiterraform.com",
  "telephone": "+91-XXXXXXXXXX",
  "email": "contact@avantiterraform.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H NO 176/1, F.NO. UG-2, Gomti Residency",
    "addressLocality": "Sancoale",
    "addressRegion": "Goa",
    "postalCode": "403726",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "15.3900", // Update with actual
    "longitude": "73.8500"  // Update with actual
  },
  "areaServed": [
    { "@type": "State", "name": "Goa" },
    { "@type": "Country", "name": "India" }
  ],
  "serviceType": [
    "Construction Consultancy",
    "Project Management",
    "CRZ Compliance",
    "Waterproofing",
    "Slope Stabilization"
  ]
}
```

**1.4 Add canonical tags**
```typescript
// In layout.tsx metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://avantiterraform.com'),
  alternates: {
    canonical: '/',
  },
  // ... rest of metadata
}
```

---

### Phase 2: Content Updates

**2.1 Homepage updates**
- Update H1: "Construction & Infrastructure Consultancy in Goa"
- Add location context to hero section
- Mention "serving Goa and South India"

**2.2 Services page updates**
- Add "in Goa" to service descriptions
- Mention coastal/CRZ expertise prominently
- Include "serving clients across Goa"

**2.3 Footer enhancement**
```
Full Address:
H NO 176/1, F.NO. UG-2, Gomti Residency
Sancoale, South Goa 403726, India

Service Areas:
Panjim | Margao | Vasco | Mapusa | Ponda | South Goa | North Goa
```

**2.4 Meta tags update**
- Title: "Avanti Terraform | Construction Consultancy in Goa, India"
- Description: "Expert construction and infrastructure consultancy in Goa. Project management, CRZ compliance, waterproofing, and slope stabilization services across South India."

---

### Phase 3: Google Business Profile (Manual)

**Required user actions:**

1. **Create/Claim GBP**
   - Go to: https://business.google.com
   - Search for existing listing or create new
   - Verify ownership (mail, phone, or email)

2. **Configure GBP**
   - Business name: "Avanti Terraform"
   - Category: "Construction Company" or "Building Consultant"
   - Address: H NO 176/1, F.NO. UG-2, Gomti Residency, Sancoale, Goa 403726
   - Service area: Goa, South Goa, North Goa
   - Hours: Set business hours
   - Photos: Add office/project photos
   - Services: List all services with descriptions

3. **NAP Consistency**
   - Ensure Name, Address, Phone match EXACTLY on:
     - Website footer
     - Google Business Profile
     - Any directory listings

---

### Phase 4: Search Engine Notifications

**4.1 IndexNow on deployment**
```bash
# Add to deploy/run.sh after successful deployment

# Ping IndexNow for faster indexing
INDEXNOW_KEY="your-key-here"
PAGES=(
  "https://avantiterraform.com/"
  "https://avantiterraform.com/services"
  "https://avantiterraform.com/contact"
  "https://avantiterraform.com/blog"
)

for page in "${PAGES[@]}"; do
  curl -s "https://api.indexnow.org/indexnow?url=${page}&key=${INDEXNOW_KEY}" || true
done
```

**4.2 Google Search Console setup (Manual)**
- Go to: https://search.google.com/search-console
- Add property: avantiterraform.com
- Verify ownership (DNS or HTML file)
- Submit sitemap: /sitemap.xml

---

### Phase 5: Future Content (Roadmap)

**Location-specific pages:**
- `/services/construction-goa`
- `/services/crz-compliance-goa`
- `/services/waterproofing-goa`

**Blog content ideas:**
- "Construction Costs in Goa 2026"
- "Monsoon Building Tips for Coastal Goa"
- "Understanding Goa's Property Tax Changes"
- "Complete Guide to CRZ Compliance in Goa"
- Local project case studies (anonymized)

**FAQ section topics:**
- "How much does construction cost per sqft in Goa?"
- "What is the typical construction timeline for Goa projects?"
- "Do I need CRZ clearance for my property in Goa?"
- "Best time to start construction in Goa?"
- "How to choose a construction consultant in Goa?"

---

## Files to Modify

| File | Changes | Phase |
|------|---------|-------|
| `v1/src/app/sitemap.ts` | Create - sitemap generation | 1 |
| `v1/public/robots.txt` | Create - crawler instructions | 1 |
| `v1/src/app/layout.tsx` | Add LocalBusiness schema, canonical, enhanced meta | 1 |
| `v1/src/app/page.tsx` | Update hero/H1 with location | 2 |
| `v1/src/app/services/page.tsx` | Add location to service descriptions | 2 |
| `v1/src/components/Footer.tsx` | Full address, service areas | 2 |
| `deploy/run.sh` | Add IndexNow ping after deploy | 4 |

---

## Verification Checklist

After implementation, verify:

- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` is accessible
- [ ] Google Rich Results Test passes for homepage
- [ ] Schema.org validator shows no errors
- [ ] Homepage H1 includes location
- [ ] Footer shows complete address
- [ ] IndexNow ping succeeds in deployment logs
- [ ] Google Business Profile is verified and complete
- [ ] NAP matches across website and GBP

---

## Monitoring

**Monthly checks:**
1. Google Search Console - indexing status, search queries
2. Google Business Profile - insights, reviews
3. Search for "avanti terraform goa" - verify knowledge panel appears

**Key metrics to track:**
- Impressions for local keywords
- Click-through rate from local searches
- Google Maps views (from GBP insights)
- Direction requests (from GBP insights)

---

## Resources

- [Google Business Profile](https://business.google.com)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [IndexNow Documentation](https://www.indexnow.org/documentation)

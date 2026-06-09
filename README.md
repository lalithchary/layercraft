# LayerCraft - 3D Printing Service Website

Professional 3D printing service website for India. Static site hosted on GitHub Pages.

## Live URL
https://layercraft.shop

## Tech Stack
- Static HTML5 + CSS3 + JavaScript
- Tailwind CSS (CDN)
- Three.js (3D STL/OBJ viewer)
- Google Fonts (Space Grotesk + Inter)
- Formspree (form handling)
- GitHub Pages (hosting)

## Features
- ✅ Fully responsive (mobile-first)
- ✅ 3D file preview (STL/OBJ upload + Three.js rendering)
- ✅ WhatsApp integration (floating button + CTAs)
- ✅ Contact form (Formspree)
- ✅ SEO optimized (meta tags, structured data, sitemap)
- ✅ Dark futuristic design
- ✅ FAQ accordion
- ✅ Pricing tables
- ✅ Material comparison
- ✅ Google Maps embed

## Pages
1. `index.html` - Home (hero, services, how it works, testimonials)
2. `services.html` - Detailed service descriptions
3. `materials.html` - Material guide & comparison
4. `pricing.html` - Transparent pricing tables
5. `upload.html` - File upload + 3D preview + quote form
6. `industries.html` - Industry use cases
7. `about.html` - Company story & workshop info
8. `faq.html` - Frequently asked questions
9. `contact.html` - Contact form, map, info
10. `404.html` - Custom error page

## Setup Instructions

### 1. Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit - LayerCraft website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/layercraft.git
git push -u origin main
```

### 2. Enable GitHub Pages
- Go to repository Settings → Pages
- Source: Deploy from branch
- Branch: main / (root)
- Save

### 3. Connect Custom Domain
- Buy `layercraft.shop` from GoDaddy/Namecheap (~₹199-349/year)
- Add DNS records:
  - A record → 185.199.108.153
  - A record → 185.199.109.153
  - A record → 185.199.110.153
  - A record → 185.199.111.153
  - CNAME → www → YOUR_USERNAME.github.io
- Wait 24-48 hours for propagation
- Enable "Enforce HTTPS" in GitHub Pages settings

### 4. Configure Formspree
- Sign up at formspree.io (free: 50 submissions/month)
- Create a new form
- Replace `YOUR_FORM_ID` in upload.html and contact.html with your form ID

### 5. Update Placeholders
Search and replace these placeholders:
- `918186891961` → Your WhatsApp number
- `+91-8186891961` → Your phone number
- `[Your City]` → Your city name
- `[Your Address]` → Your full address
- `[State]` → Your state
- `[PIN]` → Your PIN code
- Google Maps iframe → Your actual location embed code

## Yearly Cost
| Item | Cost |
|------|------|
| Domain (.in) | ₹199-349 |
| GitHub Pages | FREE |
| SSL | FREE |
| Formspree | FREE |
| Total | **₹199-349/year** |

## License
© 2025 LayerCraft. All rights reserved.

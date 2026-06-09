# MASTER PROMPT FOR WEBSITE GENERATION

Use this prompt in any AI website builder or code generator to create the complete website:

---

## PROMPT START

Create a complete, production-ready static website for a 3D printing business with the following specifications:

### Brand Identity
- **Business Name:** PrintForge3D
- **Tagline:** "From File to Form"
- **Tone:** Futuristic, professional, trustworthy, clean, technical but approachable
- **Target Market:** India-based customers (students, engineers, architects, designers, gift buyers) with global appeal
- **Logo:** Minimal layer-stack icon — three stacked rounded rectangles with slight perspective offset, in Electric Cyan (#00E5FF) on dark background

### Technical Requirements
- **Hosting:** GitHub Pages (static files only — HTML, CSS, JS)
- **No backend/server-side code** — everything must run client-side
- **Framework:** Static HTML + Tailwind CSS (via CDN) + Vanilla JavaScript
- **3D Viewer:** Three.js with STLLoader for client-side 3D file preview
- **Forms:** Formspree integration for contact/quote forms
- **Responsive:** Mobile-first, works on all screen sizes
- **Performance:** Lightweight, fast loading, minimal dependencies
- **SEO:** Proper meta tags, Open Graph, structured data for local business

### Design System
- **Mode:** Dark mode default
- **Background:** #0A0A0F (main), #12121A (cards/surfaces)
- **Primary Color:** #00E5FF (Electric Cyan) — used for CTAs, links, highlights
- **Accent Color:** #7C3AED (Vivid Purple) — secondary elements
- **Text Primary:** #F0F0F5 (Off White)
- **Text Secondary:** #94A3B8 (Cool Gray)
- **Success/CTA:** #00FF88 (Neon Green for WhatsApp button)
- **Border:** #1E293B (subtle dividers)
- **Fonts:** Space Grotesk (headings, 500/700 weight), Inter (body, 400/500 weight) — Google Fonts
- **Border Radius:** 8px buttons, 12px cards
- **Icons:** Lucide Icons (SVG, stroke 1.5px)
- **Animations:** Subtle fade-in-up on scroll (IntersectionObserver), hover glow on buttons, smooth transitions (0.2s ease)
- **Spacing:** 80px section padding desktop, 48px mobile, max-width 1200px content

### Pages to Create

#### 1. Home (index.html)
- Hero section with headline: "From Digital to Real. Precision 3D Printing for India."
- Subheadline: "Upload. Quote. Print. Ship. Professional 3D printing starting at ₹49."
- Primary CTA: "Upload & Get Quote" → links to upload page
- Secondary CTA: "View Pricing" → links to pricing page
- Background: Subtle dot/grid pattern with gradient overlay
- Services overview: 4 cards (FDM Printing, Resin/SLA, Design, Post-Processing) with icons
- "How It Works" 3-step section: Upload → Quote → Print & Ship
- Materials preview: Card grid showing PLA, ABS, PETG, Resin with key properties
- Testimonials: 3 customer quotes in cards
- Trust bar: "500+ Prints Delivered | 4.8★ Rating | Same-Day Quotes | Pan-India Shipping"
- Final CTA banner: "Ready to print? Upload your file now"
- Floating WhatsApp button (bottom-right, always visible, green #25D366)

#### 2. Services (services.html)
- Page title: "Our Services"
- Service cards with detailed descriptions:
  - FDM Printing (PLA, ABS, PETG, TPU, Nylon) — affordable, strong
  - Resin/SLA Printing — ultra-detail, smooth finish
  - 3D Design & Modeling — from sketch to file, ₹499+
  - Post-Processing — sanding, painting, assembly
  - Batch Production — volume runs, consistent quality
  - File Repair & Optimization — fix print issues
- Each card has: icon, title, description, "starting from" price, CTA button

#### 3. Materials (materials.html)
- Comparison table and individual material cards
- Materials: PLA, ABS, PETG, TPU, Nylon, Standard Resin, Tough Resin
- Each entry: properties (strength, flexibility, heat resistance, detail), best use cases, price range per gram
- "Not sure which material?" CTA → WhatsApp

#### 4. Industries/Use Cases (industries.html)
- Segments: Education, Engineering, Architecture, Automotive, Healthcare, Art & Gifts, Startups
- Each with icon, description, example prints, relevant CTA

#### 5. Upload & Get Quote (upload.html) — KEY PAGE
- File upload area (drag & drop + browse button)
- Accepts: .stl, .obj, .3mf files
- THREE.JS 3D VIEWER: When user uploads STL file, render it in a canvas with:
  - OrbitControls (rotate, zoom, pan)
  - Grid helper for scale reference
  - Dimensions display (X, Y, Z in mm)
  - Dark background matching site theme
  - Proper lighting (ambient + directional)
- Below viewer: Material selector dropdown, quantity input, notes field
- Form submission via Formspree (include file name, dimensions, material choice, contact info)
- Note: "We'll review your file and send a detailed quote within 2 hours via WhatsApp"
- Alternative: WhatsApp direct share button "Send file on WhatsApp"
- Trust note: "Your files are confidential and never shared"

#### 6. Pricing (pricing.html)
- Clean pricing table:
  - FDM PLA: ₹5-7/gram, minimum ₹99
  - FDM ABS/PETG: ₹6-9/gram, minimum ₹129
  - FDM TPU: ₹9-14/gram, minimum ₹199
  - Resin Standard: ₹11-17/gram, minimum ₹249
  - Resin Tough: ₹14-20/gram, minimum ₹299
  - Design: from ₹499
  - Post-Processing: from ₹110
  - Shipping: from ₹80
- Note: "Final price depends on model complexity, size, and finish. Upload for exact quote."
- CTA: "Upload for Exact Quote"

#### 7. About (about.html)
- Founder story (placeholder text about starting the business)
- Mission statement
- Equipment list / capabilities
- Workshop photo placeholder
- Values: Quality, Transparency, Speed, Innovation

#### 8. FAQ (faq.html)
- Accordion-style FAQ with 10+ questions covering:
  - File formats, turnaround time, minimum orders, payment methods, shipping, defects, confidentiality, design help, materials advice, walk-in policy
- CTA at bottom: "Still have questions? WhatsApp us"

#### 9. Contact (contact.html)
- Contact form (Formspree): Name, Email, Phone, Message, File attachment option
- WhatsApp button (prominent)
- Phone number
- Email address
- Workshop address with Google Maps embed (use placeholder coordinates)
- Business hours: Mon-Sat 10AM-7PM
- Social links: Instagram

### Global Elements (all pages)
- **Navigation:** Sticky top nav with logo + menu items + "Get Quote" CTA button
- **Mobile:** Hamburger menu
- **Footer:** Business name, tagline, quick links, contact info, social icons, "Made with ❤️ in India"
- **WhatsApp Float:** Fixed bottom-right green button with WhatsApp icon, links to wa.me/[number]
- **Back to Top:** Subtle scroll-to-top button

### 3D Viewer Implementation (upload.html)
```javascript
// Use Three.js (import from CDN)
// Import STLLoader from three/examples
// On file input change:
// 1. Read file with FileReader
// 2. Parse with STLLoader
// 3. Create mesh with MeshPhongMaterial (color: #00E5FF)
// 4. Add to scene with ambient + directional light
// 5. Fit camera to object bounds
// 6. Add OrbitControls
// 7. Add GridHelper
// 8. Display bounding box dimensions
// 9. Animate with requestAnimationFrame
```

### SEO Requirements
- Title format: "PrintForge3D | [Page Name] | Professional 3D Printing India"
- Meta descriptions for each page (150-160 chars)
- Open Graph tags for social sharing
- Schema.org LocalBusiness structured data on home/contact pages
- Canonical URLs
- Sitemap.xml
- robots.txt

### Additional Features
- Smooth scroll navigation
- Lazy loading for images (loading="lazy")
- Preconnect to Google Fonts
- Print-friendly styling (optional)
- 404.html custom error page

### Content Tone
- Professional but friendly
- Technical accuracy without jargon overload
- Indian market context (prices in ₹, Indian shipping references, UPI payments)
- Futuristic language: "precision," "engineered," "layer by layer," "digital to physical"
- Trust-building: specific numbers, guarantees, transparency

### File Structure
```
/
├── index.html
├── services.html
├── materials.html
├── industries.html
├── upload.html
├── pricing.html
├── about.html
├── faq.html
├── contact.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── CNAME
├── assets/
│   ├── css/
│   │   └── style.css (custom styles beyond Tailwind)
│   ├── js/
│   │   ├── main.js (navigation, animations, common)
│   │   └── viewer.js (Three.js 3D viewer for upload page)
│   ├── images/
│   │   ├── logo.svg
│   │   ├── favicon.ico
│   │   └── og-image.png
│   └── fonts/ (if self-hosting)
└── README.md
```

Generate all files with complete, functional code. The website should be immediately deployable to GitHub Pages with no modifications needed. Use CDN links for Three.js, Tailwind CSS, and Lucide Icons. All interactive elements should work without a backend.

## PROMPT END

---

## USAGE NOTES

1. Paste this entire prompt into an AI code generator (Claude, GPT-4, Cursor, Bolt, etc.)
2. If the AI cannot generate all files at once, ask page by page
3. After generation, push to GitHub repository and enable GitHub Pages in Settings
4. Update CNAME file with your actual domain
5. Replace placeholder content (phone number, address, Google Maps coordinates)
6. Connect Formspree account and update form action URLs
7. Update WhatsApp link with actual business number (wa.me/91XXXXXXXXXX)

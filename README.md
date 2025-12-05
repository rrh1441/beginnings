# Beginnings Schools Website

A modern, responsive website for Beginnings Schools, a nonprofit early learning organization in Seattle with locations in Queen Anne and Capitol Hill.

## Project Structure

```
beginnings/
├── index.html              # Home page
├── programs.html           # Programs (Infants, Toddlers, Preschool)
├── locations.html          # Locations overview
├── admissions.html         # Admissions & enrollment info
├── about.html              # About us / Philosophy
├── team.html               # Our team / Staff bios
├── daily-life.html         # Meals & daily life
├── contact.html            # Contact form & info
├── locations/
│   ├── queen-anne.html     # Queen Anne location detail
│   └── capitol-hill.html   # Capitol Hill location detail
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── data/
│   ├── site-config.json    # Site configuration
│   ├── openings.json       # Current openings (editable)
│   └── content.json        # Editable content blocks
└── images/                 # Image assets (add your photos here)
```

## Admin Guide: Updating Content

### Updating Current Openings

Edit `data/openings.json` to update enrollment availability:

```json
{
  "queenAnne": {
    "infants": {
      "status": "waitlist",           // waitlist, limited, enrolling, or closed
      "statusText": "Waitlist Only",  // Display text
      "note": "Typical wait 6-12 months.",
      "badgeColor": "orange"          // orange, green, or gray
    },
    ...
  }
}
```

**Status options:**
- `waitlist` - No immediate openings, families join waitlist (orange badge)
- `limited` - Small number of spots available soon (green badge)
- `enrolling` - Actively accepting enrollments (green badge)
- `closed` - Not accepting applications (gray badge)

Remember to update `_lastUpdated` when you make changes.

### Updating Site Content

Edit `data/content.json` to update:
- Hero headline and subheadline
- Testimonials
- Enrollment process steps
- Team bios
- Daily schedule
- Meal information

### Updating Page Meta Information

Edit `data/site-config.json` to update:
- Location addresses and contact info
- Program details (ratios, age ranges)
- SEO keywords and descriptions

### Adding/Replacing Images

Place images in the `images/` folder and reference them in the HTML. Recommended image sizes:

- Hero images: 1200x800px
- Program cards: 800x600px
- Team photos: 400x400px (square)
- Gallery images: 800x600px

**Always add alt text** that describes the image content for accessibility and SEO.

## Technical Details

### Fonts

The site uses Google Fonts:
- **Fraunces** - Headings (serif, warm, approachable)
- **Inter** - Body text (clean, readable)

### Colors

Primary palette defined in CSS variables:
- `--color-primary`: #2D5A4A (deep sage green)
- `--color-secondary`: #E8B86D (warm honey)
- `--color-accent`: #C4785F (terracotta)

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px – 1024px
- Desktop: > 1024px

### JavaScript Features

- Mobile navigation toggle
- Dynamic openings component (reads from JSON)
- Contact form handling (simulated - integrate with your backend)
- Smooth scroll for anchor links
- Image lightbox for galleries
- Schema.org structured data injection

## Deployment

This is a static site that can be deployed to any web server or static hosting service:

1. **Netlify / Vercel**: Connect your Git repository for automatic deployments
2. **Traditional hosting**: Upload all files via FTP
3. **GitHub Pages**: Enable Pages in repository settings

### Before Deploying

1. Replace placeholder images in `/images/` with real photos
2. Update contact information in `data/site-config.json`
3. Set up form handling (connect to Formspree, Netlify Forms, or your backend)
4. Update Google Maps embed URLs with your actual location coordinates
5. Add Google Analytics or other tracking if needed

## SEO Checklist

- [x] Unique title and meta description per page
- [x] Semantic HTML headings (H1, H2, etc.)
- [x] Alt text for all images
- [x] Schema.org LocalBusiness structured data
- [x] Mobile-responsive design
- [x] Fast loading (minimal dependencies)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile for each location

## Browser Support

Tested and working in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Skip navigation link (add if needed)
- Form labels and error states

## Form Integration

The contact form currently simulates submission. To connect to a real backend:

### Option 1: Netlify Forms
Add `netlify` attribute to form:
```html
<form id="contact-form" netlify>
```

### Option 2: Formspree
Update form action:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Option 3: Custom Backend
Modify `initContactForm()` in `js/main.js` to POST to your API endpoint.

## License

Copyright 2024 Beginnings Schools. All rights reserved.

---

For questions or support, contact your web developer or info@beginningsschools.org.

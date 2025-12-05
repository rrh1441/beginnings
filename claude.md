# Beginnings Schools Website

## Project Overview
Static website for Beginnings Schools, a nonprofit NAEYC-accredited early learning program in Seattle with two locations (Queen Anne and Capitol Hill). Built for deployment on Vercel.

## Tech Stack
- Static HTML/CSS/JS
- CSS custom properties for theming
- JSON-configurable content (openings.json, content.json, site-config.json)
- No build process required

## Key Files
- `/data/openings.json` - Update this to change current openings display
- `/css/styles.css` - All styles with CSS custom properties
- `/js/main.js` - Mobile nav, openings component, schema markup

## Future Improvements

### SEO Enhancements (not yet implemented)
- Add canonical URLs to each page (`<link rel="canonical" href="...">`)
- Create sitemap.xml for search engine discovery
- Add robots.txt
- Expand schema.org markup beyond LocalBusiness (add ChildCare, EducationalOrganization types)

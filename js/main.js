/**
 * Beginnings Schools - Main JavaScript
 * Handles site interactivity, data loading, and form handling
 */

(function() {
  'use strict';

  // ============================================
  // Configuration & Data Loading
  // ============================================

  let siteConfig = null;
  let openingsData = null;
  let contentData = null;

  /**
   * Load JSON data files
   */
  async function loadData() {
    try {
      const [configRes, openingsRes, contentRes] = await Promise.all([
        fetch('/data/site-config.json'),
        fetch('/data/openings.json'),
        fetch('/data/content.json')
      ]);

      siteConfig = await configRes.json();
      openingsData = await openingsRes.json();
      contentData = await contentRes.json();

      return true;
    } catch (error) {
      console.error('Error loading site data:', error);
      return false;
    }
  }

  // ============================================
  // Mobile Navigation
  // ============================================

  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav__close');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (!toggleBtn || !mobileNav) return;

    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    });

    function closeNav() {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeNav);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  // ============================================
  // Current Openings Component
  // ============================================

  /**
   * Render the current openings widget
   * @param {string} containerId - The container element ID
   * @param {string} mode - 'summary' for home page, 'full' for detailed view
   * @param {string|null} locationFilter - Filter to specific location
   */
  function renderOpenings(containerId, mode = 'summary', locationFilter = null) {
    const container = document.getElementById(containerId);
    if (!container || !openingsData || !siteConfig) return;

    const locations = locationFilter
      ? { [locationFilter]: siteConfig.locations[locationFilter] }
      : siteConfig.locations;

    let html = `
      <div class="openings">
        <div class="openings__header">
          <h3 class="openings__title">Current Openings</h3>
          <span class="openings__updated">Updated ${openingsData._lastUpdated}</span>
        </div>
    `;

    Object.entries(locations).forEach(([locKey, location]) => {
      const locOpenings = openingsData[locKey === 'queenAnne' ? 'queenAnne' : 'capitolHill'];
      if (!locOpenings) return;

      html += `
        <div class="openings__location">
          <h4 class="openings__location-name">${location.name}</h4>
          <div class="openings__list">
      `;

      Object.entries(siteConfig.programs).forEach(([progKey, program]) => {
        const opening = locOpenings[progKey];
        if (!opening) return;

        const badgeClass = `badge--${opening.badgeColor || 'gray'}`;

        html += `
          <div class="openings__item">
            <div class="openings__program">
              <span class="openings__program-name">${program.name} (${program.ageRange})</span>
              <span class="badge ${badgeClass}">${opening.statusText}</span>
            </div>
            ${mode === 'full' && opening.note ? `<p class="openings__note">${opening.note}</p>` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  /**
   * Render compact openings badges for location pages
   */
  function renderOpeningsBadges(containerId, locationKey) {
    const container = document.getElementById(containerId);
    if (!container || !openingsData || !siteConfig) return;

    const locOpenings = openingsData[locationKey];
    if (!locOpenings) return;

    let html = '<div class="flex flex-wrap gap-2">';

    Object.entries(siteConfig.programs).forEach(([progKey, program]) => {
      const opening = locOpenings[progKey];
      if (!opening) return;

      const badgeClass = `badge--${opening.badgeColor || 'gray'}`;
      html += `<span class="badge ${badgeClass}">${program.name}: ${opening.statusText}</span>`;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // ============================================
  // Testimonials Carousel
  // ============================================

  function initTestimonialsCarousel() {
    const container = document.querySelector('.testimonials-carousel');
    if (!container || !contentData) return;

    // For now, render all testimonials in a grid
    // Could be enhanced with a proper carousel library
    let html = '';

    contentData.testimonials?.forEach(testimonial => {
      html += `
        <div class="testimonial">
          <blockquote class="testimonial__quote">
            ${testimonial.quote}
          </blockquote>
          <p class="testimonial__author">${testimonial.author}</p>
          <p class="testimonial__details">${testimonial.details}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ============================================
  // Process Steps
  // ============================================

  function renderProcessSteps(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !contentData?.enrollmentProcess?.steps) return;

    let html = '<div class="process">';

    contentData.enrollmentProcess.steps.forEach(step => {
      html += `
        <div class="process__step">
          <div class="process__number">${step.number}</div>
          <div class="process__content">
            <h4 class="process__title">${step.title}</h4>
            <p class="process__text">${step.description}</p>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // ============================================
  // Contact Form
  // ============================================

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // In production, this would submit to a backend
      // For now, we'll simulate success
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        form.innerHTML = `
          <div class="card" style="text-align: center; padding: var(--space-8);">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-success); margin: 0 auto var(--space-4);">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            <h3>Thank You!</h3>
            <p class="lead">We've received your inquiry and will be in touch within 1–2 business days.</p>
            <a href="/" class="btn btn--primary mt-4">Return to Home</a>
          </div>
        `;

        // Track conversion (placeholder for analytics)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': data.location || 'Not specified'
          });
        }
      } catch (error) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('There was an error submitting your inquiry. Please try again or call us directly.');
      }
    });

    // Date of birth input enhancement
    const dobInput = form.querySelector('input[name="child_dob"]');
    if (dobInput) {
      // Set max date to today
      const today = new Date().toISOString().split('T')[0];
      dobInput.setAttribute('max', today);

      // Set min date to 5 years ago (oldest child we'd accept)
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
      dobInput.setAttribute('min', fiveYearsAgo.toISOString().split('T')[0]);
    }
  }

  // ============================================
  // Tour Request Modal (optional enhancement)
  // ============================================

  function initTourModal() {
    const tourBtns = document.querySelectorAll('[data-tour-location]');

    tourBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const location = btn.dataset.tourLocation;
        // Could open a modal here, or scroll to form with location pre-selected
        const locationSelect = document.querySelector('select[name="location"]');
        if (locationSelect) {
          locationSelect.value = location;
          locationSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // Active Navigation State
  // ============================================

  function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
        link.classList.add('nav__link--active');
      }
    });
  }

  // ============================================
  // Lazy Load Images
  // ============================================

  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback with Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // ============================================
  // Gallery Lightbox (basic implementation)
  // ============================================

  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery__item img');

    galleryItems.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        // Simple lightbox - could be enhanced with a library
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        `;

        const largeImg = document.createElement('img');
        largeImg.src = img.src;
        largeImg.alt = img.alt;
        largeImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;

        overlay.appendChild(largeImg);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
          document.body.removeChild(overlay);
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
          if (e.key === 'Escape') {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
            document.removeEventListener('keydown', closeOnEscape);
          }
        });
      });
    });
  }

  // ============================================
  // Schema.org Structured Data
  // ============================================

  function injectStructuredData() {
    if (!siteConfig) return;

    const locations = Object.values(siteConfig.locations);

    locations.forEach(location => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "ChildCare",
        "name": location.fullName,
        "description": location.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": location.address.street,
          "addressLocality": location.address.city,
          "addressRegion": location.address.state,
          "postalCode": location.address.zip,
          "addressCountry": "US"
        },
        "telephone": location.phone,
        "email": location.email,
        "url": `https://beginningsschools.org/locations/${location.id}`,
        "openingHours": "Mo-Fr 07:00-18:00",
        "priceRange": "$$",
        "areaServed": {
          "@type": "City",
          "name": "Seattle"
        },
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "NAEYC Accreditation"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }

  // ============================================
  // Initialize Everything
  // ============================================

  async function init() {
    // Load data first
    await loadData();

    // Initialize UI components
    initMobileNav();
    initSmoothScroll();
    setActiveNav();
    initLazyLoading();
    initGallery();
    initContactForm();
    initTourModal();

    // Render dynamic content
    renderOpenings('openings-home', 'summary');
    renderOpenings('openings-admissions', 'full');
    renderOpenings('openings-queen-anne', 'full', 'queenAnne');
    renderOpenings('openings-capitol-hill', 'full', 'capitolHill');
    renderProcessSteps('enrollment-process');
    initTestimonialsCarousel();

    // Inject structured data for SEO
    injectStructuredData();

    console.log('Beginnings Schools site initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions globally for debugging
  window.BeginningsSchools = {
    renderOpenings,
    loadData,
    siteConfig: () => siteConfig,
    openingsData: () => openingsData
  };

})();

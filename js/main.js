/* ===================================================================
   STUDIO CUTS - VIDEO EDITOR PORTFOLIO JAVASCRIPT
   Interactive Player Simulation, Color Grade Slider, Filters & Controls
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1. FILTER TABS LOGIC
  // -------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
      const value = btn.dataset.filter;
      projectCards.forEach(card => {
        card.style.display = value === 'all' || card.dataset.category === value ? 'flex' : 'none';
      });
    });
  });

  // -------------------------------------------------------------
  // 2. INTERACTIVE BEFORE & AFTER COLOR GRADING SLIDER
  // -------------------------------------------------------------
  const sliderContainer = document.getElementById('color-slider-container');
  const rawLayer = document.getElementById('raw-layer');
  const sliderHandle = document.getElementById('slider-handle');

  if (sliderContainer && rawLayer && sliderHandle) {
    sliderHandle.tabIndex = 0;
    sliderHandle.setAttribute('role', 'slider');
    sliderHandle.setAttribute('aria-label', 'Compare original and color graded image');
    sliderHandle.setAttribute('aria-valuemin', '0');
    sliderHandle.setAttribute('aria-valuemax', '100');
    sliderHandle.setAttribute('aria-valuenow', '50');
    sliderHandle.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      let value = Number(sliderHandle.getAttribute('aria-valuenow'));
      value = e.key === 'Home' ? 0 : e.key === 'End' ? 100 : Math.max(0, Math.min(100, value + (e.key === 'ArrowRight' ? 5 : -5)));
      rawLayer.style.width = value + '%'; sliderHandle.style.left = value + '%'; sliderHandle.setAttribute('aria-valuenow', value);
    });
    let isDragging = false;

    const updateSliderPosition = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      // Bound between 0 and rect.width
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      rawLayer.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
      sliderHandle.setAttribute("aria-valuenow", Math.round(percentage));
    };

    // Mouse Events
    sliderHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events for Mobile
    sliderHandle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // -------------------------------------------------------------
  // 3. ACCESSIBLE IMAGE LIGHTBOX
  const lightbox = document.getElementById('image-lightbox');
  const closeImage = document.getElementById('image-lightbox-close');
  let imageTrigger;
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    imageTrigger?.focus();
  };
  document.querySelectorAll('.open-image-btn').forEach(button => {
    if (button.tagName !== 'BUTTON') {
      button.tabIndex = 0;
      button.setAttribute('role', 'button');
      button.setAttribute('aria-label', 'View image: ' + button.dataset.title);
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); button.click(); }
      });
    }
    button.addEventListener('click', () => {
      imageTrigger = button;
      const photo = document.getElementById('image-lightbox-photo');
      photo.src = button.dataset.image;
      photo.alt = button.dataset.title;
      document.getElementById('image-lightbox-title').textContent = button.dataset.title;
      document.getElementById('image-lightbox-category').textContent = button.dataset.category || 'Selected work';
      document.getElementById('image-original-link').href = button.dataset.image;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeImage.focus();
    });
  });
  closeImage.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'Tab') {
      const last = document.getElementById('image-original-link');
      if (event.shiftKey && document.activeElement === closeImage) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); closeImage.focus(); }
    }
  });

  // 5. CONTACT FORM SUBMISSION
  // -------------------------------------------------------------
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name').value;
      const email = document.getElementById('client-email').value;
      const format = document.getElementById('project-type').selectedOptions[0].text;
      const budget = document.getElementById('project-budget').selectedOptions[0].text;
      const brief = document.getElementById('project-details').value;
      const body = 'Name: ' + name + '\nEmail: ' + email + '\nFormat: ' + format + '\nBudget: ' + budget + '\n\n' + brief;
      const draft = document.createElement('a');
      draft.href = 'mailto:alex.rivera.edits@gmail.com?subject=' + encodeURIComponent('Project inquiry from ' + name) + '&body=' + encodeURIComponent(body);
      draft.click();
      showToast('Your email app will open with the brief. Send it there to complete your inquiry.');
    });
  }

  // -------------------------------------------------------------
  // 6. TOAST NOTIFICATION UTILITY
  // -------------------------------------------------------------
  function showToast(message) {
    const toast = document.getElementById('toast-notice');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // -------------------------------------------------------------
  // 7. MOBILE NAVIGATION TOGGLE
  // -------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open'); mobileToggle.setAttribute('aria-expanded', 'false');
    }));
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.section-header, .project-card, .process-card, .pricing-card').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
  }

  // -------------------------------------------------------------

});

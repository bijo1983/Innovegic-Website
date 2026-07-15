/* ============================================================
   INNOVEGIC — Site interactions
   Mobile nav, sticky header, scroll reveal, animated counters,
   back-to-top, form handling. Zero dependencies (ES6).
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('header');
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = open ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.counter || '0') + (el.dataset.suffix || '');
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Contact / demo forms (mailto handoff) ----------
     Replace with your form backend endpoint (e.g. Formspree,
     Netlify Forms, or a custom API) when available.            */
  document.querySelectorAll('form[data-mailto]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = form.dataset.subject || 'Website Enquiry — Innovegic';
      const lines = [];
      data.forEach((value, key) => {
        if (String(value).trim()) lines.push(`${key.replace(/[-_]/g, ' ')}: ${value}`);
      });
      const mailto = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      window.location.href = mailto;
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Your email client has been opened with your message. You can also reach us directly at ' + form.dataset.mailto + '.';
        note.classList.remove('hidden');
      }
    });
  });
})();

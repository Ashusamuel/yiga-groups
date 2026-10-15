/* =====================================================
   YIGA GROUPS — SHARED BASE JAVASCRIPT v1.0
   Nav scroll, mobile drawer, scroll reveal,
   count-up animation, contact form, footer year.
   ===================================================== */
'use strict';

(function () {
  /* ─── REDUCED MOTION ─── */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData     = navigator.connection ? navigator.connection.saveData : false;

  /* ─── NAV SCROLL BEHAVIOUR ─── */
  const nav = document.querySelector('.yg-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE DRAWER ─── */
  const menuBtn = document.querySelector('[data-yg-menu-toggle]');
  const drawer  = document.querySelector('[data-yg-drawer]');
  const overlay = document.querySelector('[data-yg-overlay]');
  const closeBtn = drawer && drawer.querySelector('[data-yg-drawer-close]');

  if (menuBtn && drawer) {
    let isOpen = false;

    function openDrawer() {
      isOpen = true;
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const first = drawer.querySelector('a, button');
      if (first) first.focus();
    }

    function closeDrawer() {
      isOpen = false;
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    }

    menuBtn.addEventListener('click', () => isOpen ? closeDrawer() : openDrawer());
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay)  overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeDrawer();
    });

    /* Close drawer links on navigation */
    drawer.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeDrawer)
    );
  }

  /* ─── SCROLL REVEAL ─── */
  if (!reduceMotion) {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => obs.observe(el));
    }
  }

  /* ─── COUNT-UP ANIMATION ─── */
  function countUp(el, target, duration) {
    if (reduceMotion) {
      el.textContent = Number(target).toLocaleString();
      return;
    }
    const startTime = performance.now();
    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('[data-count]');
  if (statEls.length) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          countUp(entry.target, target, 800);
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statsObs.observe(el));
  }

  /* ─── CONTACT FORM ─── */
  const form = document.querySelector('[data-yg-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      setTimeout(() => {
        form.innerHTML = [
          '<p class="yg-form__success" role="alert">',
          'Thanks, we got your message.',
          ' We\'ll reply within two working days.',
          '</p>',
        ].join('');
      }, 800);
    });
  }

  /* ─── FOOTER YEAR ─── */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Wings accordion ---------- */
  const wingButtons = document.querySelectorAll('.wing-summary');
  wingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // close others for a tidy directory feel
      wingButtons.forEach(other => other.setAttribute('aria-expanded', 'false'));
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Scroll reveal (sections & key blocks) ---------- */
  const revealTargets = document.querySelectorAll(
    '.philosophy-statement, .phil-item, .wings-head, .wing-row, .founder-copy, .founder-portrait, .stat, .culture-inner, .contact-copy, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const isPlain = el.dataset.plain === 'true';
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = isPlain ? value.toString() : value.toString().padStart(String(target).length, '0');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    if (prefersReducedMotion) { el.textContent = target.toString(); return; }
    requestAnimationFrame(step);
  };
  if (statNums.length && 'IntersectionObserver' in window) {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statNums.forEach(el => statIo.observe(el));
  } else {
    statNums.forEach(el => { el.textContent = el.dataset.count; });
  }

  /* ---------- Contact form (static site — no backend) ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in every field before sending.';
        status.style.color = '#DC2626';
        return;
      }
      const name = form.querySelector('#name').value.trim();
      status.style.color = '#16A34A';
      status.textContent = `Thanks, ${name.split(' ')[0]} — your message is ready. Since this is a static preview, connect it to your mail or form service to go live.`;
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Hero orbit canvas: 8 wings orbiting one core ---------- */
  const canvas = document.getElementById('orbit-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const colors = ['#2563EB', '#16A34A', '#4d8dff', '#22c55e', '#0B3D91', '#60a5fa', '#16A34A', '#2563EB'];

    const nodes = colors.map((c, i) => ({
      angle: (i / colors.length) * Math.PI * 2,
      speed: 0.09 + (i % 3) * 0.02,
      radiusFactor: 0.72 + (i % 2) * 0.1,
      color: c,
      size: 4 + (i % 3)
    }));

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const baseR = Math.min(w, h) * 0.36;

      // orbit rings
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      [0.72, 0.82, 0.92].forEach(f => {
        ctx.beginPath();
        ctx.arc(cx, cy, baseR * f, 0, Math.PI * 2);
        ctx.stroke();
      });

      // core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      coreGrad.addColorStop(0, '#4d8dff');
      coreGrad.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F5F7FA';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      nodes.forEach(n => {
        const angle = n.angle + (prefersReducedMotion ? 0 : t * n.speed);
        const r = baseR * n.radiusFactor;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.94;

        // connecting line
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // node glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, n.size * 3.4);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, n.size * 3.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(x, y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.016;
      if (!prefersReducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }
})();

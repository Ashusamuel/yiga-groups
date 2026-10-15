document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
  });

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('is-visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // --- Number Counter Animation ---
  const stats = document.querySelectorAll('.stat-num');
  let hasCounted = false;
  const countUp = () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 50 && !hasCounted) {
      hasCounted = true;
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.innerText = Math.ceil(current) + (target > 100 ? '+' : '');
            requestAnimationFrame(updateCounter);
          } else {
            stat.innerText = target + (target > 100 ? '+' : '');
          }
        };
        updateCounter();
      });
    }
  };
  window.addEventListener('scroll', countUp);
  countUp();

  // --- Wing Accordions ---
  const wings = document.querySelectorAll('.wing-summary');
  wings.forEach(wing => {
    wing.addEventListener('click', () => {
      const isExpanded = wing.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions (optional)
      wings.forEach(w => w.setAttribute('aria-expanded', 'false'));
      
      if (!isExpanded) {
        wing.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Footer Year ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // --- Canvas Background Animation ---
  const initCanvas = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.5,
        sx: (Math.random() - 0.5) * 0.0002,
        sy: (Math.random() - 0.5) * 0.0002,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? '#2563EB' : '#16A34A'
      });
    }

    const rings = [
      { cx: 0.85, cy: 0.2, rx: 0.25, ry: 0.20, speed: 0.00015, angle: 0 },
      { cx: 0.85, cy: 0.2, rx: 0.35, ry: 0.28, speed: -0.00010, angle: Math.PI / 3 },
      { cx: 0.85, cy: 0.2, rx: 0.45, ry: 0.36, speed: 0.00008, angle: Math.PI }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Draw Rings
      rings.forEach(ring => {
        ring.angle += ring.speed * 16;
        ctx.save();
        ctx.strokeStyle = 'rgba(37,99,235,0.06)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(ring.cx * W, ring.cy * H, ring.rx * W, ring.ry * H, 0, 0, Math.PI * 2);
        ctx.stroke();

        const dx = Math.cos(ring.angle) * ring.rx * W;
        const dy = Math.sin(ring.angle) * ring.ry * H;
        
        ctx.fillStyle = 'rgba(22,163,74,0.6)';
        ctx.beginPath();
        ctx.arc(ring.cx * W + dx, ring.cy * H + dy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Particles
      particles.forEach(p => {
        p.x += p.sx;
        p.y += p.sy;
        
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  };
  
  initCanvas();
});

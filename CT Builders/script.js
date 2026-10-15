// CT Builders — wing-specific script
'use strict';

// Animate progress bars when they enter view
const fills = document.querySelectorAll('.progress-bar__fill');
if (fills.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    fills.forEach(el => {
      el.style.width = el.dataset.width || '0%';
    });
  } else {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width;
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    fills.forEach(el => {
      el.style.width = '0';
      obs.observe(el);
    });
  }
}

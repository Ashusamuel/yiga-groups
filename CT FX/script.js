// FXCT — wing-specific script
'use strict';
// All shared behaviour is in ../shared/base.js

(function () {
  // Pre-select curriculum stage in contact form when clicking path card CTAs
  const stageLinks = document.querySelectorAll('.path-cta[data-stage]');
  const stageSelect = document.getElementById('contact-stage');

  if (stageLinks.length && stageSelect) {
    stageLinks.forEach(link => {
      link.addEventListener('click', () => {
        const stage = link.getAttribute('data-stage');
        if (stage && stageSelect.querySelector(`option[value="${stage}"]`)) {
          stageSelect.value = stage;
        }
      });
    });
  }
})();

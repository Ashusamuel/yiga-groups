// CT Net Lines — coverage checker & wing interactions
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('check-coverage-btn');
  const result = document.getElementById('coverage-result');
  const input = document.querySelector('.coverage-checker__input');

  if (btn && result && input) {
    const performCoverageCheck = () => {
      const city = input.value.trim();
      if (!city) {
        result.textContent = 'Please enter a city or area name.';
        result.style.color = 'var(--on-surface-muted)';
        input.focus();
        return;
      }

      const normalizedCity = city.toLowerCase();
      const available = ['yaoundé', 'yaounde', 'douala'].includes(normalizedCity);
      const soon = ['bamenda', 'bafoussam', 'buea'].includes(normalizedCity);

      if (available) {
        result.textContent = `✓ CT Net Lines is available in ${city}. Contact us to get connected.`;
        result.style.color = 'var(--success)';
      } else if (soon) {
        result.textContent = `CT Net Lines is coming to ${city} soon. Register your interest and we will reach out.`;
        result.style.color = 'var(--warning)';
      } else {
        result.textContent = `We do not yet cover ${city}. Register below and we will notify you when we expand there.`;
        result.style.color = 'var(--on-surface-muted)';
      }
    };

    btn.addEventListener('click', performCoverageCheck);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performCoverageCheck();
      }
    });
  }
});

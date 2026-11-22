/* V12 accessibility fallback for the supplied animated portrait mark. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) return;

  document.querySelectorAll('.brand-logo').forEach(image => {
    image.src = 'assets/photos/aranav-brand-mark.webp';
  });
  document.querySelectorAll('.preloader-logo').forEach(image => {
    image.src = 'assets/photos/aranav-brand-mark.webp';
  });
  document.querySelectorAll('.hero-image-frame img').forEach(image => {
    image.src = 'assets/photos/aranav-cinematic-logo-still.webp';
    image.removeAttribute('srcset');
  });
})();

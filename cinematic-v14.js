/* ARANAV PORTFOLIO V14 — quiet interaction polish. */
(() => {
  'use strict';
  const header = document.querySelector('.header');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A single hairline progress indicator. It updates in one animation frame per scroll burst.
  const progress = document.createElement('div');
  progress.className = 'v14-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  document.body.appendChild(progress);
  const fill = progress.firstElementChild;
  let frame = 0;
  const paint = () => {
    frame = 0;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const position = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    fill.style.transform = 'scaleX(' + position + ')';
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  const requestPaint = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(paint);
  };
  window.addEventListener('scroll', requestPaint, { passive: true });
  window.addEventListener('resize', requestPaint, { passive: true });
  window.addEventListener('pageshow', paint);
  paint();

  // Do not add pointer trails, custom cursors or continuous parallax. The page stays calm.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.querySelectorAll('.work-card, .timeline-item, .story-copy > *').forEach(node => {
      if (node.classList.contains('reveal') || node.dataset.v14Observed) return;
      node.dataset.v14Observed = 'true';
      node.classList.add('v14-observe');
    });
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('v14-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.v14-observe').forEach(node => observer.observe(node));
  }
})();

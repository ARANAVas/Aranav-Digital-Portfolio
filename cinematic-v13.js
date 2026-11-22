/* ARANAV PORTFOLIO V13 — adaptive hero media and runtime safeguards. */
(() => {
  'use strict';

  const video = document.querySelector('.hero-mark-video');
  if (!video) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const slowConnection = Boolean(navigator.connection && /^(slow-2g|2g)$/.test(navigator.connection.effectiveType || ''));
  const sourceNodes = Array.from(video.querySelectorAll('source[data-src]'));
  let mediaLoaded = false;
  let visible = false;
  let observer = null;

  const pause = () => {
    try { video.pause(); } catch (_) { /* Media may not have initialized. */ }
  };

  const loadMediaOnce = () => {
    if (mediaLoaded || reduceMotion.matches || saveData || slowConnection) return;
    sourceNodes.forEach(source => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    mediaLoaded = true;
    video.load();
  };

  const playWhenReady = () => {
    if (!visible || document.hidden || reduceMotion.matches || saveData || slowConnection) {
      pause();
      return;
    }
    loadMediaOnce();
    if (!mediaLoaded) return;
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        // The poster remains visible when autoplay is restricted by the browser.
      });
    }
  };

  if (reduceMotion.matches || saveData || slowConnection || !('IntersectionObserver' in window)) {
    // Prefer the 31 KB poster to making visitors download a decorative movie.
    pause();
    video.removeAttribute('autoplay');
  } else {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.12;
        if (visible) playWhenReady();
        else pause();
      });
    }, { threshold: [0, 0.12, 0.35] });
    observer.observe(video);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (visible) playWhenReady();
  });

  window.addEventListener('pagehide', pause, { passive: true });
  window.addEventListener('pageshow', () => {
    if (visible && !document.hidden) playWhenReady();
  });

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', event => {
      if (event.matches) {
        pause();
        video.removeAttribute('autoplay');
      } else if (visible) {
        playWhenReady();
      }
    });
  }
})();

(() => {
  'use strict';
  const body = document.body;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // Loader: release the page even when an image or font is slow to resolve.
  const loader = document.querySelector('.page-loader');
  const finishLoading = () => {
    loader?.classList.add('done');
    body.classList.remove('loading');
  };
  body.classList.add('loading');
  if (document.readyState === 'complete') window.setTimeout(finishLoading, 300);
  else window.addEventListener('load', () => window.setTimeout(finishLoading, 300), { once: true });
  window.setTimeout(finishLoading, 2600);

  // Header clock and date use the visitor's local timezone.
  const timeEl = document.getElementById('local-time');
  const dateEl = document.getElementById('local-date');
  const yearEl = document.getElementById('year-now');
  const updateClock = () => {
    const now = new Date();
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (dateEl) dateEl.textContent = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    if (yearEl) yearEl.textContent = String(now.getFullYear());
  };
  updateClock();
  window.setInterval(updateClock, 60000);

  // Theme switch with graceful storage fallback.
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('aranav-portfolio-theme'); } catch (_) { /* Storage may be unavailable. */ }
  const applyTheme = (theme) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    const toDark = next === 'light';
    if (themeButton) {
      themeButton.setAttribute('aria-label', toDark ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.setAttribute('aria-pressed', String(next === 'dark'));
      themeButton.title = toDark ? 'Switch to dark theme' : 'Switch to light theme';
    }
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☼' : '◐';
    if (metaTheme) metaTheme.setAttribute('content', next === 'dark' ? '#151d27' : '#f2f0e9');
    try { window.localStorage.setItem('aranav-portfolio-theme', next); } catch (_) { /* Theme still works without storage. */ }
  };
  applyTheme(savedTheme || 'light');
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Typewriter role strip inspired by the flip-card intro in the reference.
  const roleEl = document.getElementById('changing-role');
  const roles = ['Digital Marketing Professional', 'Brand Promotion & Growth', 'SEO & Content Planning'];
  if (roleEl && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;
    let timer = null;
    const type = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, current.length);
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          timer = window.setTimeout(type, 1700);
          return;
        }
      } else {
        charIndex = Math.max(0, charIndex - 1);
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timer = window.setTimeout(type, deleting ? 32 : 58);
    };
    timer = window.setTimeout(type, 1800);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && timer) window.clearTimeout(timer);
      else if (!document.hidden) timer = window.setTimeout(type, 500);
    });
  }

  // Scroll reveal; content remains visible if IntersectionObserver is unavailable.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11, rootMargin: '0px 0px -32px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Accessible mobile navigation: close after navigation or Escape.
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  };
  menuToggle?.addEventListener('click', () => {
    const opened = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); }, { passive: true });

  // Active navigation state follows the visible section.
  const sectionIds = ['home', 'expertise', 'skills', 'experience', 'story', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const current = entry.target.id;
        navLinks.forEach(link => {
          const target = link.getAttribute('href')?.slice(1);
          const aliases = current === 'expertise' && target === 'expertise';
          link.classList.toggle('active', target === current || aliases);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => activeObserver.observe(section));
  }

  // Subtle custom cursor and magnetic action buttons on precise-pointer devices.
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (finePointer && !reduceMotion && dot && ring) {
    let x = -100, y = -100, rx = -100, ry = -100, rafId = 0;
    const onMove = event => {
      x = event.clientX; y = event.clientY;
      dot.style.opacity = '1'; ring.style.opacity = '1';
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const animateRing = () => {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(animateRing);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    animateRing();
    document.querySelectorAll('a,button,.door-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    window.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    window.addEventListener('pagehide', () => { if (rafId) window.cancelAnimationFrame(rafId); }, { once: true });

    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', event => {
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * .035;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * .06;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }
})();

(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // Keep the loader fail-safe: it never blocks the page beyond 2.6 seconds.
  const loader = document.querySelector('.page-loader');
  let loaderFinished = false;
  const finishLoading = () => {
    if (loaderFinished) return;
    loaderFinished = true;
    loader?.classList.add('done');
    body.classList.remove('loading');
  };
  body.classList.add('loading');
  const loaderFallback = window.setTimeout(finishLoading, 2600);
  if (document.readyState === 'complete') {
    window.setTimeout(() => { finishLoading(); window.clearTimeout(loaderFallback); }, 180);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(() => { finishLoading(); window.clearTimeout(loaderFallback); }, 180);
    }, { once: true });
  }

  // Local clock and copyright year.
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

  // Theme toggle remains usable even when localStorage is disabled.
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('aranav-portfolio-theme'); } catch (_) { /* Private browsing can disable storage. */ }
  const applyTheme = theme => {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    const nextAction = next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    if (themeButton) {
      themeButton.setAttribute('aria-label', nextAction);
      themeButton.setAttribute('aria-pressed', String(next === 'dark'));
      themeButton.title = nextAction;
    }
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☼' : '◐';
    if (metaTheme) metaTheme.content = next === 'dark' ? '#151d27' : '#f2f0e9';
    try { window.localStorage.setItem('aranav-portfolio-theme', next); } catch (_) { /* Theme still works for this visit. */ }
  };
  applyTheme(savedTheme || 'light');
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Short, stable typewriter phrases prevent the hero label from overflowing.
  const roleEl = document.getElementById('changing-role');
  const roles = ['Digital Marketer', 'Brand Promotion', 'SEO & Content Planner'];
  if (roleEl && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;
    let timer = null;
    const type = () => {
      if (document.hidden) return;
      const phrase = roles[roleIndex];
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, phrase.length);
        roleEl.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          timer = window.setTimeout(type, 1450);
          return;
        }
      } else {
        charIndex = Math.max(0, charIndex - 1);
        roleEl.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timer = window.setTimeout(type, deleting ? 34 : 64);
    };
    timer = window.setTimeout(type, 1250);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && timer) window.clearTimeout(timer);
      else if (!document.hidden) timer = window.setTimeout(type, 450);
    });
  }

  // Reveal sections progressively without hiding content if observers are unavailable.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Functional click-to-open doors. Only one door stays open at a time.
  const doorCards = [...document.querySelectorAll('[data-door-card]')];
  const setDoorState = (card, open) => {
    if (!card) return;
    const trigger = card.querySelector('.door-trigger');
    const detail = card.querySelector('.door-detail');
    const state = card.querySelector('.door-state');
    card.classList.toggle('is-open', open);
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(open));
      const title = card.querySelector('.door-summary h3')?.textContent?.trim() || 'skills';
      trigger.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${title} skills`);
    }
    if (detail) detail.hidden = !open;
    if (state) state.textContent = open ? 'DOOR OPEN' : 'CLICK TO OPEN';
  };
  const closeAllDoors = except => doorCards.forEach(card => { if (card !== except) setDoorState(card, false); });
  doorCards.forEach(card => {
    const trigger = card.querySelector('.door-trigger');
    const closeButton = card.querySelector('[data-door-close]');
    trigger?.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      closeAllDoors(card);
      setDoorState(card, willOpen);
    });
    closeButton?.addEventListener('click', () => {
      setDoorState(card, false);
      trigger?.focus();
    });
  });

  // Mobile navigation.
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
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); }, { passive: true });

  // Active navigation indicator follows the primary page sections.
  const sectionIds = ['home', 'expertise', 'skills', 'experience', 'story', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const current = entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href')?.slice(1) === current));
      });
    }, { rootMargin: '-32% 0px -58% 0px' });
    sections.forEach(section => activeObserver.observe(section));
  }

  // Start a conversation now opens a visible contact chooser (rather than a fragile jump link).
  const contactDialog = document.getElementById('contact-dialog');
  const conversationTriggers = document.querySelectorAll('.conversation-trigger');
  const openContactDialog = () => {
    if (!contactDialog) {
      window.location.href = 'mailto:asarnavsharma04@gmail.com?subject=Let%27s%20connect%20-%20Aranav%20Sharma';
      return;
    }
    if (typeof contactDialog.showModal === 'function') contactDialog.showModal();
    else contactDialog.setAttribute('open', '');
    contactDialog.querySelector('[data-dialog-close]')?.focus();
  };
  conversationTriggers.forEach(button => button.addEventListener('click', openContactDialog));
  contactDialog?.querySelectorAll('[data-dialog-close]').forEach(button => button.addEventListener('click', () => {
    if (typeof contactDialog.close === 'function') contactDialog.close();
    else contactDialog.removeAttribute('open');
  }));
  contactDialog?.addEventListener('click', event => {
    if (event.target === contactDialog && typeof contactDialog.close === 'function') contactDialog.close();
  });
  contactDialog?.addEventListener('close', () => {
    document.querySelector('.conversation-trigger')?.focus({ preventScroll: true });
  });

  // Copy email has a legacy fallback for browsers without Clipboard API permissions.
  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');
  const emailAddress = 'asarnavsharma04@gmail.com';
  const fallbackCopy = () => {
    const field = document.createElement('textarea');
    field.value = emailAddress;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
    field.remove();
    return copied;
  };
  copyButton?.addEventListener('click', async () => {
    let copied = false;
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try { await navigator.clipboard.writeText(emailAddress); copied = true; } catch (_) { copied = fallbackCopy(); }
    } else copied = fallbackCopy();
    if (copyStatus) copyStatus.textContent = copied ? 'Email address copied.' : `Please copy this address: ${emailAddress}`;
  });

  // Lightweight desktop cursor/magnetic feedback; disabled for touch and reduced-motion users.
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
        const dx = (event.clientX - (rect.left + rect.width / 2)) * .025;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * .045;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // Escape closes open doors too when the visitor is not inside the native dialog.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !contactDialog?.open) closeAllDoors(null);
  });
})();

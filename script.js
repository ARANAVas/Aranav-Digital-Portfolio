(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  // Page loader: never trap visitors behind the intro animation.
  const loader = $('.preloader');
  const finishLoading = () => { loader?.classList.add('is-done'); body.classList.remove('is-loading'); };
  body.classList.add('is-loading');
  if (document.readyState === 'complete') window.setTimeout(finishLoading, 180);
  else window.addEventListener('load', () => window.setTimeout(finishLoading, 180), { once: true });
  window.setTimeout(finishLoading, 1800);

  // Short role rotator. The text remains readable during transitions and pauses in hidden tabs.
  const roleText = $('#role-text');
  const roles = ['Digital Marketing', 'Meta & Google Ads', 'Applied AI & GenAI', 'SEO & Content Strategy', 'Brand Growth'];
  let roleIndex = 0, roleTimer = 0, roleSwapTimer = 0;
  const stopRoleRotation = () => { window.clearTimeout(roleTimer); window.clearTimeout(roleSwapTimer); };
  const scheduleRoleRotation = delay => {
    stopRoleRotation();
    if (!roleText || reduceMotion || document.hidden) return;
    roleTimer = window.setTimeout(() => {
      roleText.classList.add('is-changing');
      roleSwapTimer = window.setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleText.textContent = roles[roleIndex];
        roleText.classList.remove('is-changing');
        scheduleRoleRotation(2500);
      }, 150);
    }, delay);
  };
  scheduleRoleRotation(2200);
  document.addEventListener('visibilitychange', () => {
    stopRoleRotation();
    if (!document.hidden) scheduleRoleRotation(500);
  });

  // Current year.
  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme switch with guarded persistence.
  const themeButton = $('.theme-toggle');
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('aranav-portfolio-theme') || 'light'; } catch (_) { /* Storage can be disabled. */ }
  const setTheme = theme => {
    const value = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = value;
    themeButton?.setAttribute('aria-pressed', String(value === 'light'));
    if (themeButton) {
      themeButton.querySelector('span').textContent = value === 'dark' ? '☼' : '◐';
      const nextThemeLabel = value === 'dark' ? 'Switch to white and red theme' : 'Switch to dark theme';
      themeButton.setAttribute('aria-label', nextThemeLabel);
      themeButton.setAttribute('title', nextThemeLabel);
    }
    const meta = $('meta[name="theme-color"]');
    meta?.setAttribute('content', value === 'dark' ? '#0b1018' : '#ffffff');
    try { localStorage.setItem('aranav-portfolio-theme', value); } catch (_) { /* Theme still works without storage. */ }
  };
  setTheme(savedTheme);
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Mobile navigation.
  const menuToggle = $('.menu-toggle');
  const nav = $('.nav');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  };
  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open') || false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  $$('.nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  // Scroll reveal; content stays visible if the browser lacks IntersectionObserver.
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  // Active navigation item.
  const navSections = ['home', 'expertise', 'work', 'journey', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$('.nav-link').forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
    }), { rootMargin: '-35% 0px -58% 0px' });
    navSections.forEach(section => navObserver.observe(section));
  }

  // Skill door data. This is written as capability and working knowledge, not inflated scores.
  const skillData = {
    marketing: {
      number: '01 / 04', kicker: 'SKILL AREA / STRATEGY, PAID MEDIA & GROWTH', title: 'Digital Marketing & Paid Media', symbol: '✳',
      intro: 'I approach digital marketing as a connected growth system: understand the audience, shape a clear message, choose the right channel and measure what matters. My toolkit includes social media, brand communication, campaign planning and the fundamentals of paid advertising across Meta Ads and Google Ads.',
      tags: ['Social Media Marketing', 'Meta Ads', 'Google Ads', 'Paid Media Planning', 'Brand Promotion', 'Content Strategy', 'Audience Research', 'Campaign Objectives', 'Creative Testing', 'Performance Metrics'],
      bullets: [
        'Plan content themes, platform-specific messaging and practical posting calendars around business goals.',
        'Translate campaign goals into clear objectives, audience segments, messages, creative directions and calls to action.',
        'Understand the Meta campaign structure: campaign, ad set and ad; plan objectives, audiences, placements, budgets and creative variations.',
        'Apply Meta Ads planning fundamentals for Facebook and Instagram, including awareness, traffic, engagement and lead-generation use cases.',
        'Understand Google Ads Search campaign structure, keyword intent, match-type concepts, negative keywords and responsive search ad copy.',
        'Plan Google Display and YouTube campaign concepts around audience intent, creative format and the role of each channel in the funnel.',
        'Use a test-and-learn approach: compare hooks, headlines, visuals, audiences and landing-page relevance before recommending changes.',
        'Read core paid-media indicators such as impressions, reach, CTR, CPC, CPM, conversions, CPA and ROAS, and explain what each can indicate.',
        'Keep brand communication consistent across social platforms and coordinate creative assets, ownership and delivery timelines.',
        'Prepare clear campaign briefs, progress updates and structured optimisation recommendations; validate tracking and account settings before launch.'
      ],
      platforms: [
        { name: 'Meta Ads', descriptor: 'Facebook & Instagram', summary: 'Campaign planning across the Meta Ads Manager structure, from objective selection to creative and audience testing.', points: ['Campaign / ad set / ad hierarchy and objective mapping', 'Audience segmentation, custom and retargeting audience concepts', 'Placements, budget planning and creative variation testing', 'Pixel and conversion-event fundamentals; lead-form workflow awareness', 'Reach, impressions, frequency, CTR, CPC, CPM, CPL and ROAS interpretation'] },
        { name: 'Google Ads', descriptor: 'Search · Display · YouTube', summary: 'Intent-led search planning and cross-channel campaign concepts, aligned to the audience journey and landing page.', points: ['Search keyword research, intent grouping and negative-keyword concepts', 'Match types, responsive search ads, headlines and descriptions', 'Search, Display and YouTube campaign-format awareness', 'Budget, bidding and conversion-goal planning fundamentals', 'Impressions, clicks, CTR, CPC, conversions, CPA and ROAS interpretation'] }
      ],
      tools: 'Social: Instagram · Facebook · YouTube · LinkedIn · Canva · Adobe Express. Paid media: Meta Ads Manager · Meta Business Suite · Google Ads · Google Keyword Planner. Measurement vocabulary: reach · impressions · CTR · CPC · CPM · CPA / CPL · conversions · ROAS. Positioning: campaign planning and platform fundamentals; no unverified live-spend results or certifications are claimed.',
      quote: 'Good advertising is not just reach. It is the right message, for the right audience, with a measurable purpose.'
    },
    seo: {
      number: '02 / 04', kicker: 'SKILL AREA / SEARCH & EXPERIENCE', title: 'SEO & Website', symbol: '⌕',
      intro: 'I work with SEO fundamentals and website reviews to make pages clearer for people and more understandable to search engines. My focus is careful research, useful structure and practical checks.',
      tags: ['SEO Fundamentals', 'Keyword Research', 'Search Intent', 'Metadata Review', 'On-page SEO', 'Website QA'],
      bullets: ['Research keywords and connect them with relevant page topics and search intent.', 'Review title tags, meta descriptions, headings and page content.', 'Check indexability signals and identify technical issues such as unintended noindex directives.', 'Review website usability, mobile layout, links and visible content.', 'Document findings and turn them into prioritised improvement recommendations.'],
      tools: 'Search research · Meta tag checkers · Browser QA · Google Search fundamentals · Website content review',
      quote: 'Visibility begins with relevance. A useful page should answer a real question, clearly.'
    },
    ai: {
      number: '03 / 04', kicker: 'SKILL AREA / APPLIED AI & GENERATIVE AI', title: 'AI & Generative AI', symbol: '✧',
      intro: 'I apply generative AI to research, content development, learning experiences and creative production. My strength is model-aware prompting: giving AI systems clear context, constraints and output direction, then refining and checking the result with human judgement.',
      tags: ['Prompt Engineering', 'Model-Agnostic Prompting', 'Context & Instruction Design', 'Multimodal Prompting', 'AI-Assisted Research', 'Content Generation', 'Video Storyboarding', 'Output Evaluation', 'Responsible AI'],
      bullets: [
        'Build structured prompts using role, objective, audience, context, examples, constraints and a defined output format.',
        'Adapt instructions for different model families instead of relying on one generic prompt; compare outputs and refine for accuracy, tone and usefulness.',
        'Use ChatGPT and Google Gemini for brainstorming, research assistance, summaries, outlines, explanations and first-draft development.',
        'Develop scene-by-scene Gemini Veo concepts with camera direction, visual continuity, presenter actions, Hinglish dialogue and smartboard sequences for educational Shorts.',
        'Create AI-assisted marketing hooks, captions, content variations, campaign concepts, scripts and creative briefs for human review.',
        'Structure prompts for text, image and video workflows; specify composition, subject, scene, lighting, movement, style and aspect ratio when relevant.',
        'Evaluate generated answers for factual accuracy, source quality, bias, brand fit and originality before using them in public-facing work.',
        'Follow human-in-the-loop and responsible-use practices: protect confidential data, verify important claims and respect rights and platform policies.'
      ],
      tools: 'Hands-on use: ChatGPT / OpenAI GPT · Google Gemini · Gemini Veo. Model ecosystem awareness: Anthropic Claude · Microsoft Copilot · Perplexity · Meta Llama · DeepSeek · xAI Grok · Mistral · Qwen · Cohere · Amazon Nova. Creative AI ecosystem awareness: DALL·E · Imagen · Adobe Firefly · Midjourney · Sora · Runway · Kling · Pika. Familiarity varies by tool; practical work is strongest in ChatGPT, Gemini and Veo.',
      quote: 'The model creates possibilities. The prompt sets direction. Human judgement makes the result useful.'
    },
    operations: {
      number: '04 / 04', kicker: 'SKILL AREA / DATA & DIGITAL OPERATIONS', title: 'Data & Operations', symbol: '▤',
      intro: 'Good execution depends on dependable systems. I bring detail-oriented data handling, documentation and coordination skills that help everyday work stay organised.',
      tags: ['Advanced Data Entry', 'Data Accuracy', 'Data Management', 'MS Word', 'Microsoft Excel', 'Reporting', 'Team Coordination'],
      bullets: ['Enter, organise and validate information with attention to detail.', 'Maintain spreadsheets, digital records, documents and file structures.', 'Prepare clear summaries, progress updates and routine reports.', 'Handle email communication, internet research and document processing.', 'Coordinate tasks, follow up on deliverables and communicate blockers early.', 'Use checklists and simple workflows to reduce missed steps.'],
      tools: 'Microsoft Word · Microsoft Excel · Email · Online research · Documentation · File management · Task trackers',
      quote: 'Reliable work is often built on the small details people do not notice — until they go wrong.'
    }
  };

  // Cinematic door journey: approach -> hinge swing -> move through portal -> reveal skill detail.
  const stage = $('#doors-stage');
  const detail = $('#skill-detail');
  let activeDoor = null;
  let doorTimers = [];
  let flightOverlay = null;
  const detailEls = {
    counter: $('#detail-counter'), kicker: $('#detail-kicker'), title: $('#detail-title'), intro: $('#detail-intro'),
    tags: $('#detail-tags'), list: $('#detail-list'), tools: $('#detail-tools'), quote: $('#detail-quote'), symbol: $('#detail-symbol')
  };
  const clearDoorTimers = () => {
    doorTimers.forEach(window.clearTimeout);
    doorTimers = [];
  };
  const later = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    doorTimers.push(timer);
    return timer;
  };
  const fillSkillDetail = data => {
    detailEls.counter.textContent = data.number;
    detailEls.kicker.textContent = data.kicker;
    detailEls.title.textContent = data.title;
    detailEls.intro.textContent = data.intro;
    detailEls.tags.replaceChildren(...data.tags.map(tag => { const node = document.createElement('span'); node.textContent = tag; return node; }));
    detailEls.list.replaceChildren(...data.bullets.map(item => { const li = document.createElement('li'); li.textContent = item; return li; }));
    detailEls.tools.textContent = data.tools;
    const platformWrap = $('#detail-platforms');
    if (platformWrap) {
      platformWrap.replaceChildren();
      if (Array.isArray(data.platforms) && data.platforms.length) {
        const heading = document.createElement('h4');
        heading.className = 'platforms-heading';
        heading.textContent = 'PAID MEDIA / PLATFORM CAPABILITIES';
        platformWrap.appendChild(heading);
        const grid = document.createElement('div');
        grid.className = 'platform-card-grid';
        data.platforms.forEach(platform => {
          const card = document.createElement('article');
          card.className = 'platform-card';
          const top = document.createElement('div');
          top.className = 'platform-card-top';
          const title = document.createElement('h5'); title.textContent = platform.name;
          const descriptor = document.createElement('span'); descriptor.textContent = platform.descriptor;
          top.append(title, descriptor);
          const summary = document.createElement('p'); summary.textContent = platform.summary;
          const list = document.createElement('ul');
          platform.points.forEach(point => { const li = document.createElement('li'); li.textContent = point; list.appendChild(li); });
          card.append(top, summary, list);
          grid.appendChild(card);
        });
        platformWrap.appendChild(grid);
        platformWrap.hidden = false;
      } else platformWrap.hidden = true;
    }
    detailEls.quote.textContent = '“' + data.quote + '”';
    detailEls.symbol.textContent = data.symbol;
  };
  const resetDoors = () => {
    $$('.skill-door').forEach(card => {
      card.classList.remove('is-opening', 'is-open');
      const button = $('.door-button', card);
      button.disabled = false;
      button.setAttribute('aria-expanded', 'false');
    });
  };
  const removeFlightOverlay = () => {
    if (!flightOverlay) return;
    flightOverlay.remove();
    flightOverlay = null;
    body.classList.remove('door-transitioning');
  };
  const buildFlightOverlay = (card, button) => {
    removeFlightOverlay();
    const arch = $('.door-arch', button);
    const rect = (arch || button).getBoundingClientRect();
    const ratio = Math.max(.48, Math.min(.9, rect.width / Math.max(rect.height, 1)));
    const targetHeight = Math.min(window.innerHeight * .84, 900, (window.innerWidth * .84) / ratio);
    const targetWidth = targetHeight * ratio;
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = (window.innerHeight - targetHeight) / 2;
    const zoom = Math.max(window.innerWidth / targetWidth, window.innerHeight / targetHeight) * 1.4;

    const overlay = document.createElement('div');
    overlay.className = 'door-flight-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const portal = document.createElement('div');
    portal.className = 'door-flight-portal';
    portal.style.setProperty('--portal-zoom', String(zoom));
    const shell = document.createElement('div');
    shell.className = 'door-flight-shell ' + Array.from(card.classList).filter(name => /^door-(blue|violet|green|amber)$/.test(name)).join(' ');
    shell.style.left = rect.left + 'px';
    shell.style.top = rect.top + 'px';
    shell.style.width = rect.width + 'px';
    shell.style.height = rect.height + 'px';
    const slab = arch ? arch.cloneNode(true) : document.createElement('div');
    slab.classList.add('door-flight-door');
    slab.setAttribute('aria-hidden', 'true');
    slab.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    shell.append(portal, slab);
    overlay.appendChild(shell);
    body.appendChild(overlay);
    body.classList.add('door-transitioning');
    flightOverlay = overlay;

    // Let the browser paint the exact starting rectangle before the camera dolly begins.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!flightOverlay) return;
      overlay.classList.add('is-approaching');
      const scaleX = targetWidth / rect.width;
      const scaleY = targetHeight / rect.height;
      shell.style.transform = `translate3d(${targetLeft - rect.left}px, ${targetTop - rect.top}px, 0) scale(${scaleX}, ${scaleY})`;
    }));
    return { overlay, shell };
  };
  const revealSkillPage = () => {
    if (!detail || !stage) return;
    stage.classList.add('is-hidden');
    detail.hidden = false;
    requestAnimationFrame(() => {
      detail.classList.add('is-active');
      $('#detail-title')?.focus({ preventScroll: true });
      detail.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (flightOverlay) {
        flightOverlay.classList.add('is-exiting');
        later(removeFlightOverlay, 520);
      } else body.classList.remove('door-transitioning');
    });
  };
  const openSkill = key => {
    const data = skillData[key];
    const card = $('.skill-door[data-door="' + key + '"]');
    if (!data || !card || !detail || !stage || card.classList.contains('is-opening')) return;
    clearDoorTimers();
    if (activeDoor) resetDoors();
    activeDoor = key;
    const button = $('.door-button', card);
    button.disabled = true;
    button.setAttribute('aria-expanded', 'true');
    card.classList.add('is-opening');
    fillSkillDetail(data);

    if (reduceMotion) {
      card.classList.add('is-open');
      later(revealSkillPage, 0);
      return;
    }

    const flight = buildFlightOverlay(card, button);
    // Match stage timings to the compositor-friendly transition durations on compact screens.
    const compact = window.matchMedia('(max-width: 760px)').matches;
    const swingAt = compact ? 720 : 850;
    const enterAt = compact ? 1360 : 1570;
    const revealAt = compact ? 2380 : 2670;
    later(() => {
      flight.overlay.classList.add('is-door-open');
      card.classList.add('is-open');
    }, swingAt);
    later(() => flight.overlay.classList.add('is-entering'), enterAt);
    later(revealSkillPage, revealAt);
  };
  const buildReturnOverlay = card => {
    // Begin with a full-screen portal. As the camera retreats, it resolves into the
    // selected door; the door then swings shut to complete the reverse journey.
    const overlay = document.createElement('div');
    overlay.className = 'door-return-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const shell = document.createElement('div');
    shell.className = 'door-return-shell ' + Array.from(card.classList).filter(name => /^door-(blue|violet|green|amber)$/.test(name)).join(' ');
    shell.style.left = '0px';
    shell.style.top = '0px';
    shell.style.width = window.innerWidth + 'px';
    shell.style.height = window.innerHeight + 'px';
    const portal = document.createElement('div');
    portal.className = 'door-return-portal';
    const source = $('.door-arch', $('.door-button', card));
    const slab = source ? source.cloneNode(true) : document.createElement('div');
    slab.classList.add('door-return-door');
    slab.setAttribute('aria-hidden', 'true');
    slab.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    shell.append(portal, slab);
    overlay.appendChild(shell);
    body.appendChild(overlay);
    return { overlay, shell, portal, slab };
  };
  const closeSkill = ({ scrollToStage = true, focusDoor = true, animate = true } = {}) => {
    if (!detail || !stage || detail.hidden) return;
    clearDoorTimers();
    removeFlightOverlay();
    const previous = activeDoor;
    const card = previous ? $('.skill-door[data-door="' + previous + '"]') : null;
    const restore = card ? $('.door-button', card) : null;

    // Reduced-motion users and the Next Skill shortcut get a direct, accessible change.
    if (!animate || reduceMotion || !scrollToStage || !card) {
      detail.classList.remove('is-active');
      detail.hidden = true;
      stage.classList.remove('is-hidden');
      resetDoors();
      activeDoor = null;
      if (focusDoor) restore?.focus({ preventScroll: true });
      if (scrollToStage) stage.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      body.classList.remove('door-transitioning');
      return;
    }

    const flight = buildReturnOverlay(card);
    detail.classList.remove('is-active');
    detail.hidden = true;
    stage.classList.remove('is-hidden');
    stage.classList.add('is-returning');
    resetDoors();
    activeDoor = null;

    // Put the real door grid behind the overlay first, then measure its stable viewport position.
    stage.scrollIntoView({ behavior: 'instant', block: 'start' });
    body.classList.add('door-transitioning');
    const targetButton = restore;
    const target = targetButton.getBoundingClientRect();
    // Measure the button's stable box, not the hinged arch clone: the latter may still be
    // transitioning back from its open 3D angle and returns an inflated rotated rectangle.
    const targetRect = { left: target.left + 5, top: target.top, width: Math.max(40, target.width - 10), height: target.height };

    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!flight.overlay.isConnected) return;
      flight.overlay.classList.add('is-retreating');
      const scaleX = targetRect.width / window.innerWidth;
      const scaleY = targetRect.height / window.innerHeight;
      flight.shell.style.transform = `translate3d(${targetRect.left}px, ${targetRect.top}px, 0) scale(${scaleX}, ${scaleY})`;
    }));
    const compact = window.matchMedia('(max-width: 760px)').matches;
    const shutAt = compact ? 860 : 980;
    const fadeAt = compact ? 1580 : 1810;
    const removeAt = compact ? 1980 : 2240;
    later(() => flight.overlay.classList.add('is-shutting'), shutAt);
    later(() => flight.overlay.classList.add('is-exiting'), fadeAt);
    later(() => {
      flight.overlay.remove();
      stage.classList.remove('is-returning');
      body.classList.remove('door-transitioning');
      if (focusDoor) restore?.focus({ preventScroll: true });
    }, removeAt);
  };
  $$('.skill-door').forEach(card => $('.door-button', card)?.addEventListener('click', () => openSkill(card.dataset.door)));
  $('.back-to-doors')?.addEventListener('click', closeSkill);
  $('.detail-next')?.addEventListener('click', () => {
    const keys = Object.keys(skillData);
    const index = keys.indexOf(activeDoor);
    const nextKey = keys[(index + 1) % keys.length];
    closeSkill({ scrollToStage: false, focusDoor: false, animate: false });
    const nextButton = $('.skill-door[data-door="' + nextKey + '"] .door-button');
    nextButton?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    later(() => openSkill(nextKey), reduceMotion ? 0 : 430);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      if (detail && !detail.hidden) closeSkill();
    }
  });

  // Reliable back-to-top controls. The old #top target sat on a sticky header,
  // whose visual position never changes while scrolling, so anchor navigation could appear broken.
  const backToTop = $('#back-to-top');
  const footerBackToTop = $('.footer-back-to-top');
  let topButtonFrame = 0;
  const updateBackToTop = () => {
    topButtonFrame = 0;
    const visible = window.scrollY > Math.max(420, window.innerHeight * 0.55);
    backToTop?.classList.toggle('is-visible', visible);
    backToTop?.setAttribute('aria-hidden', String(!visible));
    if (backToTop) backToTop.tabIndex = visible ? 0 : -1;
  };
  const scheduleBackToTopUpdate = () => {
    if (topButtonFrame) return;
    topButtonFrame = window.requestAnimationFrame(updateBackToTop);
  };
  const scrollPageToTop = event => {
    // Blur the clicked control first; otherwise browsers may keep the footer button in view
    // and counteract the programmatic scroll by restoring focus visibility.
    event?.currentTarget?.blur();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  backToTop?.addEventListener('click', scrollPageToTop);
  footerBackToTop?.addEventListener('click', scrollPageToTop);
  window.addEventListener('scroll', scheduleBackToTopUpdate, { passive: true });
  window.addEventListener('pageshow', updateBackToTop);
  window.addEventListener('resize', scheduleBackToTopUpdate, { passive: true });
  updateBackToTop();

  // Contact dialog and copy actions.
  const modal = $('#contact-modal');
  const openModal = () => {
    if (modal?.showModal) modal.showModal();
    else window.location.href = 'mailto:asarnavsharma04@gmail.com?subject=Professional%20Opportunity';
  };
  $$('.js-contact-open').forEach(button => button.addEventListener('click', openModal));
  $('.modal-close')?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  modal?.addEventListener('close', () => $('.js-contact-open')?.focus({ preventScroll: true }));

  const email = 'asarnavsharma04@gmail.com';
  const copyText = async (statusEl) => {
    let copied = false;
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try { await navigator.clipboard.writeText(email); copied = true; } catch (_) { copied = false; }
    }
    if (!copied) {
      const input = document.createElement('textarea');
      input.value = email; input.setAttribute('readonly', '');
      input.style.position = 'fixed'; input.style.opacity = '0'; input.style.pointerEvents = 'none';
      document.body.appendChild(input); input.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      input.remove();
    }
    if (statusEl) statusEl.textContent = copied ? 'Email address copied.' : 'Please copy: ' + email;
  };
  $('#copy-email')?.addEventListener('click', () => copyText($('#copy-feedback')));
  $('#modal-copy')?.addEventListener('click', () => copyText($('#modal-status')));

  // Keep native pointer behaviour; decorative cursor tracking is intentionally omitted for leaner rendering.
})();

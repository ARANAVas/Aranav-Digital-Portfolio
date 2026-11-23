(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));


  // Short, accessible role rotation. It pauses in hidden tabs and respects reduced-motion settings.
  const loader = $('.preloader');
  if (loader) {
    body.classList.add('is-loading');
    const finishLoading = () => {
      loader.classList.add('is-done');
      body.classList.remove('is-loading');
    };
    if (document.readyState === 'complete') window.setTimeout(finishLoading, 160);
    else window.addEventListener('load', () => window.setTimeout(finishLoading, 160), { once: true });
    window.setTimeout(finishLoading, 850);
  }

  const roleText = $('#role-text');
  const roles = ['Brand & Content Strategy', 'Social Media Campaigns', 'SEO & Website Reviews', 'Paid Media Planning', 'Campaign Coordination', 'Creative Production'];
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
        scheduleRoleRotation(3200);
      }, 210);
    }, delay);
  };
  scheduleRoleRotation(2600);
  document.addEventListener('visibilitychange', () => {
    stopRoleRotation();
    if (!document.hidden) scheduleRoleRotation(450);
  });

  // Keep the signature logo's motion adaptive: load only near the viewport, pause off-screen,
  // and retain the supplied still poster on reduced-motion, data-saver and slow connections.
  const heroVideo = $('.hero-mark-video');
  if (heroVideo) {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    const slowConnection = Boolean(navigator.connection && /^(slow-2g|2g)$/.test(navigator.connection.effectiveType || ''));
    const sources = Array.from(heroVideo.querySelectorAll('source[data-src]'));
    let mediaLoaded = false;
    let mediaVisible = false;
    const pauseHeroVideo = () => { try { heroVideo.pause(); } catch (_) {} };
    const loadHeroVideo = () => {
      if (mediaLoaded || motionPreference.matches || saveData || slowConnection) return;
      sources.forEach(source => { source.src = source.dataset.src; source.removeAttribute('data-src'); });
      mediaLoaded = true;
      heroVideo.load();
    };
    const playHeroVideo = () => {
      if (!mediaVisible || document.hidden || motionPreference.matches || saveData || slowConnection) { pauseHeroVideo(); return; }
      loadHeroVideo();
      if (!mediaLoaded) return;
      const attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };
    if (motionPreference.matches || saveData || slowConnection || !('IntersectionObserver' in window)) {
      pauseHeroVideo();
      heroVideo.removeAttribute('autoplay');
    } else {
      const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          mediaVisible = entry.isIntersecting && entry.intersectionRatio >= .12;
          if (mediaVisible) playHeroVideo(); else pauseHeroVideo();
        });
      }, { threshold: [0, .12, .35] });
      videoObserver.observe(heroVideo);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseHeroVideo();
      else if (mediaVisible) playHeroVideo();
    });
    window.addEventListener('pagehide', pauseHeroVideo, { passive: true });
    window.addEventListener('pageshow', () => { if (mediaVisible && !document.hidden) playHeroVideo(); });
    if (typeof motionPreference.addEventListener === 'function') {
      motionPreference.addEventListener('change', event => {
        if (event.matches) { pauseHeroVideo(); heroVideo.removeAttribute('autoplay'); }
        else if (mediaVisible) playHeroVideo();
      });
    }
  }



  // Single hairline reading progress; one paint per scroll burst.
  const progress = document.createElement('div');
  progress.className = 'v14-progress';
  progress.setAttribute('aria-hidden', 'true');
  const progressFill = document.createElement('span');
  progress.appendChild(progressFill);
  document.body.appendChild(progress);
  let progressFrame = 0;
  const paintProgress = () => {
    progressFrame = 0;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const position = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    progressFill.style.transform = 'scaleX(' + position + ')';
  };
  const scheduleProgress = () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(paintProgress);
  };
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  window.addEventListener('pageshow', paintProgress);
  paintProgress();

  // Current year.
  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme switch with guarded persistence.
  const themeButton = $('.theme-toggle');
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('aranav-portfolio-theme') || 'dark'; } catch (_) { /* Storage can be disabled. */ }
  const setTheme = theme => {
    const value = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = value;
    themeButton?.setAttribute('aria-pressed', String(value === 'light'));
    if (themeButton) {
      themeButton.querySelector('span').textContent = value === 'dark' ? '☾' : '☼';
      const nextThemeLabel = value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      themeButton.setAttribute('aria-label', nextThemeLabel);
      themeButton.setAttribute('title', nextThemeLabel);
    }
    const meta = $('meta[name="theme-color"]');
    meta?.setAttribute('content', value === 'dark' ? '#11110f' : '#f3efe7');
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
      intro: 'My work starts with the brief: who needs to hear the message, what they should take away and which channel makes sense. I plan social content and campaigns, and I’m building hands-on knowledge of Meta and Google Ads.',
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
      intro: 'I review website content and basic technical signals to make pages easier to find and use. That includes keyword research, page titles, descriptions, headings, mobile checks and practical recommendations.',
      tags: ['SEO Fundamentals', 'Keyword Research', 'Search Intent', 'Metadata Review', 'On-page SEO', 'Website QA'],
      bullets: ['Research keywords and connect them with relevant page topics and search intent.', 'Review title tags, meta descriptions, headings and page content.', 'Check indexability signals and identify technical issues such as unintended noindex directives.', 'Review website usability, mobile layout, links and visible content.', 'Document findings and turn them into prioritised improvement recommendations.'],
      tools: 'Search research · Meta tag checkers · Browser QA · Google Search fundamentals · Website content review',
      quote: 'Visibility begins with relevance. A useful page should answer a real question, clearly.'
    },
    ai: {
      number: '03 / 04', kicker: 'SKILL AREA / APPLIED AI & GENERATIVE AI', title: 'Generative AI & Creative Workflows', symbol: '✧',
      intro: 'I use tools such as ChatGPT, Gemini and Veo to support research, outlines, scripts and creative concepts. I write detailed prompts, compare the results and edit them before anything is used. The final decision stays with me.',
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
      quote: 'AI can help with a first draft. Good judgement, careful editing and fact-checking still make the work ready.'
    },
    operations: {
      number: '04 / 04', kicker: 'SKILL AREA / DATA & DIGITAL OPERATIONS', title: 'Data & Operations', symbol: '▤',
      intro: 'I like keeping the details in order. That means accurate data entry, clear documents, up-to-date spreadsheets and timely follow-ups.',
      tags: ['Advanced Data Entry', 'Data Accuracy', 'Data Management', 'MS Word', 'Microsoft Excel', 'Reporting', 'Team Coordination'],
      bullets: ['Enter, organise and validate information with attention to detail.', 'Maintain spreadsheets, digital records, documents and file structures.', 'Prepare clear summaries, progress updates and routine reports.', 'Handle email communication, internet research and document processing.', 'Coordinate tasks, follow up on deliverables and communicate blockers early.', 'Use checklists and simple workflows to reduce missed steps.'],
      tools: 'Microsoft Word · Microsoft Excel · Email · Online research · Documentation · File management · Task trackers',
      quote: 'Reliable work is often built on the small details people do not notice — until they go wrong.'
    }
  };

  // Four physical doors: finish the hinge movement before revealing the selected skill.
  const stage = $('#doors-stage');
  const detail = $('#skill-detail');
  let activeDoor = null;
  let doorTransitionBusy = false;
  let doorTimers = [];
  let closeTimer = 0;
  const detailEls = {
    counter: $('#detail-counter'), kicker: $('#detail-kicker'), title: $('#detail-title'), intro: $('#detail-intro'),
    tags: $('#detail-tags'), list: $('#detail-list'), tools: $('#detail-tools'), quote: $('#detail-quote'), symbol: $('#detail-symbol')
  };
  const clearDoorTimers = () => {
    doorTimers.forEach(window.clearTimeout);
    doorTimers = [];
    window.clearTimeout(closeTimer);
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
          const top = document.createElement('div'); top.className = 'platform-card-top';
          const title = document.createElement('h5'); title.textContent = platform.name;
          const descriptor = document.createElement('span'); descriptor.textContent = platform.descriptor;
          top.append(title, descriptor);
          const summary = document.createElement('p'); summary.textContent = platform.summary;
          const list = document.createElement('ul');
          platform.points.forEach(point => { const li = document.createElement('li'); li.textContent = point; list.appendChild(li); });
          card.append(top, summary, list); grid.appendChild(card);
        });
        platformWrap.appendChild(grid); platformWrap.hidden = false;
      } else platformWrap.hidden = true;
    }
    detailEls.quote.textContent = '“' + data.quote + '”';
    detailEls.symbol.textContent = data.symbol;
  };
  const setDoorButtonState = (card, expanded, disabled = false) => {
    const button = card && $('.door-button', card);
    if (!button) return;
    button.disabled = disabled;
    button.setAttribute('aria-expanded', String(expanded));
  };
  const revealSkillPage = () => {
    if (!detail || !stage) return;
    doorTransitionBusy = false;
    stage.classList.add('is-hidden');
    detail.hidden = false;
    detail.classList.remove('is-closing');
    requestAnimationFrame(() => {
      detail.classList.add('is-active');
      detail.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => $('#detail-title')?.focus({ preventScroll: true }), reduceMotion ? 0 : 240);
    });
  };
  const openSkill = key => {
    const data = skillData[key];
    const card = $('.skill-door[data-door="' + key + '"]');
    if (!data || !card || !detail || !stage || activeDoor || doorTransitionBusy) return;
    clearDoorTimers();
    doorTransitionBusy = true;
    activeDoor = key;
    setDoorButtonState(card, true, true);
    card.classList.remove('is-closing');
    card.classList.add('is-opening', 'is-open');
    fillSkillDetail(data);
    const compact = window.matchMedia('(max-width: 760px)').matches;
    // Let the physical panel complete most of its swing before the detail card appears.
    const openDelay = reduceMotion ? 0 : (compact ? 850 : 960);
    later(revealSkillPage, openDelay);
  };
  const closeSkill = ({ scrollToStage = true, focusDoor = true, nextKey = null } = {}) => {
    if (!detail || !stage || detail.hidden || doorTransitionBusy) return;
    clearDoorTimers();
    doorTransitionBusy = true;
    const previous = activeDoor;
    const card = previous ? $('.skill-door[data-door="' + previous + '"]') : null;
    detail.classList.remove('is-active');
    detail.classList.add('is-closing');
    activeDoor = null;
    const compact = window.matchMedia('(max-width: 760px)').matches;
    const detailExitDelay = reduceMotion ? 0 : 220;
    closeTimer = window.setTimeout(() => {
      detail.hidden = true;
      detail.classList.remove('is-closing');
      stage.classList.remove('is-hidden');
      if (card) {
        setDoorButtonState(card, true, false);
        // The stage returns with the panel open; remove the open class on the next frame
        // to let the same hinge animation visibly close the door.
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-opening')));
      }
      if (scrollToStage) stage.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (nextKey) {
        later(() => { doorTransitionBusy = false; openSkill(nextKey); }, reduceMotion ? 0 : (compact ? 920 : 1040));
      } else {
        later(() => {
          if (card) card.classList.remove('is-opening', 'is-open');
          if (card) setDoorButtonState(card, false, false);
          if (focusDoor && card) $('.door-button', card)?.focus({ preventScroll: true });
          doorTransitionBusy = false;
        }, reduceMotion ? 0 : (compact ? 900 : 1000));
      }
    }, detailExitDelay);
  };
  $$('.skill-door').forEach(card => $('.door-button', card)?.addEventListener('click', () => openSkill(card.dataset.door)));
  $('.back-to-doors')?.addEventListener('click', () => closeSkill());
  $('.detail-next')?.addEventListener('click', () => {
    const keys = Object.keys(skillData);
    const index = keys.indexOf(activeDoor);
    const nextKey = keys[(index + 1) % keys.length];
    closeSkill({ scrollToStage: false, focusDoor: false, nextKey });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      if (activeDoor && detail?.hidden) {
        clearDoorTimers();
        const card = $('.skill-door[data-door="' + activeDoor + '"]');
        activeDoor = null;
        doorTransitionBusy = false;
        if (card) {
          setDoorButtonState(card, false, false);
          requestAnimationFrame(() => card.classList.remove('is-opening', 'is-open'));
          $('.door-button', card)?.focus({ preventScroll: true });
        }
      } else if (detail && !detail.hidden) closeSkill();
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
  let lastModalTrigger = null;
  const openModal = event => {
    lastModalTrigger = event?.currentTarget || null;
    if (modal?.showModal) modal.showModal();
    else window.location.href = 'mailto:aranavprime@gmail.com?subject=Professional%20Opportunity';
  };
  $$('.js-contact-open').forEach(button => button.addEventListener('click', openModal));
  $('.modal-close')?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  modal?.addEventListener('close', () => (lastModalTrigger || $('.js-contact-open'))?.focus({ preventScroll: true }));

  const email = 'aranavprime@gmail.com';
  const copyText = async (statusEl) => {
    let copied = false;
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try { await navigator.clipboard.writeText(email); copied = true; } catch (_) { copied = false; }
    }
    if (!copied) {
      const input = document.createElement('textarea');
      input.value = email; input.setAttribute('readonly', '');
      input.className = 'clipboard-fallback';
      document.body.appendChild(input); input.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      input.remove();
    }
    if (statusEl) statusEl.textContent = copied ? 'Email address copied.' : 'Please copy: ' + email;
  };
  $('#copy-email')?.addEventListener('click', () => copyText($('#copy-feedback')));
  $('#modal-copy')?.addEventListener('click', () => copyText($('#message-status')));

  // Static-site contact composer: it creates an email draft locally; it does not transmit or store form data.
  const messageForm = $('#contact-message-form');
  const messageStatus = $('#message-status');
  messageForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!messageForm.reportValidity()) return;
    const name = $('#contact-name')?.value.trim() || '';
    const sender = $('#contact-email')?.value.trim() || '';
    const message = $('#contact-message')?.value.trim() || '';
    const topic = $('#contact-topic')?.value || 'General conversation';
    if (name.length > 80 || sender.length > 254 || message.length < 10 || message.length > 3000) {
      if (messageStatus) messageStatus.textContent = 'Please check the fields and keep your message between 10 and 3,000 characters.';
      return;
    }
    const subject = topic + ' — portfolio enquiry from ' + name;
    const bodyText = 'Hello Aranav,\n\nTopic: ' + topic + '\n\n' + message + '\n\n— ' + name + '\nReply to: ' + sender;
    const mailto = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
    if (messageStatus) messageStatus.textContent = 'Your email app should open with the draft. Review it there and press Send when you are ready.';
    window.location.href = mailto;
  });

  // Keep native pointer behaviour; decorative cursor tracking is intentionally omitted for leaner rendering.
})();

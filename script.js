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
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('aranav-portfolio-theme') || 'dark'; } catch (_) { /* Storage can be disabled. */ }
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

  // Door opens on its hinge, then transitions into the corresponding full skill page.
  const stage = $('#doors-stage');
  const detail = $('#skill-detail');
  let activeDoor = null;
  let doorTimer = 0;
  const detailEls = {
    counter: $('#detail-counter'), kicker: $('#detail-kicker'), title: $('#detail-title'), intro: $('#detail-intro'),
    tags: $('#detail-tags'), list: $('#detail-list'), tools: $('#detail-tools'), quote: $('#detail-quote'), symbol: $('#detail-symbol')
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
  const openSkill = key => {
    const data = skillData[key];
    const card = $('.skill-door[data-door="' + key + '"]');
    if (!data || !card || !detail || !stage) return;
    window.clearTimeout(doorTimer);
    if (activeDoor) resetDoors();
    activeDoor = key;
    const button = $('.door-button', card);
    button.disabled = true;
    button.setAttribute('aria-expanded', 'true');
    card.classList.add('is-opening');
    fillSkillDetail(data);
    doorTimer = window.setTimeout(() => {
      stage.classList.add('is-hidden');
      detail.hidden = false;
      requestAnimationFrame(() => {
        detail.classList.add('is-active');
        $('#detail-title')?.focus({ preventScroll: true });
        detail.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    }, reduceMotion ? 0 : 1050);
  };
  const closeSkill = () => {
    if (!detail || !stage) return;
    window.clearTimeout(doorTimer);
    detail.classList.remove('is-active');
    detail.hidden = true;
    stage.classList.remove('is-hidden');
    resetDoors();
    const previous = activeDoor;
    activeDoor = null;
    const restore = previous ? $('.skill-door[data-door="' + previous + '"] .door-button') : null;
    restore?.focus({ preventScroll: true });
  };
  $$('.skill-door').forEach(card => $('.door-button', card)?.addEventListener('click', () => openSkill(card.dataset.door)));
  $('.back-to-doors')?.addEventListener('click', closeSkill);
  $('.detail-next')?.addEventListener('click', () => {
    const keys = Object.keys(skillData);
    const index = keys.indexOf(activeDoor);
    const nextKey = keys[(index + 1) % keys.length];
    activeDoor = null;
    closeSkill();
    const nextButton = $('.skill-door[data-door="' + nextKey + '"] .door-button');
    nextButton?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(() => openSkill(nextKey), reduceMotion ? 0 : 400);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && detail && !detail.hidden) closeSkill();
  });

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

(() => {
  'use strict';
  const root = document.documentElement;
  let theme = 'dark';
  try { theme = localStorage.getItem('aranav-portfolio-theme') === 'light' ? 'light' : 'dark'; }
  catch (_) { theme = 'dark'; }
  root.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === 'light' ? '#f3efe7' : '#11110f';
})();

// theme-switcher.js
// Handles dark/light mode switching and persistence

document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-toggle-icon');
  const root = document.documentElement;

  // Set default theme to dark if not set
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }

  function setTheme(mode) {
    if (mode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      themeIcon.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  setTheme(localStorage.getItem('theme'));

  themeToggle.addEventListener('click', function () {
    const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', current);
    setTheme(current);
    // Add wobble animation on click
    themeToggle.classList.remove('wobble'); // reset if already animating
    void themeToggle.offsetWidth; // force reflow
    themeToggle.classList.add('wobble');
  });
  // Remove wobble class after animation ends so it can be re-triggered
  themeToggle.addEventListener('animationend', function(e) {
    if (e.animationName === 'wobble') {
      themeToggle.classList.remove('wobble');
    }
  });
});

/**
 * Dark/Light Theme Toggle for WeirdDev site
 * Persists user preference in localStorage.
 * Default theme is "dark" (set in _config.yml).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wd-theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) ||
      document.documentElement.getAttribute('data-theme') ||
      DARK;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
    // Update meta theme-color for mobile browsers
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === DARK ? '#252a34' : '#ffffff');
    }
  }

  function updateToggleIcon(theme) {
    var darkIcon = toggle.querySelector('.theme-toggle__icon--dark');
    var lightIcon = toggle.querySelector('.theme-toggle__icon--light');
    if (darkIcon && lightIcon) {
      // Show sun when in dark mode (clicking switches to light)
      // Show moon when in light mode (clicking switches to dark)
      darkIcon.style.display = theme === LIGHT ? 'inline-block' : 'none';
      lightIcon.style.display = theme === DARK ? 'inline-block' : 'none';
    }
  }

  toggle.addEventListener('click', function () {
    var current = getTheme();
    setTheme(current === DARK ? LIGHT : DARK);
  });

  // Initialize icon state
  updateToggleIcon(getTheme());
})();


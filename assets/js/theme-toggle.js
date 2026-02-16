/* theme-toggle.js — Dark/light mode toggle with localStorage persistence */
(function () {
  var stored = localStorage.getItem('theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }

  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute('data-theme');
    var isDark;

    if (current === 'dark') {
      isDark = false;
    } else if (current === 'light') {
      isDark = true;
    } else {
      // No manual preference set — detect current OS preference
      isDark = !window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    var next = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
  };

  function updateToggleIcon(theme) {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var isDark = theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    btn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Initialize icon once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateToggleIcon(localStorage.getItem('theme'));
    });
  } else {
    updateToggleIcon(localStorage.getItem('theme'));
  }
})();

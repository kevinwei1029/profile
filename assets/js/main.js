/* ============================================================
   main.js — 全站共用腳本
   ============================================================ */

// ── 自動填入年份 ──
(function setYear() {
  var el = document.getElementById('y');
  if (el) el.textContent = new Date().getFullYear();
})();

// ── 透過 GitHub API 獲取倉庫最後更新時間 ──
(function fetchLastUpdate() {
  var el = document.getElementById('lastUpdateDate');
  if (!el) return;

  fetch('https://api.github.com/repos/kevinwei1029/kevinwei1029.github.io')
    .then(function (response) { return response.json(); })
    .then(function (data) {
      var d = new Date(data.updated_at);
      el.textContent =
        d.getFullYear() + '.' +
        String(d.getMonth() + 1).padStart(2, '0') + '.' +
        String(d.getDate()).padStart(2, '0');
    })
    .catch(function () {
      el.textContent = '最後更新時間暫時無法取得';
    });
})();

// ── 主題切換 ──
(function initTheme() {
  var ICONS = { dark: 'bi-sun', light: 'bi-moon-stars' };
  var current = localStorage.getItem('theme') || 'dark';

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = '<i class="bi ' + ICONS[theme] + '"></i>';
    current = theme;
  }

  apply(current);

  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      apply(next);
    });
  }
})();

// ── Navbar 捲動行為 ──
(function initNav() {
  var nav    = document.querySelector('.site-nav');
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;

  var THRESHOLD = 80;

  window.addEventListener('scroll', function () {
    if (window.scrollY > THRESHOLD) {
      if (nav) nav.classList.add('nav-hidden');
      toggle.classList.add('nav-visible');
    } else {
      if (nav) nav.classList.remove('nav-hidden');
      toggle.classList.remove('nav-visible');
      drawer.classList.remove('nav-open');
    }
  }, { passive: true });

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    drawer.classList.toggle('nav-open');
  });

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('nav-open');
    }
  });
})();


// ── Day / Night toggle ──────────────────────────────────────────────────────
const root   = document.documentElement;
const toggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
}

// Apply saved preference immediately (no flash)
applyTheme(localStorage.getItem('tpg-theme') || 'dark');

if (toggle) {
  toggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('tpg-theme', isLight ? 'light' : 'dark');
  });
}

// ── Coin flip (index.html only) ──────────────────────────────────────────────
const coin = document.getElementById('coin');
if (coin) {
  let flipped = false;

  coin.addEventListener('click', () => {
    flipped = !flipped;
    coin.classList.toggle('flipped', flipped);
  });

  coin.addEventListener('dblclick', () => {
    window.location.href = flipped ? 'index.html#mission' : 'high-tech.html';
  });
}

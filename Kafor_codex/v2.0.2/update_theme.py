import re
import sys

html_path = r"C:\Users\toto\Desktop\MECHHAPIZZAI\RAP\v1.0.24\createurs.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS rules
css_theme = """
    /* ══ BOUTON THÈME ═════════════════════════════════════════ */
    .theme-toggle {
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border-radius: 50%;
      border: 1px solid rgba(234,226,212,0.18);
      background: rgba(234,226,212,0.06); cursor: pointer;
      color: rgba(234,226,212,0.55);
      transition: border-color 250ms, background 250ms, color 250ms, transform 350ms cubic-bezier(0.34,1.4,0.64,1);
      flex-shrink: 0;
    }
    .theme-toggle:hover { border-color: #B08D57; color: #B08D57; transform: rotate(20deg); }
    .theme-toggle .icon-sun  { display: none; }
    .theme-toggle .icon-moon { display: block; }

    /* ══ THÈME FONCÉ (Par défaut sur index, reproduit ici) ════ */
    body:not(.light-theme) {
      background: #0A0A0A;
      color: #EAE2D4;
    }
    body:not(.light-theme) .search-strip,
    body:not(.light-theme) .filter-strip,
    body:not(.light-theme) .no-results {
      background: #0A0A0A;
      border-color: #1c1c1c;
    }
    body:not(.light-theme) .search-wrap {
      background: #111; border-color: #1c1c1c;
    }
    body:not(.light-theme) .search-wrap input { color: #EAE2D4; }
    body:not(.light-theme) .filter-btn {
      color: #8C8478; border-color: #1c1c1c;
    }
    body:not(.light-theme) .filter-btn:hover,
    body:not(.light-theme) .filter-btn.on {
      background: #EAE2D4; color: #0A0A0A; border-color: #EAE2D4;
    }
    body:not(.light-theme) .filter-sep { background: #1c1c1c; }

    /* ══ THÈME CLAIR ═════════════════════════════════════════ */
    body.light-theme .theme-toggle {
      border-color: rgba(10,10,10,0.18); background: rgba(10,10,10,0.05); color: rgba(10,10,10,0.55);
    }
    body.light-theme .theme-toggle .icon-sun  { display: block; }
    body.light-theme .theme-toggle .icon-moon { display: none; }
"""

# Inject CSS before closing style tag
if "/* ══ BOUTON THÈME" not in content:
    content = content.replace("</style>", css_theme + "\n  </style>")

# 2. Add Toggle Button in navbar
button_html = """
      <!-- Toggle thème clair / sombre -->
      <button class="theme-toggle" id="themeToggle" aria-label="Changer le thème" onclick="toggleTheme()" style="margin-right: 12px;">
        <!-- Lune (mode sombre actif) -->
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <!-- Soleil (mode clair actif) -->
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>"""

if "id=\"themeToggle\"" not in content:
    content = content.replace('<div class="nav-right">', f'<div class="nav-right">{button_html}')

# 3. Add JS
js_logic = """
    // ── Toggle thème clair / sombre ──
    function toggleTheme() {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('kafora-theme', isLight ? 'light' : 'dark');
    }
    // Restaure la préférence au chargement
    if (localStorage.getItem('kafora-theme') === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
"""

if "toggleTheme()" not in content and "function toggleTheme" not in content:
    content = content.replace('<script>', f'<script>{js_logic}')


with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Theme toggle added!")

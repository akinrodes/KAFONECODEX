import re
import sys

html_path = r"C:\Users\toto\Desktop\MECHHAPIZZAI\RAP\v1.0.24\createurs.html"

try:
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    css_to_add = """
    /* ── CREATOR GRID ── */
    .grid-wrap { padding: 52px 48px 80px; }
    .grid-head {
      display: flex; justify-content: space-between;
      align-items: baseline; margin-bottom: 36px;
    }
    .creators-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
    .grid-item { background: transparent; }
    .grid-item[hidden] { display: none; }

    /* ── PASS CARD STYLES (imported from index.html) ── */
    .pass-card {
      width: 100%;
      background: #EDE5D3;
      border: 1px solid rgba(234,226,212,0.20);
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 18px 52px rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.08); /* light-theme index shadow */
      transition: transform 700ms cubic-bezier(0.34,1.25,0.64,1), box-shadow 350ms ease, opacity 450ms ease;
    }
    .pass-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 48px 96px rgba(0,0,0,0.60);
    }
    .pass-card-header {
      padding: 10px 14px 9px;
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid rgba(10,10,10,0.10);
      background: rgba(176,141,87,0.10);
    }
    .pass-card-brand {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 9px; font-weight: 700; letter-spacing: 0.30em;
      text-transform: uppercase; color: #0A0A0A;
    }
    .pass-card-num {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 9px; font-weight: 300; letter-spacing: 0.14em; color: #8C8478;
    }
    .pass-card-photo {
      width: 100%; height: 300px; overflow: hidden; background: #100e0a;
    }
    .pass-card-photo img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: center top;
      display: block; transition: transform 800ms cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .pass-card:hover .pass-card-photo img { transform: scale(1.06); }
    .pass-card-info { padding: 12px 14px 8px; }
    .pass-card-creator-name {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 15px; letter-spacing: 0.06em;
      text-transform: uppercase; color: #0A0A0A; line-height: 1.1;
    }
    .pass-card-discipline {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 10px; font-weight: 300; letter-spacing: 0.16em;
      color: #6b5e4a; margin-top: 4px;
    }
    .pass-card-footer {
      padding: 9px 14px 12px;
      display: flex; align-items: center; justify-content: space-between;
      border-top: 1px solid rgba(10,10,10,0.08);
    }
    .pass-barcode { display: flex; gap: 1.5px; align-items: flex-end; height: 20px; }
    .pass-barcode b { display: block; width: 1.5px; background: rgba(10,10,10,0.55); }
    .pass-card-tag {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 8px; font-weight: 400; letter-spacing: 0.22em;
      text-transform: uppercase; color: #B08D57;
      border: 1px solid #B08D57; padding: 3px 7px; border-radius: 2px;
    }
    @media (max-width: 1100px) {
      .creators-grid { grid-template-columns: repeat(2,1fr); }
    }
    @media (max-width: 768px) {
      .creators-grid { grid-template-columns: repeat(1,1fr); }
    }
"""

    # remove old .creators-grid to .c-card styles
    start_str = "/* ── CREATOR GRID ── */"
    end_str = "/* ── NO RESULTS ── */"
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str)
        content = content[:start_idx] + css_to_add + "\n    " + content[end_idx:]

    # Replace old .c-card HTML mapping
    def replacer(m):
        url = m.group(1)
        name = m.group(2)
        disc = m.group(3).strip()
        city = m.group(4).strip()
        link = m.group(5)
        
        barcode = '<div class="pass-barcode"><b style="height:100%"></b><b style="height:60%"></b><b style="height:100%"></b><b style="height:40%"></b><b style="height:80%"></b><b style="height:100%"></b><b style="height:55%"></b><b style="height:75%"></b><b style="height:100%"></b><b style="height:45%"></b><b style="height:90%"></b><b style="height:65%"></b><b style="height:100%"></b><b style="height:50%"></b><b style="height:80%"></b><b style="height:100%"></b><b style="height:35%"></b><b style="height:70%"></b><b style="height:100%"></b><b style="height:60%"></b></div>'
        
        tag_html = '<span class="pass-card-tag">Verified</span>'
        
        return f'''<div class="pass-card" onclick="window.location.href='{link}'">
          <div class="pass-card-header">
            <span class="pass-card-brand">Kafora Pass</span>
            <span class="pass-card-num">CP / 25</span>
          </div>
          <div class="pass-card-photo">
            <img src="{url}" alt="{name}" />
          </div>
          <div class="pass-card-info">
            <div class="pass-card-creator-name">{name}</div>
            <div class="pass-card-discipline">{disc} · {city}</div>
          </div>
          <div class="pass-card-footer">
            {barcode}
            {tag_html}
          </div>
        </div>'''
        
    regex_pattern = r'<div class="c-card">\s*<div class="c-card-img"><img src="([^"]+)" alt="" /></div>\s*<div class="c-card-info">\s*<div class="c-card-name">([^<]+)</div>\s*<div class="c-card-city">([^·]+)·([^<]+)</div>\s*<a href="([^"]+)" class="c-card-link">[^<]+</a>\s*</div>\s*</div>'
    content = re.sub(regex_pattern, replacer, content)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully updated createurs.html")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

"""Install the approved product film, safe to run after every source capture."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
page=root/'public/products/nourishing-natural-face-oil/index.html'
video=root/'public/video/nourishing-face-oil-ritual.mp4'
poster=root/'public/video/nourishing-face-oil-ritual.jpg'
if not video.exists() or not poster.exists():
    raise SystemExit('Approved film and poster must exist before publishing the section.')
markup='''
<section id="pasaj-product-film" class="product-film" aria-label="Nourishing Natural Face Oil application film">
  <video data-product-film loop muted playsinline preload="metadata" poster="/video/nourishing-face-oil-ritual.jpg" aria-label="A seated model opens the PASAJ bottle, applies oil with its pipette, closes the bottle, massages her hands and rests them on the table.">
    <source src="/video/nourishing-face-oil-ritual.mp4" type="video/mp4">
    Your browser does not support this video.
  </video>
  <button type="button" data-film-toggle aria-label="Play film" hidden>Play film</button>
  <p data-film-status role="status" aria-live="polite" hidden></p>
</section>
'''
s=page.read_text()
s=re.sub(r'\n?<section id="pasaj-product-film".*?</section>\n?', '', s, flags=re.S)
s=s.replace('</main>',markup+'</main>',1)
for tag in ['<link rel="stylesheet" href="/product-film.css">','<script src="/product-film.js" defer></script>']:
 if tag not in s:s=s.replace('</head>',tag+'</head>',1)
page.write_text(s)
print('Installed product film beneath product details.')

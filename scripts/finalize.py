"""Apply preview-only adaptations to captured Shopify markup."""
from pathlib import Path
import json,re,html
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'docs/asset-manifest.json').read_text())
missing={m['assets'][x['url']]:x['url'] for x in m['failures']}
for p in (root/'public').rglob('*.html'):
 s=p.read_text()
 for local,source in missing.items():
  def placeholder(match):
   tag=match[0]
   if local not in tag:return tag
   alt=re.search(r'alt=[\"\']([^\"\']*)',tag)
   label=html.escape(alt[1] if alt else 'Archive image')
   return '<span class="source-image-unavailable" role="img" aria-label="'+label+' — image unavailable on original website">'+label+'</span>'
  s=re.sub(r'<img\b[^>]*>',placeholder,s)
  s=s.replace(local,source)
 s=re.sub(r'<shopify-account\b[^>]*>(.*?)</shopify-account>',r'<a href="https://www.pasajstudio.com/account" class="header__icon header__icon--account link focus-inset" aria-label="Log in on PASAJ">\1</a>',s,flags=re.S)
 s=s.replace('http:/assets/','/assets/')
 # Only retained theme scripts run; replace server-driven facets and pickup scripts locally.
 s=re.sub(r'<script[^>]+src="[^"]*(?:facets|pickup-availability|quick-add)\.js"[^>]*></script>','',s)
 # Snapshot site does not have a Shopify app runtime: use a truthful newsletter form handoff.
 s=re.sub(r"<div\s+id='[^']*'\s+data-form-root='true'[^>]*></div>",'<div class="replica-newsletter"><form action="/contact" method="post"><div class="replica-names"><label>First name<input name="contact[first_name]" autocomplete="given-name" required></label><label>Last name<input name="contact[last_name]" autocomplete="family-name" required></label></div><label>Email<input name="contact[email]" type="email" autocomplete="email" required></label><button class="replica-button" type="submit">Join</button><p>By signing up, you agree to receive marketing emails. View our <a href="/policies/privacy-policy">privacy policy</a>.</p></form></div>',s)
 # Newsletter signup is a handoff, never an external form submission from the preview.
 if '/enhancements.js' not in s: s=s.replace('</head>','<script src="/enhancements.js" defer></script></head>')
 p.write_text(s)
r=json.loads((root/'docs/capture-report.json').read_text())
r['source_unavailable']=m['failures'];r['failures']=[]
(root/'docs/capture-report.json').write_text(json.dumps(r,indent=2))
(root/'public/robots.txt').write_text('User-agent: *\nDisallow: /\n')

# Preserve the owner-requested approved film on a fresh source capture.
if (root/"public/video/nourishing-face-oil-ritual.mp4").exists():
 import runpy
 runpy.run_path(str(root/"scripts/add-product-film.py"))

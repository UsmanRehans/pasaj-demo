"""Capture the public PASAJ storefront for a self-contained Vercel preview.
Run explicitly to refresh; deployment never scrapes the source.
"""
import concurrent.futures as futures
import hashlib, html, json, re, time, urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlsplit
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'
CACHE=ROOT/'.capture'
CACHE.mkdir(exist_ok=True)
ORIGIN='https://www.pasajstudio.com'
HEADERS={'User-Agent':'Mozilla/5.0 PASAJ-preview-capture'}
assetmap={}
failures=[]
def fetch(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers=HEADERS),timeout=50) as r:return r.read()
        except Exception:
            if attempt==2: raise
            time.sleep(attempt+1)
def get_page(route):
    path=route['path']
    cache=CACHE/(hashlib.sha256(path.encode()).hexdigest()[:16]+'.html')
    if not cache.exists():cache.write_bytes(fetch(ORIGIN+path))
    return path,cache.read_text()
def script_filter(m):
    s=m.group()
    src=re.search(r'\bsrc=[\"\']([^\"\']+)',s)
    if src:
        u=src.group(1)
        if '/cdn/shop/t/' in u and not any('/'+n in u for n in ['cart.js','cart-drawer.js','cart-notification.js','predictive-search.js','product-form.js','localization-form.js','standard-actions-override.js']):return s
        return ''
    if 'application/ld+json' in s or 'application/json' in s:
        return s if not any(x in s for x in ['shopify-features','apple-pay','shop-js','shopify-chat','core-uppromote']) else ''
    if any(x in s for x in ['window.shopUrl','document.documentElement.className','customElements.define','class StickyHeader','class SlideshowComponent']):return s
    return ''
ASSET=re.compile(r'(?:https?:)?//(?:www\.pasajstudio\.com|cdn\.shopify\.com)/[^\s\"\'<>\\)]+|/cdn/[^\s\"\'<>\\)]+')
def canonical_asset(raw):
    u=html.unescape(raw).rstrip(';')
    u=('https:'+u) if u.startswith('//') else urljoin(ORIGIN,u)
    if '/cdn/' not in u and 'cdn.shopify.com' not in u:return None
    if not re.search(r'\.(?:css|js|png|jpe?g|webp|gif|svg|woff2?|ttf|mp4|avif)(?:\?|$)',u,re.I):return None
    # Preserve each responsive width so browser srcset selection stays exact.
    return u

def register(raw):
    u=canonical_asset(raw)
    if not u:return raw
    if u not in assetmap:
        p=urlsplit(u).path
        name=re.sub(r'[^\w.\-]','_',p.rsplit('/',1)[-1])
        assetmap[u]='/assets/'+hashlib.sha256(u.encode()).hexdigest()[:12]+'-'+name
    return assetmap[u]
def clean_page(text):
    text=re.sub(r'<script\b[^>]*>.*?</script>',script_filter,text,flags=re.S|re.I)
    text=re.sub(r'<link\b[^>]*rel=[\"\'](?:preconnect|dns-prefetch|modulepreload)[\"\'][^>]*>','',text,flags=re.I)
    text=text.replace('https://www.pasajstudio.com','').replace('//www.pasajstudio.com','')
    text=ASSET.sub(lambda m:register(m.group()),text)
    text=text.replace("window.shopUrl = '';",'window.shopUrl = window.location.origin;')
    text=text.replace('</head>','<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="/replica.css"><script>window.Shopify={designMode:false,shop:"pasaj-perfume.myshopify.com",routes:{root:"/"},currency:{active:"USD",rate:"1.0"}};</script><script src="/replica.js" defer></script></head>')
    # Keep remote service links explicit rather than exposing nonfunctional local endpoints.
    text=re.sub(r'href=([\"\'])(/customer_authentication/[^\"\']*|/account[^\"\']*)\1',lambda m:'href='+m[1]+ORIGIN+m[2]+m[1],text)
    return text

def download(item):
    u,local=item
    target=OUT/local.lstrip('/')
    if not target.exists():
        try:
            target.parent.mkdir(exist_ok=True,parents=True)
            target.write_bytes(fetch(u))
        except Exception as e:
            failures.append({'url':u,'error':str(e)})
    return u,target

def main():
    routes=json.loads((ROOT/'docs/route-inventory.json').read_text())['routes']
    routes=[r for r in routes if r['kind'] not in ['commerce','discovery']]
    pages={}
    with futures.ThreadPoolExecutor(max_workers=8) as pool:
        for path,data in pool.map(get_page,routes):
            pages[path]=clean_page(data)
            print('page',path,flush=True)
    catalog=json.loads(fetch(ORIGIN+'/products.json?limit=250'))
    # Product data supports local cart/search; all original image files are hosted with this preview.
    for p in catalog['products']:
        for im in p['images']:im['src']=register(im['src'])
    (OUT/'catalog.json').write_text(json.dumps(catalog))
    done=set()
    while True:
        pending=[x for x in assetmap.items() if x[0] not in done]
        if not pending:break
        print('assets',len(pending),flush=True)
        with futures.ThreadPoolExecutor(max_workers=12) as pool:
            for u,path in pool.map(download,pending):
                done.add(u)
                if path.exists() and path.suffix=='.css':
                    css=path.read_text()
                    css=ASSET.sub(lambda m:register(m.group()),css)
                    # Source theme uses relative asset references in CSS too.
                    def cssurl(m):
                        raw=m[1].strip(' \"\'')
                        if raw.startswith(('data:','#','/assets/')):return m[0]
                        full=urljoin(u,raw)
                        return 'url("'+register(full)+'")'
                    css=re.sub(r'url\(([^)]+)\)',cssurl,css)
                    path.write_text(css)
    for path,data in pages.items():
        target=OUT/path.lstrip('/')/'index.html'
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_text(data)
    (ROOT/'docs/asset-manifest.json').write_text(json.dumps({'source':ORIGIN,'captured':'2026-09-21','assets':assetmap,'failures':failures},indent=2))
    (ROOT/'docs/capture-report.json').write_text(json.dumps({'pages':list(pages),'asset_count':len(assetmap),'failures':failures},indent=2))
    if failures:raise SystemExit(str(len(failures))+' asset downloads failed')
    print('Done:',len(pages),'pages,',len(assetmap),'assets')
if __name__=='__main__':main()

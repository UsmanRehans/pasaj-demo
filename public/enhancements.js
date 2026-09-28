(() => {
  'use strict';
  const catalog = fetch('/catalog.json').then(r=>r.json()).then(x=>x.products);
  const currency=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n));
  const origin='https://www.pasajstudio.com';
  // Original app-only controls have explicit real-store handoffs.
  document.querySelectorAll('localization-form button').forEach(button=>button.addEventListener('click',event=>{
    event.preventDefault();
    const parent=button.closest('localization-form');
    let note=parent.querySelector('.replica-localization-note');
    if(!note){note=document.createElement('p');note.className='replica-localization-note';note.innerHTML='This preview uses USD. <a href="https://www.pasajstudio.com/">Choose your region on PASAJ</a>.';parent.append(note);}
  }));
  document.querySelectorAll('quick-add-modal,modal-opener[data-modal*="QuickAdd"]').forEach(el=>{
    if(el.matches('quick-add-modal')){el.remove();return;}
    const button=el.querySelector('button[data-product-url]');
    if(button){const link=document.createElement('a');link.href=button.dataset.productUrl;link.textContent='Choose options';link.className=button.className;el.replaceWith(link);}
  });
  document.querySelectorAll('.jdgm-preview-badge').forEach(el=>{el.removeAttribute('role');el.removeAttribute('tabindex');el.setAttribute('title','Rating captured from the original PASAJ store');});
  document.querySelectorAll('[data-forms-id]').forEach(el=>{if(!el.childElementCount)el.innerHTML='<a class="replica-button" href="https://www.pasajstudio.com/pages/subscription_form">Join on PASAJ</a>';});
  document.querySelectorAll('form').forEach(form=>{if(form.action.includes('/localization'))form.addEventListener('submit',e=>e.preventDefault());});
  // Update source theme price immediately when local variant selection changes.
  async function updateVariant(){
    const handle=location.pathname.split('/products/')[1]?.split('/')[0];
    if(!handle)return;
    const product=(await catalog).find(x=>x.handle===handle);
    if(!product)return;
    const picker=document.querySelector('variant-selects,variant-radios');
    const values=picker?[...picker.querySelectorAll('select,input[type="radio"]:checked')].map(x=>x.value):[];
    const variant=product.variants.find(v=>values.every((x,i)=>String(v['option'+(i+1)])===x));
    if(!variant)return;
    document.querySelectorAll('[id^="price-"] .price-item--regular,[id^="price-"] .price-item--sale').forEach(el=>el.textContent=currency(variant.price)+' USD');
    document.querySelectorAll('form[action*="/cart/add"] input[name="id"]').forEach(el=>{el.value=variant.id;el.disabled=false;});
  }
  document.addEventListener('change',e=>{if(e.target.closest('variant-selects,variant-radios'))updateVariant();},true);
  updateVariant();
  // Local collection sort/filter replaces Shopify section-rendering endpoints.
  const grid=document.getElementById('product-grid');
  if(grid){
    const cards=[...grid.children];
    const run=async()=>{
      const products=await catalog;
      const sort=document.querySelector('[name="sort_by"]')?.value||'manual';
      const min=Number(document.querySelector('[name="filter.v.price.gte"]')?.value)||0;
      const max=Number(document.querySelector('[name="filter.v.price.lte"]')?.value)||Infinity;
      const selected=[...document.querySelectorAll('[name="filter.v.availability"]:checked')].map(x=>x.value);
      const mapped=cards.map((el,index)=>{const href=el.querySelector('a[href*="/products/"]')?.getAttribute('href');const handle=href?.split('/products/')[1]?.split('?')[0];const p=products.find(p=>p.handle===handle);return {el,index,p,price:Math.min(...(p?.variants||[]).map(v=>Number(v.price)))};});
      mapped.sort((a,b)=>sort==='price-ascending'?a.price-b.price:sort==='price-descending'?b.price-a.price:sort==='title-ascending'?(a.p?.title||'').localeCompare(b.p?.title||''):sort==='title-descending'?(b.p?.title||'').localeCompare(a.p?.title||''):sort==='created-ascending'?String(a.p?.created_at).localeCompare(String(b.p?.created_at)):sort==='created-descending'?String(b.p?.created_at).localeCompare(String(a.p?.created_at)):a.index-b.index);
      let shown=0;
      mapped.forEach(({el,p,price})=>{const available=p?.variants.some(v=>v.available);el.hidden=price<min||price>max||(selected.length&&!selected.includes(available?'1':'0'));if(!el.hidden)shown++;grid.append(el);});
      document.querySelectorAll('#ProductCount,#ProductCountDesktop').forEach(el=>el.textContent=shown+' products');
    };
    document.addEventListener('change',e=>{if(e.target.matches('[name="sort_by"],[name^="filter."]')){const name=e.target.name;document.querySelectorAll(`[name="${name}"]`).forEach(el=>{if(el===e.target)return;if(el.type==='checkbox'){if(el.value===e.target.value)el.checked=e.target.checked;}else el.value=e.target.value;});run();}},true);
    document.querySelectorAll('facet-remove a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('[name^="filter."]').forEach(el=>{if(el.type==='checkbox')el.checked=false;else el.value='';});run();}));
    document.querySelectorAll('facet-filters-form form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();run();}));
  }
  const consent=document.createElement('section');consent.className='replica-cookie';consent.setAttribute('aria-label','Privacy choices');
  consent.innerHTML='<h2>We value your privacy</h2><p>This preview stores your cart and privacy choice in this browser. No marketing or analytics tracking runs here. Read the original <a href="/policies/privacy-policy">privacy policy</a>.</p><div class="replica-cookie-actions"><button type="button" data-manage>Manage preferences</button><button type="button" data-accept>Accept</button><button type="button" data-decline>Decline</button></div>';
  let choice;try{choice=localStorage.getItem('pasaj-preview-consent');}catch{}
  consent.hidden=!!choice;document.body.append(consent);
  consent.addEventListener('click',e=>{if(e.target.matches('[data-manage]')){consent.querySelector('p').textContent='Only browser storage for your cart and this preference is used. Optional marketing and analytics are disabled in this preview.';return;}if(e.target.matches('[data-accept],[data-decline]')){try{localStorage.setItem('pasaj-preview-consent',e.target.hasAttribute('data-accept')?'accepted':'declined');}catch{}consent.hidden=true;}});
  document.querySelectorAll('a[href*="shopifyReshowConsentBanner"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();consent.hidden=false;}));
  document.querySelectorAll('shopify-planet-banner button').forEach(b=>b.addEventListener('click',()=>location.href='/pages/climate-commitment'));
  const chat=document.createElement('a');chat.className='replica-chat-link';chat.href='/pages/contact-us';chat.setAttribute('aria-label','Contact PASAJ');chat.innerHTML='<svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 5h18v14H12l-6 4v-4H5z" stroke="currentColor" stroke-width="1.5"/><path d="M9 10h10M9 14h7" stroke="currentColor" stroke-width="1.5"/></svg>';document.body.append(chat);
})();

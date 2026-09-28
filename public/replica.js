(() => {
  'use strict';
  const original = 'https://www.pasajstudio.com';
  const key = 'pasaj-preview-cart-v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) {}
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(x => x && /^\d+$/.test(String(x.id)) && Number.isFinite(x.quantity) && x.quantity > 0);
  const catalog = fetch('/catalog.json').then(r => r.ok ? r.json() : Promise.reject()).then(x => Array.isArray(x) ? x : x.products || []).catch(() => []);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = price => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(Number(price) || 0);
  let previousFocus;
  const drawer = document.createElement('dialog');
  drawer.className = 'replica-cart';
  drawer.setAttribute('aria-label','Shopping cart');
  document.body.append(drawer);
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(cart)); } catch (_) {}
    const count = cart.reduce((sum, x) => sum + x.quantity, 0);
    document.querySelectorAll('#cart-icon-bubble').forEach(icon => {
      let bubble = icon.querySelector('.cart-count-bubble');
      if (!bubble && count) { bubble = document.createElement('div'); bubble.className = 'cart-count-bubble'; icon.append(bubble); }
      if (bubble) { bubble.textContent = String(count); bubble.hidden = !count; }
      icon.setAttribute('aria-label', `Cart, ${count} ${count === 1 ? 'item' : 'items'}`);
    });
  }
  function renderCart() {
    drawer.innerHTML = `<header><h2>Your cart</h2><button type="button" data-close aria-label="Close cart">×</button></header><div class="replica-cart-items">${cart.length ? cart.map(x => `<article class="replica-cart-item">${x.image ? `<img src="${escape(x.image)}" alt="" width="90" height="110">` : ''}<div><a href="/products/${escape(x.handle)}">${escape(x.title)}</a>${x.variant && x.variant !== 'Default Title' ? `<p>${escape(x.variant)}</p>` : ''}<p>${money(x.price)}</p><div class="replica-quantity"><button type="button" data-adjust="-1" data-id="${escape(x.id)}" aria-label="Decrease quantity of ${escape(x.title)}">−</button><span aria-live="polite">${x.quantity}</span><button type="button" data-adjust="1" data-id="${escape(x.id)}" aria-label="Increase quantity of ${escape(x.title)}">+</button><button type="button" data-remove="${escape(x.id)}">Remove</button></div></div></article>`).join('') : '<p>Your cart is empty.</p><button type="button" data-close class="replica-button">Continue shopping</button>'}</div>${cart.length ? `<footer><div class="replica-total"><span>Estimated total</span><span>${money(cart.reduce((s,x) => s + Number(x.price || 0) * x.quantity,0))} USD</span></div><p>Taxes and shipping calculated at checkout.</p><a class="replica-button" href="${original}/cart/${cart.map(x => `${encodeURIComponent(x.id)}:${x.quantity}`).join(',')}?checkout">Check out</a><p class="replica-checkout-note">Checkout continues securely on PASAJ’s original store.</p></footer>` : ''}`;
  }
  function openCart() { previousFocus = document.activeElement; renderCart(); if (!drawer.open) drawer.showModal(); }
  drawer.addEventListener('close', () => previousFocus?.focus());
  drawer.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button?.hasAttribute('data-close')) drawer.close();
    if (button?.hasAttribute('data-adjust')) {
      const line = cart.find(x => String(x.id) === button.dataset.id);
      if (line) line.quantity = Math.max(1, Math.min(99, line.quantity + Number(button.dataset.adjust)));
      persist(); renderCart();
    }
    if (button?.hasAttribute('data-remove')) { cart = cart.filter(x => String(x.id) !== button.dataset.remove); persist(); renderCart(); }
    if (event.target === drawer) { const r = drawer.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) drawer.close(); }
  });
  async function add(form) {
    const data = new FormData(form);
    const id = String(data.get('id') || '');
    const products = await catalog;
    const product = products.find(p => p.variants?.some(v => String(v.id) === id));
    const variant = product?.variants.find(v => String(v.id) === id);
    if (!product || !variant || variant.available === false) { showFormMessage(form, 'This selection is unavailable. Please select an available size.'); return; }
    const quantity = Math.max(1, Math.min(99, parseInt(data.get('quantity'),10) || 1));
    const line = cart.find(x => String(x.id) === id);
    if (line) line.quantity = Math.min(99, line.quantity + quantity);
    else cart.push({id, quantity, title:product.title, handle:product.handle, variant:variant.title, price:variant.price, image:product.images?.[0]?.src || product.image?.src || ''});
    persist(); openCart();
  }
  function showFormMessage(form, text) {
    let message = form.querySelector('.replica-form-message');
    if (!message) { message = document.createElement('p'); message.className = 'replica-form-message'; message.setAttribute('role','status'); form.append(message); }
    message.textContent = text;
  }
  async function search(form) {
    const input = form.querySelector('[name="q"]');
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    const products = await catalog;
    let results = form.querySelector('.replica-search-results');
    if (!results) { results = document.createElement('div'); results.className = 'replica-search-results'; results.setAttribute('aria-live','polite'); form.append(results); }
    if (!query) { results.replaceChildren(); results.hidden = true; return; }
    const matches = products.filter(p => `${p.title} ${p.product_type} ${(p.tags || []).toString()}`.toLowerCase().includes(query)).slice(0,12);
    results.hidden = false;
    results.innerHTML = `<p>${matches.length ? 'Products' : 'No results found. Try a different search.'}</p>${matches.map(p => `<a href="/products/${escape(p.handle)}">${p.images?.[0]?.src ? `<img src="${escape(p.images[0].src)}" alt="" width="48" height="60">` : ''}<span>${escape(p.title)}<small>${money(p.variants?.[0]?.price)}</small></span></a>`).join('')}`;
    form.closest('predictive-search')?.querySelector('[data-predictive-search]')?.replaceChildren();
  }
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const path = new URL(form.action, location.href).pathname;
    if (path.startsWith('/cart/add')) { event.preventDefault(); event.stopImmediatePropagation(); add(form); }
    else if (path === '/search') { event.preventDefault(); event.stopImmediatePropagation(); search(form); }
    else if (path === '/contact' || form.querySelector('[name="contact[email]"]')) {
      event.preventDefault(); event.stopImmediatePropagation();
      showFormMessage(form, 'Please use the original PASAJ store to send your message or subscribe.');
      if (!form.querySelector('.replica-original-link')) { const a = document.createElement('a'); a.className = 'replica-original-link'; a.href = original + location.pathname; a.textContent = 'Continue on PASAJ'; form.append(a); }
    }
  }, true);
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.pathname === '/cart' && (url.origin === location.origin || url.origin === original)) { event.preventDefault(); event.stopImmediatePropagation(); openCart(); }
    if (url.pathname.startsWith('/account') && url.origin === location.origin) link.href = original + url.pathname + url.search;
  }, true);
  document.addEventListener('input', event => {
    if (event.target.matches('input[name="q"]')) { event.stopImmediatePropagation(); search(event.target.form); }
  }, true);
  document.addEventListener('change', async event => {
    const picker = event.target.closest('variant-selects, variant-radios');
    if (!picker) return;
    event.stopImmediatePropagation();
    const products = await catalog;
    const handle = location.pathname.split('/products/')[1]?.split('/')[0];
    const product = products.find(p => p.handle === handle);
    if (!product) return;
    const values = [...picker.querySelectorAll('select, input[type="radio"]:checked')].map(el => el.value);
    const variant = product.variants.find(v => values.every((value,index) => String(v[`option${index + 1}`]) === value));
    if (!variant) return;
    document.querySelectorAll('[id^="price-"] .price-item--regular,[id^="price-"] .price-item--sale').forEach(el => el.textContent = money(variant.price) + ' USD');
    document.querySelectorAll('form[action*="/cart/add"]').forEach(form => {
      const input = form.querySelector('[name="id"]'); if (input) { input.value = variant.id; input.disabled = false; }
      const button = form.querySelector('[type="submit"]'); if (button) { button.disabled = !variant.available; const label = button.querySelector('span'); if (label) label.textContent = variant.available ? 'Add to cart' : 'Sold out'; }
    });
    picker.querySelectorAll('fieldset').forEach(field => { const selected = field.querySelector('input:checked'); const label = field.querySelector('[data-selected-value]'); if (label && selected) label.textContent = selected.value; });
    const url = new URL(location.href); url.searchParams.set('variant', variant.id); history.replaceState({},'',url);
  }, true);
  persist();
  if (location.pathname === '/cart') openCart();
})();

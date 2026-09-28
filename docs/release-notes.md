# PASAJ replica — release notes

September 21, 2026.

## Delivered

45 captured public pages: homepage, product and collection pages, content pages, blog/index articles, policies and search. Fourteen public product records support a local cart/search runtime. 1,536 source assets are hosted locally. The source HTML and CSS preserve the original photography, section structure, typography and responsive behavior.

Persistent PASAJ roles: Cando, Vita, Lauren, Avery, Theo, Nico and Zahid. Impeccable 4.3.1 and website-team are installed locally. The brand book explains observations, evidence and interpretation across voice, palette, typography, photography, materials, customer experience and luxury positioning.

## Verified

- Build validation: every captured page exists; all local HTML asset references resolve; catalog/runtime files present.
- Browser inspection: desktop homepage/product/collection and 390px mobile homepage/menu/product.
- Mobile homepage/product have no horizontal overflow; homepage reports no broken loaded images.
- Product add-to-cart; separate Rose Ottoman 5ml ($45) and 10ml ($78) lines; $123 combined total; correct selected-variant URL; quantity controls and remove/empty state.
- Product price updates to $78 after choosing 10ml.
- Search for “rose” returns Rose Ottoman with its image and price.
- Collection A–Z sort orders Jasmine, Rose Ottoman, Tobacco, Wood.
- Original account links and checkout cart-permalink destination inspected. No real checkout, purchase, account login, email or subscription was submitted.
- Impeccable detector ran once on the custom runtime/CSS: two warnings and twelve advisory findings. Generic font warning is retained because original app forms use a sans face; color/type advisories concern neutral support-state values. These are not a clean detector pass or proof of WCAG conformance.

## Fidelity and integration limits

This is a static storefront replica, not a Shopify backend migration or a claim of complete pixel-perfect equivalence across all pages and app states. Source marketing copy is retained as published, not independently substantiated.

Twenty-two old blog images already return 404 on PASAJ’s CDN, including their full-size variants. Labeled archive-image placeholders replace broken image icons. Exact missing source URLs remain in the asset manifest/report.

Cart/search/filter behavior is implemented locally. Quick-add variant choices navigate to the product page. Checkout/account continue on the real PASAJ store. Prices, stock and currencies are snapshots; real checkout is authoritative. Region switching uses a real-store handoff. Featured/best-selling order uses the captured source order; no private merchandising/relevance engine is available.

Shopify app features are not migrated: delayed newsletter popup, live chat, review submission, subscriptions and embedded climate video players. The newsletter/contact surfaces do not submit from the preview; they offer original-store handoff. Chat icon leads to contact. Privacy banner uses truthful preview storage language. Source static climate/review content remains a dated snapshot.

The source has repeated desktop/mobile markup and third-party app hooks. No claim of an exhaustive accessibility audit, independent security audit, real inventory sync or payment verification is made.

## Review provenance

Avery independently completed the route/content audit. Vita independently completed reference desktop/mobile visual measurements. Theo authored initial cart/search files. Specialist follow-ups hit the account usage limit; the coordinating assistant completed extended documentation, integration, browser checks and fixes. Lauren, Nico and Zahid are configured for future relevant tasks but did not independently review this release.

## Deployment

Live preview: https://pasaj-demo.vercel.app

Vercel project: `usmans-projects-dc9dc6bd/pasaj-demo`. First deployment completed successfully and received the project's production alias; the original PASAJ domain is unchanged. The deployed homepage was opened and inspected in the browser. No Git commit or push was performed.

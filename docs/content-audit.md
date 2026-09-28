# PASAJ source inventory

Audited September 21, 2026. Source: https://www.pasajstudio.com/ and its public XML sitemap. Machine-readable route list: `route-inventory.json`.

The inventory contains every URL disclosed by the public sitemap, plus same-origin homepage links and the search form route. This is source-disclosed coverage, not proof that unlinked or private routes do not exist.

## Counts

| Route group | Count |
| --- | ---: |
| Homepage | 1 |
| Products | 14 |
| Curated collections | 9 |
| Collection indexes (`/collections`, `/collections/all`) | 2 |
| Content pages | 7 |
| Blog index | 1 |
| Blog articles | 7 |
| Policies | 3 |
| Commerce routes (cart, customer authentication redirect) | 2 |
| Search | 1 |
| Machine discovery (`/agents.md`) | 1 |
| Total inventoried paths | 48 |

## Navigation and content

Homepage links disclose Perfume Oil, Perfumed Candles, Body, Skincare, Face, Hair, Mother's Day, Gifts for Him and Curated Selection collections. Products comprise Jasmine, Tobacco, Wood, Rose Ottoman, Sendahl Body Oil, Figleef, Gardenya, Oud, Regenerating Night Face Serum, Nerole, Scalp & Hair Oil, Ambra Body Oil, Conditioning Beard Oil and Nourishing Natural Face Oil. These labels summarize route slugs; actual displayed product names should be copied from product records.

Content routes include About (`/pages/about-new`), Materials (`/pages/materials-in-progress`), Contact, newsletter subscription, Climate Commitment, Collaborations and CCPA opt-out. Do not omit the two pages absent from homepage navigation: Collaborations and CCPA opt-out.

The sitemap also exposes The Parfum Counter blog and seven editorial articles. Privacy, refund and terms policies appear in the homepage footer but are absent from the sitemap. The Instagram destination is https://www.instagram.com/pasajperfume/.

## Commerce implementation boundaries

The source is a Shopify storefront. Its public HTML identifies the store as `pasaj-perfume.myshopify.com`. Homepage UI includes a cart drawer posting to `/cart`, predictive search using `/search`, a country localization form posting to `/localization`, and a customer authentication redirect with locale and country parameters.

A Vercel replica must explicitly replace or reconnect these server-owned behaviors. Copying rendered forms alone does not reproduce Shopify session cookies, cart state, checkout, customer login, search responses, localization, newsletter subscriptions or contact submissions. Keep a local demo cart coherent if production commerce credentials are unavailable. Real checkout needs the merchant's approved Shopify integration and should not imply payment succeeds when it does not.

Product prices, variants, stock and collection membership are live facts; capture public product data and visibly distinguish any later stale demo data. Forms should acknowledge only actions actually performed. Source photography can be reused for this requested replica; avoid substituting invented product imagery. Responsive behavior, product galleries, menus, search, cart and legal/footer routes need separate rendered verification.

## Sources

- https://www.pasajstudio.com/sitemap.xml
- https://www.pasajstudio.com/sitemap_products_1.xml?from=539154153516&to=8523839242328
- https://www.pasajstudio.com/sitemap_pages_1.xml?from=11957043244&to=120148721752
- https://www.pasajstudio.com/sitemap_collections_1.xml?from=266257203288&to=310138962008
- https://www.pasajstudio.com/sitemap_blogs_1.xml
- https://www.pasajstudio.com/

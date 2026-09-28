# PASAJ — Vercel replica

A public-source snapshot of [PASAJ](https://www.pasajstudio.com/), captured September 21, 2026. Original page markup, theme CSS and photography preserve the source composition and responsive behavior. A small local runtime replaces selected Shopify server interactions.

## Start here

- [Brand book and evidence](docs/brand/README.md)
- [Team roles](docs/team/team.md)
- [Visual audit](docs/visual-audit.md)
- [Route inventory](docs/route-inventory.json)
- [Release notes and limits](docs/release-notes.md)

## Run

`npm run dev` serves http://localhost:4173. No npm packages are required. `npm run build` validates page and asset references. Vercel publishes the `public` directory using `vercel.json`.

## Source refresh

`npm run capture` explicitly captures public source pages/assets. Run `python3 scripts/finalize.py` afterward to apply preview service boundaries. Network access is required. The capture is a build-time maintenance action, not a runtime dependency. It intentionally records source errors instead of substituting photos.

`docs/asset-manifest.json` records every source URL. The capture includes 45 pages and 14 products. Twenty-two legacy blog images return 404 at the original source and are represented by labeled placeholders. Current storefront photography is downloaded locally.

## Commerce

Cart state lives in localStorage. Checkout links hand variant IDs and quantities to the real PASAJ store. No payment, account, subscription or email backend is recreated. Account links and form guidance point to the original store. The preview is excluded from indexing.

## Team and toolkit

PASAJ-specific skills for Cando, Vita, Lauren, Avery, Theo, Nico and Zahid are in `.agents/skills`. Impeccable 4.3.1 and website-team were copied from Candy Rama’s setup. Brand facts and decisions live here independently. Read `AGENTS.md` for future work.

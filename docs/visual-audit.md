# PASAJ visual reference audit

Vita — inspected https://www.pasajstudio.com/ on September 21, 2026 using live desktop (1280×720) and mobile (390×844) browser views. Measurements below are from rendered DOM; transient animation positions should not be interpreted as permanent geometry.

## Visual identity

White canvas, black type, restrained thin black line icons, atmospheric real photography. All main storefront typography uses `"SF Mono", Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace`; the PASAJ wordmark is an image with bold condensed sans letterforms. Do not substitute editorial serif typography or add decorative colors.

Desktop heading 25.2px / 32.76px; body 16.8px / 29.6px; navigation 14.7px / 18.9px. Typical letter spacing .63px. Buttons 15.75px, letter spacing1.05px, height49.25px; hard square corners. Newsletter main heading is42px/54.6px. Mobile headings21px/27.3px, newsletter31.5px/40.95px. Main body15.75px on mobile.

## Desktop homepage composition

- Header125.36px high. Centered wordmark around x572,y12,w136,h50; menu second row around y73–117. Perfume, Face, Body, Hair, Candles, Gifts, Pasaj each have downward chevrons. Search/account/bag at upper right.
- Hero full bleed1280×588 startingy125.36. `IMG_3567.jpg`, darkened photographic backdrop. Heading atx62.5,y475.76; italic light subtitle below, white Shop Skincare button atx62.5,y569.6,w200,h49.25. Desktop content bottom-left.
- Content width1155px centered (62.5px margins). Paired sections split into equal577.5px columns, photos483px high.
- Curated Essentials block sectiony713.36,h519: `IMG_6290.jpg` left, centered “Not sure where to start?” and “Discover our Curated Essentials” right. Essentials link italic and underlined.
- Conscious mind blocky1232.36,h519: text left, `Screenshot_2026-05-07_at_7.47.22_PM.png` right. Subtitle “100% natural ingredients”.
- Collection sectiony1751.36,h419.26. Heading atx62.5,y1808.36. Four square258.75px images atx62.5,361.25,660,958.75; 40px gutters. Images: gardeniah_candle_square, tobacco_10ml_perfume_oil_bottle, ambra_body_oil_bottle, figleef_candle_square. Labels Gifts for Her, Perfumes, Skincare, Perfumed Candles.
- Gentle body sectiony2170.62,h555: image left (`DTS_Solitude_Daniel_Faro_Photos_ID4183.jpg`), text right. Subtitle “Free from allergens and harsh chemicals”.
- Candle slideshowy2725.62,h766: 1280×720 photography with46px controls below. First `Candles_Top_Down_web_size.jpg`, then `ooude.jpg`, then `gardeniah.jpg`. Centered bottom CTA; Previous/Next and1 of3 counter. CTA labels Shop Candles, Discover Ooude, Discover Gardeniah.
- Thoughtful soul sectiony3491.62,h555: text left, `DTS_Philia_Daniel_Faro_Photos_ID4683.jpg` right. Subtitle “Handcrafted with intention”.
- Newslettery4046.62,h547.18: centered Notes from the Studio, description, first name/last name/email fields, Join button, marketing consent copy.
- Footer includes Quick links (Notes from the Studio, Collections, About Us, Contact Us), carbon-neutral shipping widget, Instagram, country/currency selector (Ireland/EUR on inspected session), copyright and Shopify credit, refund/privacy/terms/cookie preference links.

## Mobile fidelity requirements

- Header61.75px tall; hamburger and search left, wordmark centered, account and bag right. No desktop menu row.
- Hero357px tall at390px wide, beginningy61.75; cropped photography, centered heading/subtitle/button. Heading wraps to two lines.
- Main side gutters15.75px. Paired sections always stack IMAGE FIRST, even when photo appears right on desktop. Images358.5×310.8px. Text centered beneath with about40px side inset within content. First image beginsy445.75, first headingy798.55.
- Collection grid is **one column**, four358.5px square images. Collection section total height1781.8px; retain this spacious presentation rather than making a compact two-column grid.
- Mobile slideshow image is16:9,390×219.375px, with CTA in a separate area below; total section398.625px.
- Mobile menu opens a white full-height panel under the unchanged header. Close icon replaces hamburger. Category list left padded31.5px, begins near102px, ~49px line spacing, right arrows. Instagram sits in pale footer band at bottom.

## Interactions and overlays observed

- Cookie notice is initially a bottom-centered white panel on desktop, aroundx192,y513,w896, with bold privacy heading, description/privacy link, Manage preferences, Accept, Decline. Buttons outlined square. Declining removes it.
- Delayed newsletter modal appears desktop right side, about640×497px. White form left and mountain photograph right; rounded outer corners, X upper-right; modal uses sans type. It includes first/last/email, Join, consent. Closing minimizes to a vertical “Welcome to Pasaj” tab near right edge; separate close button can dismiss tab.
- Small floating rounded-square chat icon sits bottom-right.
- Desktop category dropdown links include product shortcuts and a discover collection link. Account and cart are popup controls; search expands. Their network commerce functions must be distinguished from visual replication if no Shopify backend is connected.

## QA priorities

Match exact source asset, crop, overlay darkness, header proportions, section order, font metrics, and mobile one-column collections. Preserve real navigation routes and usable menus, search, carousel, cart, cookie preferences and signup affordances. Do not imply payment, account, newsletter, or chat services are live merely because their interfaces have been recreated.

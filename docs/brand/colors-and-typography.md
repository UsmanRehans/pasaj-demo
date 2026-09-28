# PASAJ colors and typography

Evidence: homepage inline theme variables and Vita’s rendered desktop/mobile inspection, September 21, 2026. See [visual audit](../visual-audit.md) for exact viewport measurements. These are implementation observations, not a supplied official identity manual.

## Active visual palette

| Color | Observed role | Interpretation |
| --- | --- | --- |
| `#FFFFFF` | Main page and header surfaces, inverse button text | An unobtrusive gallery-like canvas |
| `#000000` | Primary text, outlines, dark buttons | Precision and strong contrast |
| `#FCFCFC` | Light foreground/button values in alternate schemes | Slight off-white inverse treatment |
| `#F7F7F7` | Alternate inverse button text | Near-white theme value |

The source also defines `#540000` (deep burgundy background) and `#103948` (blue-green button text) in an alternate color scheme. Their presence in configuration does **not** make them active homepage brand accents. Do not introduce burgundy sections simply because the token exists.

Photographs supply the expressive color: amber/brown glass, warm skin, olive and botanical greens, stone and earth neutrals. These are descriptions of imagery, not sampled official hex codes. They should stay in the photographs unless the owner approves an expanded palette.

## Typography

The observed body and heading family is `"SF Mono", Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace`. This is a system fallback stack; its exact glyph rendering varies by operating system. Do not replace it with a generic luxury serif. The condensed heavy PASAJ wordmark is an image, not the body font typed in capitals.

At 1280px desktop, Vita measured body 16.8px with about 29.6px line height; normal headings 25.2px / 32.76px; navigation 14.7px / 18.9px; buttons 15.75px, roughly 49px tall. Typical tracking is 0.63px; buttons 1.05px. Newsletter heading is 42px / 54.6px.

At 390px mobile, headings become 21px / 27.3px, body 15.75px, newsletter heading 31.5px / 40.95px. These are sampled computed values, not instructions to force every heading to one size.

## Shape and spacing

Square corners and thin outlines on core controls. Photography and whitespace carry the composition. Desktop content is 1155px wide at a 1280px viewport with 62.5px margins. Mobile side gutters are about 15.75px. The mobile collections use a single spacious column.

## Why this reads as premium

Interpretation: consistency, restraint, tactile photographs and open space create confidence. Monospace gives the interface a precise studio/catalog quality. Luxury here is an editorial treatment of everyday materials, not ornamental gold, exaggerated display type or constant prestige claims.

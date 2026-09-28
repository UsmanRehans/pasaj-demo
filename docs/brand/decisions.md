# Decisions and learning

## September 28, 2026 — marketing team setup

- Owner clarified that broader marketing work is intended later; current work is limited to **Meta Ads, Shopify and email**. Email platform and actual account connections are not yet established.

- Owner requested reading `coreyhaines31/marketingskills` and duplicating its marketing structure for PASAJ, with findings and questions needed to tailor it properly.
- Implementation: preserved the source library with revision/license/provenance; added a PASAJ marketing entry point, shared context and seven-group mapping to existing roles. Mapping is an implementation choice, not owner-confirmed staffing or channel strategy.
- Owner selected **online sales and repeat purchases** as the first priority, targeting **USA skincare** with **$1,000 USD per month** for marketing. Current channels are Meta Ads, Shopify and email. Exact SKUs, budget allocation, email platform and numeric goals remain open. The team setup does not authorize campaigns or change the website replica brief.
- Clarification: $1,000 USD/month is for Meta ad spend only. Creative and email tools are outside that budget. Email platform is Shopify's native email for now. See `docs/marketing/questions.md` for open questions.

## September 23, 2026 — ad preview brief

- Owner approved merging the three ChatGPT campaign concepts into a finished social ad with mood audio. Campaign direction: **A quiet passage**. Seedance 2.0 Fast job `971a02bc-98ef-4fd9-ba34-bccd69c1916e` produced a 12-second 9:16 master joining Wood, Tobacco, and Rose Ottoman with native ambient audio. Cost preflight: 30 credits.
- Final QA: 720×1280 H.264 video, 12.04 seconds; stereo AAC audio, 32 kHz, 12.096 seconds. Sampled frames preserve the main product names and the planned material sequence. The Wood→Tobacco transition intentionally contains a brief light-dissolve overlap. Automated speech detection found no spoken segments.

- Spiral output QA: 8.042 seconds, 720×1280. Vita and parent inspected exact-time frames. Curved parallax is visible and main front labels remain recognizable/correct. The revealed carton side includes generated barcode/small text not verified by source photographs; final volume-line spacing compresses, and wood shaving becomes cropped. Deliver as creative preview, not exact packaging artwork approved for publication.

- Owner corrected the movement: Instagram reference is more spiral/orbital. Actual playback showed changing box sides and pedestal facets. Supersedes the straight push-in motion choice. Vita reviewed a shallow 12–15° clockwise orbit with slight rise/approach, stationary objects and readable labels. Seedance 2.0 Fast revision job `7b8b00fa-3001-4690-aa66-c9bedb47901b`, 8s/720p/silent, preflight 20 credits.

- Owner approved the revised still and authorized animation after text/detail QA. Vita and the coordinating assistant verified carton/bottle wording against original product photographs. Minor observation: generated carton paper has more texture than the catalog photograph.
- Seedance 2.5 and Kling 3.0 were rejected by the Starter plan without jobs. Owner explicitly selected Seedance 2.0 Fast; eight-second 720p silent animation submitted as `81e58f86-d90f-4340-8789-a632464ff326`, preflight cost 20 credits. Motion brief: restrained straight push-in, static objects and preserved lettering.

- Revision: owner requested the perfume bottle outside/beside the box, replacing both the flowers and the table with a more distinctive PASAJ setting, with Vita or Lauren consulted. Owner explicitly requires the actual product-image bottle, never an imagined design.
- Vita proposed pale honed limestone with a rough edge and one curled wood shaving. Actual bottle reference: `https://www.pasajstudio.com/cdn/shop/files/Wood.jpg?v=1786221965`. Bottle and carton have distinct source typography; preserve each independently. Revised still job: `7320f873-944d-4408-b6a1-2d607cebc990`. Await owner review before animation.

- Owner requested a PASAJ ad inspired by https://www.instagram.com/p/DcBHzWiA6mV/ using Higgsfield and authentic PASAJ style and packaging.
- Owner explicitly requested the actual starting-frame image for review before animation. Do not animate until the owner approves the image.
- First proposed still uses the original Wood perfume-oil white carton as reference, warm wood pedestal, ivory backdrop, and restrained botanical foreground. Product selection is a creative proposal, not an owner-specified SKU.
- Higgsfield image job: `2588127d-e1ac-4302-9b64-c3384eee5db7`. This campaign brief permits generated ad media; it does not change the website replica brief.

## September 21, 2026 — confirmed owner instructions

- Rebuild the existing PASAJ website for Vercel for now.
- Use photographs directly from the current website and replicate its presentation.
- Bring over relevant Candy Rama team roles and Impeccable.
- Create readable Markdown covering voice, colors, luxury positioning and the evidence used to understand the brand.

## September 21, 2026 — implementation choices and boundaries

- Use original public source as the visual authority. No redesign or generated photo substitution.
- Copy the reusable team process; do not copy Candy Rama’s identity, geography, product facts or commercial promises.
- Preserve source observations separately from interpretations and proposed rules.
- Source photography and theme assets are captured locally with a provenance manifest.
- Preview commerce must not fake server operations. Original Shopify remains authoritative for real checkout.
- Specialist follow-ups encountered an account usage limit; remaining work is not represented as independently reviewed.

These files are persistent project context, not model training or employees running between tasks. Proposed strategy and unverified hypotheses are not owner-approved decisions.

## September 21, 2026 — verified deployment outcome

The first Vercel deployment is available at https://pasaj-demo.vercel.app. This is the new preview project's production alias, not a change to pasajstudio.com. The build and deployed homepage were verified. See release notes for backend and source-image limitations.

## Product ritual film — owner instruction

For Nourishing Natural Face Oil, add a short realistic loop below the product section. Show an adult female model seated at a table with lighting similar to the product image, product beside her, applying oil to her hand. Preserve PASAJ's style. Ormaie's hand cream page is the placement/gesture reference. This explicitly permits new generated media for this product; the earlier original-photo replica constraint remains applicable elsewhere.

## Product ritual film — owner revision, September 21, 2026

- Owner rejected the first film's older-looking casting and continuous rubbing.
- Cast a visibly younger adult. Match the Ormaie reference's upright seated posture, straight-on torso framing and deliberate complete action.
- Sequence: open bottle, dispense, close and put bottle back, briefly massage hands, lower hands and sit normally. Do this once per clip.
- Owner explicitly confirmed: **the top unscrews and lifts out a pipette**. The first prompt's prohibition on a pipette was an incorrect inference from the closed product photo and is superseded.
- Public research found closed-bottle photography but no verified same-product opening clip. Opening mechanics now rely on the owner's direct confirmation, not claimed video evidence.

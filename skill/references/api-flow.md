# API flow (re-read the repo sources at runtime; they win)

All endpoints are staff-only (`Authorization: Bearer {{token}}`), base `{{base_url}}`.
Bruno: `collection-bookandsign/theme-authoring/party/NN - *.bru` (company events reuse the same requests with different bodies).

## Party (preset + per-event overrides) — existing event `event_id`

| # | Method + path | Body fields | Vars | Bruno |
|---|---|---|---|---|
| 1 | GET /events/themes | none | `preset_id`, `preset_key` (`[{id,key,name,tokens?,images?}]`) | party/01 |
| 2 | POST /events/themes/preview | `eventThemeId`, `themeOverrides`, `honoreesName?` | none; read `warnings` | party/02 |
| 3 | POST /theme-assets/upload-url (cover, optional) | `ownerType:"event"`, `ownerId:event_id`, `slot:"cover"`, `fileName`, `mime` | `path`, `publicUrl`, `signedUrl` | party/03 |
| 4 | PUT `signedUrl` (file bytes, `Content-Type: mime`) | binary | none | party/04 |
| 5 | PATCH /events/{{event_id}} | `eventThemeId`, `themeOverrides` (FULL) | none | party/05 |
| 6 | GET /events/{{event_token}}/theme (public, 5 min cache) | none | none | party/06 |

`socialCta` and `rewardPromo` fall back to the code-owned Brillipoint default when no layer supplies them; do not author them for party.

## Company (per-event brand) — existing event `event_id`

Same endpoints as party; the brand lives in the event's own `themeOverrides`.

| # | Method + path | Body fields | Vars | Bruno |
|---|---|---|---|---|
| 1 | POST /events/themes/preview | `eventThemeId?` (usually omitted), `themeOverrides` (tokens, socialCta, rewardPromo, decorations), `honoreesName` = company name | none; read `warnings` | party/02 |
| 2 | POST /theme-assets/upload-url (per image) | `ownerType:"event"`, `ownerId:event_id`, `slot` (`logo`, `splashIcon`, `background`, `cover`), `fileName`, `mime` | `path`, `publicUrl`, `signedUrl` | party/03 |
| 3 | PUT `signedUrl` | binary | none | party/04 |
| 4 | POST /events/themes/preview | same body as step 1 plus `images` (confirms the final overrides) | none; read `warnings` | party/02 |
| 5 | PATCH /events/{{event_id}} | `honoreesNames` (company name), `eventThemeId: null \| presetId`, `themeOverrides` (FULL, incl. images) | none | party/05 |
| 6 | GET /events/{{event_token}}/theme | none | none | party/06 |

- Company name goes in `honoreesNames`; texts reference it with `{{honoreesName}}`.
- `socialCta` authored on the event replaces the Brillipoint block whole. `rewardPromo`: object = company promo, `null` = hidden, absent = Brillipoint promo.
- Reusing a brand for another event: start from the previous event's `themeOverrides`; image slots point to that event's uploads, re-upload them for the new event (`ownerId` must be the new event).
- The public `/fiesta` hero name comes from a separately cached gallery endpoint: after changing `honoreesNames`, staff clear it with "Limpiar caché" in the event list.

## Upload response
`{ bucket, path, signedUrl, token, publicUrl }`. Store `{ path, url: publicUrl, alt?: {es,en} }` in `images.<slot>`. Slots: logo, splashIcon, hero, watermark, background, cover (`cover` may also carry `link`, https). Mime: png/jpeg/webp everywhere; svg only logo/splashIcon/watermark (else 422). Owner missing/soft-deleted: 404.

## Merge rules
- Layers: SystemDefault -> Brillipoint default (code) -> preset -> event `themeOverrides`. SystemDefault is always the base.
- Absent field = inherit; `null` = remove (images slots, decorations, rewardPromo, copy keys; `socialCta: null` is rejected, the Brillipoint block is the never-hide fallback; required tokens cannot be null); arrays replace; `socialCta` is atomic (whole block replaced).
- PATCH of `overrides`/`tokens`/`images`/`themeOverrides` replaces the stored value; nothing is deep-merged with what was stored.
- Preview `warnings` = contrast issues on RESOLVED tokens (non-blocking); create/PATCH reject same-layer pair failures with 400.

## Validation quick sheet (source: validate-theme-overrides.ts, contrast-ratio.ts)
- Color tokens: opaque hex only for fills/text — `#rgb`/`#rrggbb` (reject `#rrggbbaa`, alpha, for background/surface/text roles). Tokens: background, primary, onPrimary, secondary, text, textMuted, surface, onSecondary, onSurface, accent, surfaceBorder, divider (colors); fontHeading, fontBody, surfaceShadow (free strings).
- Contrast pairs (validated on the RESOLVED theme, min ratio **4.5**, WCAG relative-luminance formula — compute it yourself before emitting, do not guess): `primary`/`onPrimary`, `secondary`/`onSecondary`, `surface`/`onSurface`, `background`/`text`, `background`/`textMuted`, `surface`/`textMuted`. A pro theme sets and checks all six explicitly, even the derived roles (`onSecondary`, `onSurface`).
- Confetti: `enabled` bool, `colors` hex[], `shapes` string[], `amount` int 0-500. Sparkles: `enabled`.
- URLs (`images.*.url`, cover `link`, socials, link-channel `url`): https only. Socials keys: whatsapp (ready `https://wa.me/<digits>` link, no message), instagram, tiktok, facebook, url (website).
- WhatsApp `primaryAction`: `phone` digits only, 8-15 (country code included, no `+`), optional `message`. Every `primaryAction` (any channel) requires `label`. Non-whatsapp `primaryAction` uses `url` instead of `phone`/`message`. Channels: whatsapp, instagram, tiktok, facebook, url — any one may be primary; it is then never repeated in `socials`.
- ThemeText: `{ text: { es?, en? } }` (>=1 language) or `{ key, params? }`; optional `fallback` without placeholders. Placeholder allowed: `{{honoreesName}}` only (`{{brandName}}` is rejected).
- rewardPromo: `{ handle, title?, disclaimer? }` (`handle`: `@` + 1-30 letters, digits, dots or underscores — no hyphens; texts are ThemeText) or `null`. Atomic, no fallback chain beyond the Brillipoint default.
- Top-level override keys: tokens, images, decorations, socialCta, rewardPromo, copy (decorativeIcon is legacy; do not emit).

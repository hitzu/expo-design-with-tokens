# Interview question bank

One question per turn (Spanish, staff's language). Wait for the answer. Offer the derived default and ask to confirm; never fabricate the data itself. Ask the operator for `event_id` and `event_token` first (existing event).

## 0. Always first: event type + brand/tone, and mode
Ask event type (XV, boda, bautizo/baby shower, cumpleaños infantil, corporativo, graduación, otro) and brand tone (elegante, luxury, moderno, juguetón, minimal) before anything else — this drives the palette recipe (`layers.md`) and font pairing (`fonts.md`).

Then offer: **"¿Prefieres que yo proponga la paleta, tipografía y CTA social completos, y solo los confirmas? O prefieres definir cada valor tú mismo?"**
- **Propose-for-me**: draft a full palette (seed from event type/tone or a given brand color, `layers.md` recipe), a font pairing (`fonts.md`), and social CTA copy from the brand/event context; show the full proposal with the computed contrast table; ask ONE confirmation question per section (palette OK? fonts OK? CTA copy OK?) instead of one question per field. Never fabricate real brand data (phone, URLs, exact names) — ask for those even in this mode.
- **Manual**: continue with the per-field questions below.

## Party
1. Which preset? Show `GET /events/themes` names (keys come from the API, never hardcode); map to `eventThemeId`.
2. Cover image for the event? If yes: is it 4:5 and already downloaded? (never an external URL) -> `themeOverrides.images.cover` `{path,url,alt}`; optional `link` (https).
3. Confetti? -> `decorations.confetti.enabled`. Defaults to propose: `colors` = 2-3 hex from the preset/celebration palette the operator confirms; `shapes` e.g. `["circle","star"]`; `amount` 120 (0-500).
4. Sparkles? -> `decorations.sparkles.enabled`.
5. Honorees' names (for preview only) -> `honoreesName`.
6. Anything else to override (tokens, copy)? Only on request.

Then: preview -> show warnings -> OK -> (upload) -> PATCH event with the FULL `themeOverrides`.

## Company
1. Company name -> event `honoreesNames` (and `honoreesName` in preview). Texts use `{{honoreesName}}` to show it.
2. Did this company already have an event with us? If yes, ask for that event's `themeOverrides` as the starting point; still confirm every section below and re-upload images for this event.
3. Primary brand color (hex) -> `tokens.primary`. If it is the ONLY color the brand has, offer seed derivation (`layers.md`) and skip to 6 with the derived proposal. No brand color at all -> derive fully from event type + tone (`layers.md` recipe).
4. Secondary color (hex, optional) -> `tokens.secondary`; accent (optional) -> `tokens.accent`.
5. Background and text colors, or accept the pro recipe defaults (tinted, not inherited plain white — `layers.md`).
6. Propose EVERY token explicitly per `field-rules.md`/`layers.md` (do not leave roles to backend derivation) and confirm each pair:
   - `onPrimary`: choose white `#ffffff` or near-black `#111827` with the higher WCAG contrast vs `primary` (must be >= 4.5). Same rule for `onSecondary`, computed independently (never copy `onPrimary`).
   - `surface`/`onSurface`/`text`/`background`: set explicitly with intent (tinted, not pure white/black) unless the brand is genuinely neutral; if setting `surface`, also set `onSurface` with contrast >= 4.5.
   - `surfaceBorder`/`divider`: soft tints, set explicitly rather than leaving them to derive from `textMuted`.
   - Never set only one side of a pair without checking the other (the preview warning catches it, but compute it yourself first).
   - Run the `layers.md` guardrails on the resolved set and show the `token | hex | contrast checks` table.
7. Logo file: is it downloaded (png/jpeg/webp/svg)? Get `fileName` and `mime` -> upload steps on the EVENT (ownerType `event`) for BOTH `images.logo` and `images.splashIcon` (splash fallback). No logo yet -> omit both.
7b. Splash: full-screen photo for this event? If yes -> 9:16 `themeOverrides.images.background`. If no -> splash shows `splashIcon` on `primary` (frontend); check the logo reads on `primary` (`layers.md`, brand fill). With photo: no text over it (media layer). `cover` (4:5) is only for card/share; ask separately.
8. Font pairing: propose one from `fonts.md` by event type + tone; confirm. If not yet loaded, emit the font-request note and ask whether to proceed anyway or fall back to a loaded pairing.
9. Social CTA, main action first: "¿Cuál es la acción principal — WhatsApp, Instagram, TikTok, Facebook o un sitio web?" -> that channel becomes `socialCta.primaryAction` (whatsapp needs `phone` + optional `message`; others need `url`); always ask for `label` es/en.
10. Then: "¿Qué otros canales quieres mostrar como secundarios?" -> for each selected, fill `socialCta.socials.<channel>` (whatsapp secondary only needs the number, built into the ready `https://wa.me/<digits>` link — no message field there). The primary channel is never repeated in `socials`; empty channels stay unset (hidden by the frontend).
11. Headline es/en (`socialCta.headline`); subtitle/followText optional — propose a draft from the brand/event context, operator confirms. Texts are `{ text: { es, en } }`.
12. Reward promo: "¿Los invitados deben ver la promo de regalo de Brillipoint, una promo propia de la empresa, o ninguna?" -> absent / `rewardPromo: { handle, title, disclaimer }` / `rewardPromo: null`. Never invent the company's handle or offer.
13. Confetti/party decorations? Default no; if yes, colors from the brand colors given above.
14. Preset base? Default `eventThemeId: null` (company tokens cover every role); a preset id from `GET /events/themes` only on request.

Then: preview (`themeOverrides` + `honoreesName`) -> warnings are a blocker, fix before proceeding -> OK -> upload images on the event -> preview again with `images` -> PATCH event with `honoreesNames` and the FULL `themeOverrides`.
Copy in es and en: draft both from context, ask the operator to confirm or edit; do not silently invent facts (names, numbers, URLs).

# Feature: expo-design-tokens

## Objective
Build a standalone repo for a technical talk on token-based design as the visual layer of a multitenant system.

## Thesis
"Si el color vive en el componente, no tienes temas. Si vive en un token con nombre de rol, tienes multitenancy visual."

## Scope (authorized)
- `demo/` — Vite + React demo, zero network, two fictional tenants (Casa Aurora, Nocturne).
- `slides/index.html` — self-contained keyboard-navigable deck, themed with its own tokens + live theme switch.
- `guia/guia-presentador.md` — presenter notes per slide + Q&A bank.
- `README.md` — what it is, how to run, link to slides.

## Constraints
- Colors live ONLY in the themes file. Three token tiers: primitive → semantic (role families) → component.
- Token names in English, code comments in Spanish, talk content in Spanish.
- `npm install && npm run dev` with no config; no env vars, no network calls.
- Readable over short code (projected live).
- Never claim full multitenancy; no real Brillipoint brands.

## Acceptance criteria
- Tenant switcher repaints the whole page (header, gallery, card, form, buttons, states).
- Live token editor repaints instantly without reload.
- Antipattern component (if per tenant), hardcoded-hex component that does NOT change, and surface/on-surface pair demo.
- Typography and radii tokenized.
- Slides: 16 slides per brief, arrow-key navigation, theme switch, honest scope table on slide 13.
- Guide: per-slide notes, 40-min timing, full Q&A bank incl. honest out-of-scope answers.

## Delivery strategy
`ask-on-risk`. Forecast: demo ~900, slides ~700, guide ~400 authored lines (> 400 total). Talk artifact repo, no remote yet; push/PR are user decisions.

## Tasks
- [ ] T1 — Demo (Vite + React). Route: delegated (writer trigger: many non-trivial files). Check: `npm install && npm run build`.
- [ ] T2 — Slides HTML. Route: delegated (large single file, design work). Check: structural readback + open in browser.
- [ ] T3 — Presenter guide + README. Route: inline (docs, full context in parent). Check: structural readback.

## RDD
Global mode: off. No native review; ordinary checks only.

## Progress / evidence
- Repo initialized on branch `feat/expo-design-tokens`.

## Next step
T1.

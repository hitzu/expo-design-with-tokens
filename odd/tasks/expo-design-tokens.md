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
- [x] T1 — Demo (Vite + React). Route: delegated (writer trigger: many non-trivial files). Check: `npm install && npm run build`.
- [x] T2 — Slides HTML. Route: delegated (large single file, design work). Check: structural readback + open in browser.
- [x] T3 — Presenter guide + README. Route: inline (docs, full context in parent). Check: structural readback.

### Iteration 2 (user feedback, 2026-10-05)
Accepted changes: tenant B becomes an industrial bakery (same domain, same menus, only theme differs); simpler thesis; slides: drop keyboard-hint footer, "30 s · manos arriba", error (c) "nombres que mienten", and the multitenant layers slide (one honest line moves to Límites); expand role families; explain `--accent` / `--text-muted`; add gallery-screen token mapping slide (recreated mockup, no real photo); add "me apoyo en la IA" slide (hypothetical Audi activation, steps + tokens JSON, contrast numbers); real repo URL. Dropped idea: `check:contrast` script (out of scope — the real theme-authoring skill already validates pairs).
New thesis: "Si tu componente dice 'rosa', solo sirve para un cliente. Si dice 'acento', sirve para todos."

- [x] T4 — Demo: replace Nocturne with Molino Central (industrial bakery, charcoal/steel + safety yellow, robust sans, square corners). Route: delegated (writer trigger: many files). Check: `npm run build` + hex scan + contrast of pairs.
- [x] T5 — Slides iteration 2 (17 slides). Route: delegated, same writer as T4 (needs Molino palette). Check: slide count, no external loads, `node --check`.
- [x] T6 — Guide + README iteration 2. Route: inline. Check: structural readback, slide numbers match.

### Iteration 3 (user feedback, 2026-10-05)
- [x] T7 — Slides: slide 7 rewrite (script/cast analogy, ask-color vs ask-role, two-zone chain without --btn-bg); checkpoint copy; move gallery after "Por eso llegué a los roles"; merge rules 2+3; AI slide uses user's real Audi JSON with callouts (background ¿de qué?, text ¿sobre qué?), accent note (action = primary in API), new contrast figures. Route: delegated (resume T5 writer). Check: slide count 17, node --check, no remote loads, headless render of changed slides.
- [x] T8 — Guide renumbering + notes. Route: inline. Check: numbering matches deck.

### Iteration 4 (user decision, 2026-10-05)
- [x] T9 — Remove the AI/skill slide (drifts from thesis, invites off-topic Q&A, contradicted `accent` definition). Deck → 16 slides; guide renumbered, timing 30 min + ~10 Q&A; "no soy diseñador" kept only as backup Q&A answer. Route: inline (one mechanical deletion). Check: 16 sections, node --check OK, 0 remote loads, guide numbering 1–16.

## RDD
Global mode: off. No native review; ordinary checks only.

## Progress / evidence
- Repo initialized on branch `feat/expo-design-tokens`.
- T1 `5fad213` — `npm install` OK, `npm run build` OK (parent re-ran build). SSR smoke render by worker. In-app browser preview denied: no visual check by parent. Hex scan: only comments/labels outside antipattern/broken/control-panel. Deviation: Demo 5 breaks via wrong pair (surface-elevated + on-accent) instead of literal color.
- T2 `205955b` — 16 slides, 0 http refs, `node --check` OK, headless Chrome screenshots by worker; not every slide re-checked after final fixes.
- T3 `0df6f76` — structural readback; README claims checked against code (TENANT_IDS, rosa-300, Cliente 12).

- Iteration 2 on branch `feat/iteration-2` (user moved base to `main` + remote origin).
- T4 `aba5339` — Molino Central (dark industrial, safety yellow). `npm run build` OK (parent re-ran). Molino AA pairs ≥ 5.8; Demo 5 wrong pair 1.11 Molino / 14.30 Aurora. Not viewed in a browser.
- T5 `9bf37b6` — 17 slides (parent re-counted), no remote loads, `node --check` OK, no "Nocturne" left; worker headless-Chrome check both themes.
- T6 `b429dfd` — guide renumbered 1–17, matches deck headings; README thesis/link/tenants updated.

- T7 `fac6a21` — 17 slides (parent re-checked order 10–14), node --check OK, no remote loads, worker headless check all slides both themes.
- T8 — guide notes 7, 9, 11–14 updated; numbering 1–17 readback OK.

## Next step
Presenter: full visual pass of demo + slides in a real browser; set real repo URL in slides/index.html (TODO) once published. Push/remote are user decisions.

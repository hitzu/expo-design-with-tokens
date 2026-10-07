---
name: bookandsign-theme-authoring
description: "Trigger: event theme, company brand, experience design, diseño de la experiencia, preset, themeOverrides, socialCta, rewardPromo, party or company event setup. Interview staff, emit validated theme API payloads."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Activation Contract

Load when staff set up an event's visual theme (party preset or per-event company brand) via the bookandsign-api. Read repo files at runtime: `src/events/theme/theme.types.ts`, `src/events/theme/validate-theme-overrides.ts`, `collection-bookandsign/theme-authoring/**`. They win over this skill on any conflict.

## Hard Rules

- Ask ONE question at a time; never invent brand data (colors, phone, URLs, names).
- Never persist before a preview (`eventThemeId?` + `themeOverrides` + `honoreesName`). Show `warnings`; get operator OK.
- PATCH `overrides`/`tokens`/`images`/`themeOverrides` REPLACE: always send the full object.
- Images are hosted by us: never store external URLs; operator downloads, then uploads. svg only for logo/splashIcon/watermark; cover is 4:5.
- LOCAL ONLY: run requests solely against the Bruno `local` env (`collection-bookandsign/environments/local.bru`). Never call, read, or target prod, even if asked mid-flow; emit payloads for the operator instead.
- Output payloads + curl with `{{base_url}}`/`{{token}}` placeholders; never print real tokens.
- Brand kits no longer exist (no `/brand-kits`, no `brandKitId`, no `{{brandName}}`). Company branding lives only in the event's `themeOverrides`.
- The Brillipoint default layer is code-owned (`src/events/theme/brillipoint-default.ts`); never try to edit it through the API. To drop the Brillipoint promo on a company event, set `rewardPromo` (company promo or `null`).
- Every token follows `references/field-rules.md`: one role per field, supplied values are final (no derived opacity/gradients), on-colors are validated pairs, never assumed.
- Rules are per LAYER (page, surface, brand fill, media), never per screen: run the inter-layer guardrails in `references/layers.md` on every resolved palette. A need no role covers is a missing role (open question), never a screen token.

- The goal is a PRO theme: never stop at "passes validation". Set every role with intent (§field-rules.md), harmonize `primary`/`secondary`/`accent` (the public routes render gradients from these three), and pick a real font pairing from `references/fonts.md` — never a placeholder or system font.

## Decision Gates

| Situation | Path |
|---|---|
| Individual/couple event | Party: preset + `themeOverrides` |
| Business client | Company: per-event `themeOverrides` (tokens, images, `socialCta`, `rewardPromo`) + company name in `honoreesNames`; preset optional |
| Same company, another event | Copy the previous event's `themeOverrides` as the starting point (staff can paste it in the editor's "Importar JSON"); re-confirm data, re-preview |
| Company event, Brillipoint promo unwanted | `rewardPromo: null`, or the company's own `rewardPromo` |
| Preview `warnings` non-empty | Blocker: fix tokens, never persist with warnings |
| Operator wants "propose for me" | Skill drafts full palette + fonts + socialCta from event type/tone (`references/layers.md`, `references/fonts.md`); operator only confirms/edits |
| Operator gives one brand color only | Seed derivation in `references/layers.md`; confirm each proposed token |
| Chosen font pairing isn't loaded yet | Emit an explicit font-request note (`references/fonts.md`) for the frontend; do not silently substitute |
| Text wanted over a photo | Not supported (no `scrim`/`onMedia` role); record open question |

## Execution Steps

1. Ask event type + brand/tone first (or offer "propose for me"); follow `references/interview.md`.
2. Draft/confirm a full palette (`references/layers.md` pro recipe) and a font pairing (`references/fonts.md`); compute contrast for every pair in `references/api-flow.md` BEFORE emitting anything, and run the layer guardrails.
3. Map answers to payloads with `references/api-flow.md`.
4. Always call the preview endpoint first; treat ANY `warnings` entry as a blocker and fix it, never ask to proceed past it.
5. After a clean preview and operator OK, emit the ordered persist steps (`assets/*.example.json` shape).

## Output Contract

Return: ordered steps (method, path, JSON body, vars set), the preview request, the computed contrast table for every pair, any font-request note, open questions, and a line stating nothing was executed (or what was, with authorization).

## References

- `references/api-flow.md`, `references/interview.md`, `references/field-rules.md`, `references/layers.md`, `references/fonts.md`
- `assets/party.example.json`, `assets/company.example.json`
- `collection-bookandsign/theme-authoring/` (Bruno flows, source of order and bodies)

# Layer rules

Rules apply per LAYER, never per screen. Every screen is a composition of these layers; a screen never gets its own token. If a screen needs a color no layer role covers, report a missing ROLE (open question) instead of reusing a field or inventing a screen token (`splashTextColor` is a smell).

## Layers

| Layer | Fill | Foreground roles | Used by |
|---|---|---|---|
| page | `background` | `text`, `textMuted`, `primary`/`secondary` actions | every screen body |
| surface | `surface` (+ `surfaceBorder`, `surfaceShadow`) | `onSurface`, `textMuted`, `divider` | cards, panels, sheets |
| brand fill | `primary` (full area) | `onPrimary`, `images.splashIcon` | splash without photo, filled banners |
| media | `images.background` / `images.cover` photo | NONE today (no `scrim`/`onMedia` role) | splash with photo, cover |

## Inter-layer guardrails

Measure lightness in OKLCH (`L` 0-1, perceptual), not HSL. Compute with a scratch script (sRGB -> linear -> OKLab); report the numbers to the operator.

| Check | Threshold | On fail |
|---|---|---|
| `surface` vs `background` | `ΔL >= 0.04` | Propose a surface one step further, or a `surfaceBorder` |
| `surfaceBorder` vs `surface` | `ΔL >= 0.04` | Propose a border one step further from the surface |
| Elevation direction | Dark themes: surface LIGHTER than background. Light themes: pick one side and keep every surface on it | Reject surfaces on both sides of `background` |
| `primary` vs `background` (and vs `surface` when actions sit on cards) | contrast >= 3.0 (WCAG 1.4.11, non-text UI; below the 4.5 text gate on purpose — this pair is a fill, not text) | Adjust `primary` L, keep hue; confirm with operator |
| `accent` vs `primary` | `Δhue >= 30°` or `ΔL >= 0.10` | Flag as indistinguishable; ask for another accent or omit it |
| `background` / `surface` chroma | `C <= 0.04` | Warn: saturated fills compete with `primary`; propose lower C, same hue |
| The 6 validated text pairs (`primary`/`onPrimary`, `secondary`/`onSecondary`, `surface`/`onSurface`, `background`/`text`, `background`/`textMuted`, `surface`/`textMuted`) | API hard-gates all six at >= 4.5 (WCAG AA) — this is enforced server-side, not a soft target | Preview 400s / warns; darken or lighten the foreground and recompute, never lower the target |
| Alpha | Only allowed for a future media scrim; never on page/surface/brand fills | Reject 8-digit hex on fills |

## Media layer (splash photo, cover)

- No text or icons over a photo: there is no validated foreground role. Keep text on page/surface layers only; record "needs `scrim`/`onMedia` role" as an open question if the operator wants text over a photo.
- Critical content (splash icon) centered; keep the top and bottom ~12% free (notch, gesture bar).
- Splash without photo = brand fill layer: `splashIcon` must read on `primary` (contrast >= 3.0 against its dominant color). A full-color logo on a same-hue `primary` fails: ask for a monochrome variant.

## Pro palette recipe (contrast formula + seed derivation)

WCAG contrast, compute this yourself before ever emitting a token (matches the backend `contrast-ratio.ts` exactly):
```
srgbToLinear(c) = c/255 <= 0.03928 ? (c/255)/12.92 : ((c/255+0.055)/1.055)^2.4
L = 0.2126*srgbToLinear(R) + 0.7152*srgbToLinear(G) + 0.0722*srgbToLinear(B)
ratio(A,B) = (max(L_A,L_B)+0.05) / (min(L_A,L_B)+0.05)   // 1..21, need >= 4.5 for the 6 text pairs
```
Rule when a pair fails: darken or lighten the FOREGROUND token (never the background/fill, never the target ratio) and recompute.

Recipe, from a mood/brand seed color to a full palette:
1. Pick `primary` from the event mood/brand. Derive `secondary` as analogous (`Δhue` 20-40°) for harmony or complementary (`Δhue` ~150-180°) for contrast — pick with intent, not randomly; both `primary`/`secondary` feed the frontend's decorative gradients together with `accent`, so keep them harmonizing.
2. `accent`: `Δhue >= 30°` from `primary` (or its complement), for a deliberate highlight — never a leftover default.
3. `background`/`surface`: very light tints of `primary`'s hue (not pure `#ffffff`/`#f9fafb` unless the brand is genuinely neutral); `surface` slightly lighter or more saturated than `background` so cards read as separate.
4. `text`: a deep shade of `primary`'s hue (not pure black) — only if it still clears 4.5 on `background`; fall back to near-black if the hue-tinted version fails.
5. `textMuted`: a mid-dark shade of the same hue that clears 4.5 on BOTH `background` and `surface` — check both, they can diverge.
6. `surfaceBorder`/`divider`: soft tints between `background` and `text` in lightness — visible but quiet, no fixed formula, eyeball ΔL >= 0.04 from `surface`.
7. `onPrimary`/`onSecondary`: pick white or near-black (`#111827`) per pair, whichever clears 4.5 against that pair's fill — compute both, keep the higher.
8. Run the full guardrail table above on the result; show `token | hex | contrast checks` to the operator before the preview call.

## Worked examples (verified with the formula above, all 6 pairs >= 4.5)

| Palette | primary/onPrimary | secondary/onSecondary | surface/onSurface | background/text | background/textMuted | surface/textMuted |
|---|---|---|---|---|---|---|
| Pink XV (quinceañera) | `#db2777`/`#ffffff` = 4.60 | `#7c3aed`/`#ffffff` = 5.70 | `#ffffff`/`#4a044e` = 14.80 | `#fdf2f8`/`#4a044e` = 13.56 | `#fdf2f8`/`#86198f` = 7.54 | `#ffffff`/`#86198f` = 8.24 |
| Elegant green/gold wedding | `#14532d`/`#ffffff` = 9.11 | `#92400e`/`#ffffff` = 7.09 | `#ffffff`/`#1c2b20` = 14.83 | `#f6f5ee`/`#1c2b20` = 13.57 | `#f6f5ee`/`#4b5d4f` = 6.45 | `#ffffff`/`#4b5d4f` = 7.05 |
| Corporate navy | `#1e3a5f`/`#ffffff` = 11.50 | `#475569`/`#ffffff` = 7.58 | `#ffffff`/`#111827` = 17.74 | `#f4f6f9`/`#111827` = 16.39 | `#f4f6f9`/`#44546b` = 7.11 | `#ffffff`/`#44546b` = 7.70 |

`background`/`surface`/`accent`/`surfaceBorder`/`divider` for each (not contrast-gated, chosen for tint/harmony): Pink XV `background #fdf2f8, surface #ffffff, accent #f59e0b, surfaceBorder/divider #f3d5e8`. Wedding `background #f6f5ee, surface #ffffff, accent #ca8a04, surfaceBorder/divider #e3e0cf`. Navy `background #f4f6f9, surface #ffffff, accent #0ea5e9, surfaceBorder/divider #dbe3ee`.

Known trap, do not repeat it: `primary #ec4899` + `onPrimary #ffffff` = 3.53 (fails 4.5 — use `#db2777` or darker), and `textMuted #9ca3af` on a light pink `background` = 2.33 (fails hard) — a pastel-looking hex is not automatically AA-safe; always compute.

## Seed derivation (operator gives only one brand color)

1. Convert the seed to OKLCH; keep its hue `h` for every role unless stated.
2. Propose, light mode: `background` `L~0.95 C<=0.02` hue `h`; `surface` `L 0.99-1.0 C<=0.01` (ΔL>=0.04 from `background`); `surfaceBorder` `L~0.88 C<=0.03`, `divider` `L~0.90`; `primary` the seed, lower `L` (keep `h`,`C`) until it clears 4.5 vs its `onPrimary`; `secondary` hue `h`, `C` about half the seed, `L` shifted `>=0.10` from `primary`; `accent` hue `h+30..60°` (or complement); `text` `L~0.20 C<=0.02` hue `h`; `textMuted` `L~0.45` (must still hit 4.5 on `background` and `surface`); on-colors per `field-rules.md`.
3. Run the guardrail table on the proposed set; show `token | hex | L C h | checks`.
4. Show every adjustment made to the seed (e.g. "primary darkened from L 0.86 to 0.62 to reach 4.5"); never hide it. Operator confirms pair by pair.
5. Extreme seeds (very light yellows, near-black, low-chroma grays): say the seed cannot be `primary` unchanged and propose the adjusted value explicitly.

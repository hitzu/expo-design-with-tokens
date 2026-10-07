# Field-to-element rules

Each token maps to exactly one UI role. Use supplied values as final: never derive effects (opacity, gradients, tints) from them, and never silently reuse one field for another role.

| Field | Applies to | Rule |
|---|---|---|
| `background` | Page background | Opaque solid color (`#rgb`/`#rrggbb`, no alpha). Never reused automatically for buttons or photo overlays. |
| `text` | Text directly on the page background | Must contrast with `background`. Not a universal foreground. |
| `textMuted` | Supporting text | Explicit readable color, not reduced opacity of `text`. Validate against every background where it is used (`background`, `surface`). |
| `surface` | Cards and content panels | Opaque color with clear separation from `background`. No locally generated transparency or gradients. |
| `onSurface` | Text and monochrome icons inside surfaces | Required whenever `surface` is set. Never substitute `accent`. |
| `primary` | Primary action background | Final supplied color, not a starting point for generating effects. |
| `onPrimary` | Primary action text/icons | Validated together with `primary`. Never assume white. |
| `secondary` / `onSecondary` | Secondary filled actions | Independent validated pair. `onSecondary` never inherits `onPrimary` automatically. |
| `surfaceBorder` | Card/panel boundaries | Apply unchanged. No locally added transparency. |
| `divider` | Internal separators | Apply unchanged; never derive from other colors. |
| `accent` | Decorative emphasis | Not a default text or link color. |
| `surfaceShadow` | Surface elevation | Apply the supplied validated shadow unchanged; omit when absent (do not invent one). |
| `fontHeading` / `fontBody` | Heading / body typography | Pick a pairing from `references/fonts.md` by event type + tone. Never propose a non-web system font (Futura, Helvetica, Avenir, …) — it only renders on devices that already have it installed; Google Fonts only. If the pairing isn't already loaded by the frontend, emit the font-request note from `fonts.md` instead of silently swapping in a loaded font. |
| `images.background` | Background-image asset | Separate from `background` (the color stays as the fallback). Requires an explicit image-overlay policy. |

## Authoring consequences

- Ask for each pair as a pair: `primary`+`onPrimary`, `secondary`+`onSecondary`, `surface`+`onSurface`, `background`+`text`, and `textMuted` against both `background` and `surface`. All six pairs need >= 4.5 (WCAG AA, `references/api-flow.md`). Propose the on-color with the higher computed contrast and get operator confirmation; a computed proposal is not an assumption.
- `textMuted`: confirm it passes >= 4.5 against `background` and, if a surface is set, against `surface`; report both ratios.
- `surface` vs `background` (and every other cross-layer relation): apply the thresholds in `layers.md`; ask for a different surface or a `surfaceBorder` on fail.
- Reject 8-digit hex (alpha) for `background` and `surface`; ask for an opaque color instead.
- Never fill `accent` into text/link roles, or `background` into button roles, to "complete" a palette.
- `images.background`: the API has no overlay field (`theme.types.ts`). Do not emit the slot until the operator states the overlay policy (none / darken / lighten, and why text stays readable over the image); record that policy under open questions in the output.

## API format gates (`bookandsign-api/src/events/theme/validate-theme-overrides.ts`)

Re-read the validator when in doubt; it wins over this table. Check every payload against these BEFORE the preview call.

| Field | Accepted format | Example | Rejected |
|---|---|---|---|
| All 12 color tokens | `^#[0-9a-fA-F]{6}$` (opaque, 6 digits) | `#2F6D9E` | `#fff`, `#2F6D9E80`, `rgb(...)`, names |
| `surfaceShadow` | `0 <y>px <blur>px rgb(R G B / A)` — x always `0`, y 0-99, blur 0-999, space-separated `rgb`, alpha `0`..`1` after ` / ` | `0 18px 44px rgb(18 51 76 / 0.12)` | `rgba(18,51,76,0.12)`, commas, `#hex`, spread value, multiple shadows, `inset` |
| `fontHeading` / `fontBody` / `surfaceShadow` | string | | numbers, objects |
| Token keys | only the 12 colors + `fontHeading`, `fontBody`, `surfaceShadow` | | any other key → `unknown token` |
| Required after merge | `background`, `text`, `textMuted`, `surface`, `onSurface`, `primary`, `onPrimary`, `secondary`, `onSecondary`, `surfaceBorder`, `divider` (`accent` optional, falls back to `primary`) | | missing → `is required` |
| Image slots | `logo`, `splashIcon`, `hero`, `watermark`, `background`, `cover`; `url` https; `cover.link` https | | http, unknown slot |
| Text placeholders | only `{{honoreesName}}`; `fallback` has none | | other placeholders |

Convert any `rgba(r,g,b,a)` shadow the operator supplies to `rgb(r g b / a)` and say so.

## Frontend reality for `accent`

The public CTA card renders its heading in `--ep-accent` (`social-media-cta.module.css` `.pageTitulo`, 22px bold = large text). So `accent` must reach >= 3.0 against `surface` (WCAG large text), aim for 4.5. Report this ratio in the contrast table even though the API does not gate it.

## Fixed brand colors (not themeable)

The `PrimaryActionButton` uses the social network's brand color per channel (WhatsApp green, Facebook blue, Instagram gradient, TikTok black); only channel `url` takes `primary`. Tell the operator a WhatsApp CTA will be green regardless of the palette.

# Font catalog (Google Fonts only)

Never propose a non-web system font (Futura, Helvetica, Avenir, Gotham, …): it only renders on devices that already have it installed, so the browser silently falls back to a generic serif/sans. Google Fonts only, always.

## Already loaded by the frontend (`_document.tsx`)

DM Sans, Dancing Script, Playfair Display, Cormorant Garamond, Amsterdam One, Inter, Quicksand. Prefer these — zero extra work, they render immediately.

## Pairings by event type + brand tone

Each pairing is `fontHeading` + `fontBody`. "Loaded" = already in `_document.tsx`; anything else needs a font request (below).

| Event type | Tone | fontHeading | fontBody | Loaded? |
|---|---|---|---|---|
| XV / quinceañera | elegant | Playfair Display | DM Sans | yes |
| XV / quinceañera | playful | Amsterdam One | DM Sans | yes |
| Boda (wedding) | elegant / luxury | Cormorant Garamond | DM Sans | yes |
| Boda (wedding) | romantic script accent | Dancing Script | Cormorant Garamond | yes |
| Bautizo / baby shower | soft / minimal | Playfair Display | Inter | yes |
| Bautizo / baby shower | playful | Amsterdam One | Inter | yes |
| Cumpleaños infantil | playful | Amsterdam One | DM Sans | yes |
| Cumpleaños infantil | modern | Fredoka | Nunito | **needs request** |
| Corporativo / empresa | modern / minimal | Inter | Inter | yes |
| Corporativo / empresa | luxury | Playfair Display | Inter | yes |
| Graduación | modern | DM Sans | Inter | yes |
| Graduación | elegant | Cormorant Garamond | DM Sans | yes |
| Any | luxury alt (not yet loaded) | Libre Baskerville | Lato | **needs request** |
| Any | modern alt (not yet loaded) | Sora | Manrope | **needs request** |

## Font request note (when proposing an unloaded pairing)

The skill MAY propose an unloaded pairing when it is clearly the better fit, but must then output, verbatim, a note like:

```
FONT REQUEST for frontend (_document.tsx):
Add to the Google Fonts <link> family list:
  Fredoka:wght@400;500;600;700
  Nunito:wght@400;500;600;700
Until this is added, fontHeading "Fredoka" / fontBody "Nunito" will fall back to the browser default — do not persist this pairing before the request is fulfilled, or fall back to a loaded pairing and confirm with the operator.
```

Get explicit operator confirmation before persisting an unloaded pairing: either they accept the temporary fallback risk, or the skill switches to a loaded pairing instead.

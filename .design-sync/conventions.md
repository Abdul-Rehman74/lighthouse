# Lighthouse Daycare — Design System Conventions

## Fonts

Three families, loaded via `styles.css`:

| Variable | Family | Use |
|---|---|---|
| `--font-display` | Fraunces | Headings, big stats, hero text |
| `--font-body` | Nunito | Body copy, labels, UI text |
| `--font-hand` | Caveat | Eyebrows, handwritten accents |

## Color palette

Key semantic tokens from `_ds_bundle.css`:

| Name | Value | Use |
|---|---|---|
| Sun yellow | `#FBBF24` / `bg-sun-*` | Primary CTA, buttons, highlights |
| Coral | `#F87171` / `text-coral-*` | Accent headings, eyebrow tints |
| Mint | `#6EE7B7` / `bg-mint-*` | Value cards, filter badges |
| Sky | `#BAE6FD` / `bg-sky-*` | TiltCard sky variant |
| Charcoal | `#1F2A37` | Primary dark bg (nav, footer, DailyRoutine) |
| Cream | `#FEFCE8` / `#FFF9E8` | Page background, card fills |

## Component patterns

- **Eyebrow** — always precedes a heading. Pass `color="coral"` (default), `"mint"`, `"sun"`, or `"onDark"`.
- **Button** — `variant="sun"` is the primary CTA; `"ghost"` for secondary; `"whatsapp"` for green WhatsApp actions.
- **PhotoPlaceholder** — self-contained scene illustrations. `scene` ∈ `play | art | food | learn | nap | outdoor | care`.
- **TiltCard** — feature card with emoji icon. `color` ∈ `sun | sky | mint | coral`.
- **Polaroid / ScrapbookPhoto** — image frames with tape. `ScrapbookPhoto` adds a handwritten `caption` prop.
- **CTABanner** — full-width inline CTA strip. Three gradient presets: `mintSky`, `sky`, `sunCoral`.

## Layout

- **Container** — max-width 1440 px, auto horizontal padding (20 px → 64 px across breakpoints). Use `as="section"` for semantic wrapping.
- All page-section organisms handle their own padding; nest them directly inside `<Container>` or `<main>`.

## Navigation / routing

Next.js `Link` and `Image` are shimmed to plain `<a>` / `<img>` in the bundle for browser rendering. All `href` props work as expected; no router context is required.

# Design system

Dark, glass, and a single electric accent. The page is always `.dark`. Body background is `#03060d`, with blue radial glows and a faint warm bloom at the upper right. Home adds `.hero-sky`: a star field over the same navy.

## Color

Tokens are set in `app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| `--background` | `#05070c` | App background token |
| `--foreground` | `#e8f1fb` | Body text |
| `--card` / `--popover` | `#0b1018` / `#0e1520` | Panels and menus |
| `--muted-foreground` | `#8aa0b8` | Secondary copy |
| `--electric` / `--primary` | `#4db8ff` | Links, progress, primary buttons, selection |
| `--guardian` / `--destructive` | `#ff3355` | Unread dot, destructive, threat emphasis |
| `--border` / `--input` | `#1c2838` | Controls |

Chart extras used in group hues: mint `#5ee0b5`, violet `#9b8afb`. Primary button text on electric is `#041018`.

Obsidian, electric blue, and guardian red are the three brand colors. Do not introduce a light theme.

## Type

- UI: Geist (`--font-sans`)
- Headings: Space Grotesk (`.font-heading`)
- Mono: Geist Mono, used for percents and certificate ids

Section labels are 11px, tracked out, uppercase, electric. Page titles are `font-heading` at `text-3xl`, the home hero at `text-4xl` / `text-5xl`.

## Glass

`Glass` is a `rounded-2xl` panel: `border-white/10`, `bg-white/[0.045]`, a soft electric shadow, and `backdrop-blur-2xl`. Hoverable tiles add `hover:border-electric/40`.

Header and mobile bar use the same navy glass, sticky or fixed, `z-40`.

Radius scale starts at `--radius: 0.85rem`. Pills (nav, chips, primary CTAs) are `rounded-full`.

## Emblem and motion

The home emblem is the circular network badge (`public/emblem.webp`) with a slow 28s orbit (`.emblem-orbit`) and a 6s glow pulse (`.emblem-glow`). Orbit nodes are hit targets. The wordmark in the header is the circuit mark plus “4SightAI Network”.

Hero art is `public/hero-earth.webp` behind the constellation grid. Favicons are `public/favicon.png` and `public/favicon.svg`.

## Print

`@page` is landscape with a 0.35in margin. Print strips the header, footer, mobile bar, and the body glow so the certificate art can fill the sheet.

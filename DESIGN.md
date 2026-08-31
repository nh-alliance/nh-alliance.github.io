# NHA Visual System

## Direction

The physical scene is a clan archive inside Alliance Spire at blue hour,
looking across a rain-washed world that has no edge. The interface feels
architectural and inhabited, with large cinematic fields, precise records,
and quiet green and blue light.

## Color Strategy

Committed near-black with moss green as the clan anchor and electric blue as
the secondary lineage color.

```css
--void: oklch(0.08 0 0);
--night: oklch(0.13 0.012 140);
--surface: oklch(0.18 0.018 140);
--ink: oklch(0.96 0.008 140);
--muted: oklch(0.74 0.026 140);
--green: oklch(0.75 0.09 140);
--green-deep: oklch(0.56 0.14 140);
--blue: oklch(0.72 0.14 245);
--starlight: oklch(0.9 0.025 220);
```

## Typography

- Aldrich for the clan name, member names, navigation, and coordinates.
- Barlow for statements, records, quotes, and long-form copy.
- Display text remains below 6rem with letter spacing no tighter than -0.03em.

## Composition

- Full-bleed cinematic opening portrait.
- A panoramic planet view with interactive geographic records.
- Asymmetric founder hierarchy: Artemis leads; Tala and Adara flank.
- Extended members appear as a living register, not identical profile cards.
- Fine rules and coordinate labels evoke a maintained clan archive.

## Motion

- One orchestrated first-load reveal in the hero.
- Slow ambient movement in stars and map markers.
- No content depends on animation for visibility.
- Reduced-motion mode disables all transforms and looping effects.

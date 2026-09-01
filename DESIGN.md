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

## The Forum

Every JKA clan has a forum, so this one does. It is boards and threads, not a
wall per person: there are no member profile pages and nothing links to one.

- **Five boards, fixed.** The duelling floor, Allies and outsiders, The Circle
  together, The road, Portraits. A post lands in the board its moment belongs
  to. A duel won and a duel lost file to the same board; there is no losers'
  page.
- **A post is a photograph with a line under it.** The member took the frame
  herself at the moment it happened, and wrote the line in her own voice.
- **Attribution is inline, the way a forum post carries it** — her name in her
  saber colour, her responsibility, what it is filed under, the time, the map.
  It does not need a page behind it.
- **Threads are for answering.** `post.json` carries a `replies` array; another
  member, or the First Ally, adds to it and it renders under the post.

Visually it is the record pages' chrome and nothing new: `.page-record`,
`.section-shell`, `.record-label`, `.action`, hairlines at `--rule`, Aldrich for
names and coordinates, Barlow for what she said. No rounded cards, no avatars,
no counters. A frame is never enlarged past the pixels the client captured, and
carries its real `width`/`height`, so nothing moves when it loads.

`tools/posted.ts` in the Everreach runtime writes every page under `forum/`; the
classes it emits are all defined in `styles.css`. Two of them, `[data-saber]` on
`.post` and `.post-role`, are read when present and ignored when absent.

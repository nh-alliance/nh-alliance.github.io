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

Every JKA clan had a forum, so this one does, and it is built to the shape a
clan board actually had: boards, threads and posts, not a wall per person.
There are no member profile pages and nothing links to one.

**Three pages, and they are what make it read as a board.**

- **The board index** (`forum/`) is five rows under a header bar, each with the
  board's name, its one-line description, how many threads and how many posts
  are on it, and a last-post column naming the thread, who posted it and when.
  Under it: the three newest frames, the six newest threads, and a statistics
  line. A board with nothing on it still prints a row, and says so.
- **A board** (`forum/<board>/`) lists THREADS, newest activity first: the
  moment it is filed under worn as a tag in front of the title, who opened it
  and when, how many replies it has, and who posted last. Twenty-five to a
  page; page two is `forum/<board>/page-2/` and the pager collapses the middle
  to an ellipsis so a board that runs for a year still fits on a line.
- **A thread** (`forum/<board>/<thread>/`) is the photograph as post #1 and
  every reply under it as #2, #3. Each post carries a USER PANEL on the left —
  her name in her saber colour, her responsibility, her saber named in words
  beside its chip, and how many posts on this board are hers — with the body
  on the right, the subject line above it, and the post number on the right as
  a permalink. Below: newer and older thread, and the way back.

Breadcrumbs sit across the top of all three, in the archive's own `//`.

**Nothing is postable.** No compose box, no login, no reply form. Nobody posts
through this page, and it does not pretend they can. The chrome is real and
the machinery is deliberately absent.

**Five boards, fixed.** The duelling floor, Allies and outsiders, The Circle
together, The road, Portraits. A post lands in the board its moment belongs
to. A duel won and a duel lost file to the same board; there is no losers'
page.

**A thread's title is derived, never typed.** It is built from the moment, the
other player, the map and who was in the frame — all of it already in the
sidecar the client wrote. Nothing about a title can put a fact on the page
that the post does not already carry.

**Threads are for answering.** `post.json` carries a `replies` array; another
member, or the First Ally, adds to it and it renders as the next post in the
thread. A reply may carry an `at`; without one its time is unknown, printed
nowhere and guessed nowhere, and the last-post column falls back to the newest
time anybody actually has.

**A post count is board-local and says so.** The panel reads "On this board",
because publishing rebuilds exactly one board: a site-wide figure would be
right where she just posted and quietly wrong on the other four.

Visually it is the record pages' chrome and nothing new: `.page-record`,
`.section-shell`, `.action`, hairlines at `--rule`, Aldrich for names and
counts, Barlow for what she said. Two tints are added for the header bars and
the row hover, both the green already in the page at very low alpha. No
rounded cards, no avatars. A frame is never enlarged past the pixels the
client captured and carries its real `width`/`height`, so nothing moves when
it loads.

`tools/posted.ts` in the Everreach runtime writes every page under `forum/`;
the classes it emits are all defined in `styles.css`. `[data-saber]` on
`.fpost` is read when present and ignored when absent, and saber colour is
never the only carrier of a fact.

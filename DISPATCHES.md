# Dispatches — RETIRED, 3 September 2026

**The dispatch section is retired. Nothing on this site links to it any more,
and nothing publishes into it. Every file it ever produced is still here, on
purpose.**

## Why

An arrival has exactly one licensed fact in it, so a dispatch about one could
never say anything the headline had not already said. "Tala finished tending
The Workshops" carried the body "I finished tending The Workshops." Four
near-identical pieces were filed about Artemis walking into The Open Court, and
three of them closed on the same stock line. The form only ever worked where
the moment had a SEQUENCE — a duel, a sitting — and the forum already carries
those, photographed at the frame they ended on.

## What was done

- The **Dispatches** link is gone from the primary navigation on every page:
  `index.html`, all of `forum/**`, and the dispatch pages themselves.
- The home page's dispatch section — the four beats and the "Most recent"
  teaser, marker and all — is gone. The forum section now carries the record.
- `sitemap.xml` lists no dispatch URL. The `dispatch-urls` marker pair is left
  in place, empty, so a revival can repopulate it.
- `robots.txt` disallows `/dispatches/` outright. It previously disallowed only
  `/dispatches/_template/`; the broader rule keeps the templates out of an
  index exactly as before and stops crawlers being pointed at the rest.
- In the Everreach runtime, `DISPATCHES_RETIRED` in
  `src/chronicle/supervisor.ts` holds the press permanently shut. The press gate
  asks it FIRST, before the `data/press.OFF` kill switch, the backoff and the
  real-day cap, so a retired press cannot be talked open by clearing the
  day-to-day switch. It reaches the gate as `PressSupervisorOptions.retired`,
  defaulted from the constant, so the kill switch, backoff and cap machinery
  kept for a revival stays reachable and stays tested; `supervisor.selfcheck.ts`
  exercises both sides. The Chronicle code is untouched otherwise. Forum posting
  (`tools/posted.ts`) is a separate path and is unaffected.

## What was deliberately NOT done

**Nothing was deleted.** `dispatches/` keeps every page, every `dispatch.json`,
every photograph, `dispatches/index.html`, and the whole `_template/` markup
contract. The thirteen dispatch URLs still resolve for anyone who has one; they
are simply not linked or advertised anywhere. The CSS for the dispatch pages
stays in `styles.css` and the beat filter stays in `script.js`, because those
pages still have to render.

## Reviving it

Flip `DISPATCHES_RETIRED` to `false` in
the Everreach runtime's `src/chronicle/supervisor.ts`, put the nav link
back, and re-add the `dispatch-latest` region to `index.html` — the press warns
and leaves the home page alone while that marker is absent.

---

The rest of this file is the markup contract as it stood at retirement, kept
because the pages it describes are still on disk and still served.

# Dispatch markup

The dispatch pages are part of the clan record, not a blog bolted to its side.
They use the tokens, typefaces, spacing, and restraint already defined in
`styles.css` and `DESIGN.md`. Nothing here introduces a second design system.

Every page is static HTML and reads top to bottom with scripting disabled.

## Files

| Path | Written by hand | Regenerated |
| --- | --- | --- |
| `index.html` | yes | the `dispatch-latest` region only |
| `dispatches/index.html` | yes | the `dispatch-entries` region only |
| `dispatches/<slug>/index.html` | no | whole file, from `_template/dispatch.html` |
| `dispatches/<slug>/photo.jpg` | no | written only where the piece has a frame |
| `dispatches/<slug>/plate.json` | no | the plate's words and the frame's size |
| `sitemap.xml` | yes | the `dispatch-urls` region only |
| `dispatches/_template/*` | yes | never |

`dispatches/_template/` holds the markup contract. It is excluded in
`robots.txt`, which is what keeps the templates themselves out of an index.
The template's own `robots` meta is inherited by every generated dispatch, so
it says `index, follow`: the dispatches are listed in `sitemap.xml` and a page
that asks to be crawled and refuses to be indexed in the same breath is just a
contradiction shipped twice.

## Marked regions

Four HTML comment pairs delimit the regions that change. Everything outside a
pair is authored and must survive untouched.

```
<!-- dispatch-latest:start -->   … <!-- dispatch-latest:end -->     index.html
<!-- dispatch-entries:start -->  … <!-- dispatch-entries:end --> dispatches/index.html
<!-- dispatch-urls:start -->     … <!-- dispatch-urls:end -->    sitemap.xml
<!-- passages:start -->          … <!-- passages:end -->         _template/dispatch.html
<!-- corrected-by:start -->      … <!-- corrected-by:end -->     _template/dispatch.html
<!-- standfirst:start -->        … <!-- standfirst:end -->       _template/dispatch.html
```

Each region ships with a fallback that the first write replaces:

- `dispatch-latest` and `dispatch-entries` hold an empty-state paragraph
  (`.record-empty`). Replace it with `<ul class="latest-list" role="list">` and
  `<ol class="dispatch-list" role="list" data-dispatch-list>` respectively.
  The explicit `role="list"` is load-bearing, not decoration: every list on
  this site is styled `list-style: none`, and WebKit strips list semantics from
  a list styled that way, so without it VoiceOver reads the record as seven
  unrelated blocks with no count and no list navigation.
- `corrected-by` and `passages` are empty.
- `standfirst` wraps the standfirst paragraph. Drop the whole region, markers
  and all, when a piece has none.

## Placeholders

`{{TOKEN}}`. Every value is HTML-escaped before substitution — a headline with
`&` or `<` in it must not be able to change the shape of the page.

| Token | Source |
| --- | --- |
| `SLUG` | the piece's slug, `0142-the-gate-held-until-morning` |
| `ORDINAL` | the slug's numeric prefix, `0142` |
| `BEAT` | the beat key, used only as a filter attribute |
| `SECTION` | the printed section name, `The Open Court` |
| `HEADLINE`, `STANDFIRST`, `SUMMARY` | display text; `SUMMARY` falls back to the headline |
| `BYLINE_NAME`, `BYLINE_TITLE` | the individual who wrote it, and her standing |
| `SABER` | `green`, `blue`, or empty — tints her name and nothing else |
| `DATELINE` | place and world time, `The Open Court, Day 214 · duskfall` |
| `DATE`, `DATE_LONG` | `2026-08-29` for `datetime`; `29 August 2026` for the reader |
| `DAY`, `PHASE` | world day and world phase |
| `TEXT`, `ASKED`, `SAID` | one passage, and the display name of whoever spoke |
| `CORRECTS`, `CORRECTED_BY` | the other piece's slug; `_ORDINAL` is its prefix |
| `SRC`, `ALT` | the plate's own file name, beside the page, and its description |
| `WIDTH`, `HEIGHT` | the frame's real pixels, read from the JPEG's own header |
| `THUMB` | the thumb fragment, or the empty string — see **Photographs** |
| `THUMB_SRC`, `THUMB_W`, `THUMB_H`, `THUMB_ALT` | inside the thumb fragment only |

The `photo` fragment may also use any placeholder the page skeleton can. It is
spliced into the skeleton **before** the skeleton is filled, so `{{BYLINE_NAME}}`
and `{{DATELINE}}` written inside a figure are filled with the rest of the page.
That is where the credit under a photograph comes from, and it is the reason
there is no second, unwitnessed record of who took what.

The byline's own site slug is deliberately not printed. There are no member
pages yet, so a name that linked nowhere would be worse than a name.

## Passages

One fragment per passage kind, in `_template/passages.html`. Join with
newlines and splice between the `passages` markers.

A run of consecutive `question`, `answer`, and `abstention` passages is wrapped
once in `<div class="dialogue">`, so an interview reads as one exchange between
two named people rather than a stack of unrelated blocks. Any other passage
kind closes the run.

An `abstention` renders beside the name of the member who was asked, in
italic. It is an outcome, not a gap, and it is never dropped. Its line is the
interviewer's report, not the member's words, so the fragment carries two
`.sr-only` qualifiers — `, asked` after the name and `No answer given.` before
the line — to stop a screen reader announcing "Nira: she declined to say" as
something Nira said. The `answer` fragment carries neither: those are her
words, typographically quoted.

## Photographs

A member playing Jedi Academy photographs a real moment; the client writes a
JSON sidecar beside the JPEG; the world ingests that sidecar as an event in its
own journal; and the piece is grounded on the event like any other claim. By
the time a frame reaches this repository it has already been bound to the log,
stripped of every metadata segment, and audited. Nothing here re-litigates any
of that. What the markup owes it is three things.

**A photograph is evidence, so it takes the measure of the evidence.** The
plate sits in the body column at the same 68ch as the paragraphs around it,
with the same hairline the rest of the record is ruled with. It is not a hero
image and must not be allowed to become one.

**Nothing moves when it loads.** `WIDTH` and `HEIGHT` are the frame's own
pixels, read out of the JPEG's start-of-frame header rather than claimed by the
sidecar. With `width: 100%` and `height: auto` the browser knows the ratio
before a byte of the picture arrives and reserves the exact box. `loading="lazy"`
and `decoding="async"` keep the picture from delaying the words, which are the
part of the page that matters.

**A dispatch without one is untouched.** The figure is emitted only where a
plate exists AND the passage carrying its caption is in the piece, so an
uncaptioned photograph never prints. `{{THUMB}}` is the thumb fragment for a
piece whose frame is on the site and the empty string for every other piece —
no empty element, no reserved column, no row moving because a neighbour has a
picture. All ten pieces filed before there were photographs render byte for
byte as they do today, and that is checked rather than assumed.

**Alt text.** On the dispatch page it is derived from the sidecar's facts and
describes *the frame* — who is in it, and, for a portrait, that she is facing
the camera. It never asserts an outcome; the claims are the caption's business
and the caption is licensed by the log. On the index thumbnail it is empty on
purpose: that image sits inside the row's own link, whose text already names
the piece, its section and its author, and a description there would be
concatenated into the link's accessible name so every row announced itself
twice.

**The credit.** `Photographed by {{BYLINE_NAME}}` and `{{DATELINE}}` — who took
it, where, and when in her world time — set in the same type as the signature
at the head of the piece, because it is one. Her name carries her saber tint
through the inherited `--member-color`, exactly as it does in the signature and
in the index.

## Rules the markup enforces

- **Individual bylines.** One name per page, in the head and again in the
  sign-off. There is no clan byline and no house voice. The sign-off prints
  `{{BYLINE_NAME}}, {{BYLINE_TITLE}}.` and stops there: five of the eight
  standings already contain "of" (`Shield of the Circle`, `Architect of
  Everreach`, `Steward of the Wilds`), so appending "of the Neo-Human
  Alliance" produced "Architect of Everreach of the Neo-Human Alliance".
- **Third parties by handle.** Whatever reaches `SAID`, `ASKED`, or body text
  is printed verbatim. Nothing on this side of the line can turn a handle back
  into a person.
- **Corrections leave the record standing.** A corrected page keeps its URL,
  its text, and its place in the index, and gains a `.dispatch-notice` naming
  the piece that corrected it. Nothing is quietly rewritten.
- **No implementation on the page.** The page describes people and their world.
  There is no field on any template for anything else.

## Responsive

Verified with zero horizontal overflow at 320, 360, 390, 430, 620, 768, 900,
1024, 1280, and 1600 — measured against real pages, including one whose
standfirst carries a 37-character handle, and re-measured at 390, 768 and 1440
against a real dispatch carrying a 1920x1080 photograph and an index carrying
its thumbnail. Keep it that way:

- no `100vw` anywhere — use `--content`, `100%`, or `min()`;
- every grid track is `minmax(0, …)`, never a bare `1fr`;
- an image is `width: 100%; height: auto` inside a column that is already
  bounded. It never carries a pixel width in CSS, and its `max-width` caps are
  in the thumbnail only, where the picture is a mark rather than the subject;
- long unbroken strings need `overflow-wrap: break-word`. This is the rule that
  breaks first. A third party's handle is one token and can be arbitrarily
  long, and it reaches `HEADLINE`, `STANDFIRST`, `ASKED`, `SAID`, and body text
  alike. Every class that can hold one carries the property: `.record-lead`,
  `.dispatch-standfirst`, `.dispatch-entry-standfirst`, `.dispatch-signoff`,
  `.latest-sign`, `.dispatch-signature p`, and `.dispatch-entry-meta > *`,
  alongside the headline and body classes that already had it.

Check overflow at the document, not at the element: a paragraph that is too
narrow for its content overflows without its own box ever growing, so a
right-edge scan of `getBoundingClientRect()` misses it. Compare
`documentElement.scrollWidth` with `clientWidth`, then find the element whose
`scrollWidth` exceeds its `clientWidth`.

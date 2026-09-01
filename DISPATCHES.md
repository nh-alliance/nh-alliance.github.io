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
standfirst carries a 37-character handle. Keep it that way:

- no `100vw` anywhere — use `--content`, `100%`, or `min()`;
- every grid track is `minmax(0, …)`, never a bare `1fr`;
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

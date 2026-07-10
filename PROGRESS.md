# PROGRESS.md — Production Log

> Living doc. Update this whenever a session ends or a major decision lands, so any
> session (or any parallel chat) can pick up cleanly. See `CLAUDE.md` for the brief,
> `ASSETS.md` for the image-generation manifest, `projects.md` for Issue #3 source facts.

---

## Stack

Astro (static output), self-hosted fonts, no CSS framework, `astro:assets` for all
images (never `public/` for source art — see ASSETS.md). Deploy target: Vercel.

## Design system (locked)

- **Palette** (`src/styles/global.css`): ink `#1A1A1A`, paper `#F4EDDA`, paper-dim
  `#ECE3CD`, crimson `#9E3426`, teal `#1B7A72`, gold `#C68A1F` — plus a dark-mode set
  (lighter ink/teal/gold for contrast on the near-black paper) that responds to
  `prefers-color-scheme` and an explicit `data-theme` override. **Crimson is the one
  exception: `#9E3426` in every theme** — the dark theme deliberately does NOT lighten
  it (earlier `#ff6b57`/`#c1503c` read as salmon/pink and clashed with the crimson in
  Issues #3–5). It stays legible on dark because the comic titles carry a cream
  (ink-token) drop-shadow that outlines them.
- **Forced per-issue theming**: `.theme-dark` / `.theme-light` utility classes
  *override* the visitor's OS preference, regardless of system theme. The rhythm is
  **dark → cream → dark → cream** by issue: #1 Origin + #2 Powers dark, #3 Team-Ups
  cream, #4 Side Quests dark (its teal graph-paper atmosphere reads as a chalkboard —
  fitting for tutoring), #5 Contact cream. `index.astro` wraps each run in its own
  `.theme-*.issue-block`. This is deliberate: the dark↔cream shifts are a core part of
  the aesthetic and must always read, not just in light mode. Each boundary gets a
  `HalftoneDivider` (below). A manual theme-toggle UI (using the `data-theme`
  attribute the CSS already supports) hasn't been built yet — open item.
- **Text selection** (`::selection` in `global.css`): on-theme ink-on-paper instead of
  browser blue, inverted per issue and scoped by the theme wrappers — cream areas get a
  black highlight with cream text, dark areas a cream highlight with dark text
  (`text-shadow: none` so titles' offset shadow doesn't muddy it).
- **Type**: Bangers (display/covers) + Spectral (body) — locked pairing, see the
  type-pairings artifact for the rationale. Self-hosted woff2, Bangers preloaded
  (LCP-critical on the hero).
- **Icons**: hand-drawn inline SVG (not raster) for anything small/repeated —
  monochrome tool logos via `Icon.astro` (`src/assets/icons/*.svg`, sourced from
  simpleicons.org, recolored via `currentColor`), and the 6 skill-category glyphs
  in `CategoryIcon.astro` (drawn from scratch, no external source). Both share a
  `feTurbulence`/`feDisplacementMap` "ink-wobble" filter for a sketched feel.

## Components (`src/components/`)

- `Panel.astro` — the base bordered/shadowed/tilted comic panel, used everywhere.
- `SpeechBubble.astro` — comic dialogue bubble with a tail; now used for Issue #4
  tutoring testimonials.
- `Icon.astro` / `CategoryIcon.astro` — see above.
- `SkillBadge.astro` — skill tag pill, dashed border + "Learning" tag when
  `learning: true`.
- `PowerBar.astro` — pencil/crayon-style stat bar (Pure Mathematics section).
- `ProjectCard.astro` — Issue #3 project card: poster block (text-only placeholder,
  no generated art yet), links, and a native `<details>`-based "Director's Cut"
  toggle (deliberately not JS/hover-driven — see "Lessons learned" below).
- **`HalftoneDivider.astro`** — a Ben-Day halftone dot dissolve at each dark↔light
  boundary (three, given the dark/cream/dark/cream rhythm). Takes a `direction`
  (`dark-to-light` / `light-to-dark`). Two half-cell-offset dot grids (`::before` /
  `::after`) interleave: the destination colour's dots bleed in from the start edge
  while the source colour's dots recede toward the end, over a gentle base gradient —
  one colour dissolving into the other. Static — no scroll animation. Colours hardcoded
  because it sits *between* the theme wrappers (theme tokens there resolve to the wrong
  OS-theme value). (History at these boundaries: an animated torn-page divider, then a
  bold ink gutter bar — both removed; this dissolve replaced them.)
- **Dot-grid phase across boundaries:** each `.issue-block`'s dotted background uses
  `background-attachment: fixed` so the grid stays in phase across every boundary
  (anchored to the viewport, not each element's own box — a plain `background-position:
  0 0` only lines up by coincidence).

## Sections (`src/sections/`)

- `Hero.astro` — Issue #1: Origin. Full-bleed hero-cover illustration with the
  title masthead overlaid on the image's own negative space (not separate text
  below it). Desktop: fixed 420px bordered/shadowed frame beside the copy. Mobile:
  full-bleed image, webtoon-style.
- `Powers.astro` — Issue #2: The Powers. 6 skill categories as tilted `Panel`s in a
  responsive grid (1/2/3 columns), each with a `CategoryIcon`, title, and always-
  visible `SkillBadge` tags — no hover/tap toggle (see lessons learned). Plus a
  "Pure Mathematics" panel with 3 `PowerBar`s (placeholder proficiency values —
  Ashfak will tune the numbers in `src/data/skills.ts`).
- `TeamUps.astro` — Issue #3: Team-Ups. 7 real projects as `ProjectCard`s. SME-GPT
  is the flagship — `ProjectCard`'s `.card--hero` styling gives it bigger title/name
  text and a "Flagship" badge, but it no longer spans the full grid row alone (that
  was tried and reverted). Instead, at the ≥1100px breakpoint the grid is 6 columns:
  the first two cards (SME-GPT + AI Search) each `grid-column: span 3` (half the
  row, filling it exclusively between just the two of them), every other card
  `span 2` (a third, for the normal 3-per-row layout from row 2 down). Content is
  100% real, from `projects.md`. Each card now also carries a generated movie-poster
  image (`posterImage`), with the real project name overlaid on the art's empty top
  band (`posterName`/`posterTitleAlign`/`posterTitleSize` handle per-poster fit).
- `SideQuests.astro` — Issue #4: Side Quests (tutoring). Syllabus `Panel`s (real
  syllabi), three `StatBurst` result callouts (105+ / 90% / 100%, seeded so no two
  look alike, POW/BAM/KABOOM on hover), and `SpeechBubble` testimonials. Data in
  `src/data/tutoring.ts` (syllabi + stats real; one real testimonial so far).
- `Contact.astro` — Issue #5: Contact the Hero (back-cover). mailto + GitHub/
  LinkedIn/YouTube/Medium/Letterboxd link badges. Data in `src/data/contact.ts`;
  brand icons pulled from `simple-icons`/`react-icons` (installed `--no-save`, exact
  SVGs copied into `src/assets/icons/`, packages removed) — not hand-drawn.

## Data (`src/data/`)

- `skills.ts` — 6 skill categories + 3 math topics. Well-commented for Ashfak to
  self-edit (add skills, flip `learning: true/false`, tune math `level` numbers).
- `projects.ts` — 7 real projects, structured from `projects.md`. SME-GPT is
  `status: 'ongoing'` (2nd-year, still in progress — not "final year", corrected
  from an earlier draft) with `isHero: true`.

## Interactivity & motion pass (whole page)

Added after all five issues existed, to make the page feel alive and directional
without breaking the mobile-smoothness / Lighthouse-95 / reduced-motion mandate.

- **Reveal engine** (`src/scripts/reveal.ts` + `.js`-gated state machine in
  `global.css`, wired once in `Layout.astro`). Elements marked `data-reveal="fall|
  rise|pop|fade"` start hidden and reveal once. Key design points:
  - Uses the independent `translate`/`scale`/`opacity` properties (never `transform`)
    so a card can fall *and* keep `Panel`'s `transform: rotate` — they compose.
  - `fall` (project/skill cards, panels) is a **keyframe animation** (`reveal-fall`),
    not a transition: it drops in from `-100px` accelerating like gravity, lands, then
    bounces up ~14px and settles — a comic panel tumbling from the sky. (`rise`/`pop`/
    `fade` stay simple transitions.) The animation only runs on `.is-revealed:not(.
    reveal-instant)`, so instant-settled reveals and reduced-motion just snap to final.
  - **Directional for free, no scroll-velocity tracking.** One IntersectionObserver;
    reveals that fire before the first genuine user gesture (`wheel/touchstart/
    keydown/pointerdown`) are *instant* (no animation); on that first gesture a sweep
    settles everything at/above the fold, then animation is armed. So anything reached
    by scrolling **up** — including the whole page above your position after a mid-page
    refresh — is already settled and never animates. Gating on real input (not
    `load`+rAF) is deliberate: browser scroll-restoration lands *after* `load`, so only
    a user gesture reliably signals "restoration is done."
  - **Fail-safe:** hidden state is gated on `html.js` (set inline in `<head>`) and
    fully neutralized under `prefers-reduced-motion`. No-JS / no-IO / reduced-motion
    all get fully-visible static content. Verified: 0 hidden reveal elements in every
    one of those modes.
- **`SectionAtmosphere.astro`** — one low-opacity (~5%), transform-animated,
  `aria-hidden` motif behind each section, giving every issue its own atmosphere:
  `rays` (Origin sunburst), `dots` (Powers halftone drift), `spotlight` (Team-Ups
  cinema sweep), `grid` (Side Quests graph-paper/chalkboard), `backcover` (Contact
  credits rays). Host section is `position: relative; isolation: isolate;` and the
  layer sits at `z-index: -1`, so content stacks above it with no per-child z-index.
  Paused under reduced-motion. The layer is **full-bleed** (`100vw` break-out, not the
  section's max-width column) so on wide monitors the rays/dots reach the viewport
  edges like the dotted background does; `html { overflow-x: clip }` absorbs the
  scrollbar-width overflow so there's never a horizontal scrollbar. The rotating conic
  motifs (`rays`, `backcover`) use a large centred **`300vmax` square**, not the shared
  `inset: -50%` rectangle — a rectangle smaller than the viewport diagonal stops
  covering the corners as it rotates, so you'd see ray ends sweep in and out.
- **Hero rays are bespoke** (not `SectionAtmosphere`): a `.hero__rays` layer in
  `Hero.astro`, full-bleed width but clipped to the hero's own height (so it can't leak
  into Issue #2), with its spin centre shifted on desktop to sit behind the cover
  image's own painted sunburst (~left of centre, matching the framed image) instead of
  the viewport centre — reads as an extension of the image's rays.
- **`ChapterNav.astro`** — fixed vertical I–V rail, real `#issue-N` anchor links +
  an IntersectionObserver scroll-spy setting `aria-current`. Colours are hardcoded
  (not theme tokens) because it floats over both the dark and cream issues; each
  marker is its own always-legible chip (crimson when active). Labels on hover/active
  (desktop), dots-only on mobile. Section roots got `id="issue-1"…"issue-5"`.
- **Per-persona eyebrow tint:** academic issues (Powers, Side Quests) stay teal;
  showcase issues (Team-Ups, Contact) go crimson — contrast-checked on cream (gold
  fails there, crimson passes), so the three cream sections read as distinct.

## Known open items

- **Issue #3 poster art**: DONE — all 7 posters generated and wired
  (`posterImage` in `projects.ts`); this item is resolved. Prompts remain in
  `ASSETS.md` for regeneration.
- **Theme toggle UI**: the CSS supports a manual `data-theme` override but there's
  no visible switch for visitors yet. (Note: the forced per-issue `.theme-dark/
  .theme-light` and the hardcoded-colour ChapterNav mean a global toggle would need
  thought about how it interacts with the intentional per-issue theming.)
- **Issue #4 testimonials**: one real testimonial (Sahana Trisha) is in
  `tutoring.ts`; more to be added as they come in (array is sized to real quotes, no
  placeholders).
- **Pure-scrollbar-drag reveal edge case**: the reveal engine arms animation on
  `wheel/touch/key/pointer`. A desktop user who scrolls *only* by dragging the
  scrollbar (no wheel/key) never arms it, so their reveals show instantly (content
  fully visible, just no fall animation) — an accepted graceful degradation for a
  rare input path.
- **Gemini API image pipeline**: still blocked on Cloud Billing not being enabled
  (`scripts/generate-image.mjs` is ready but unused) — all art so far generated
  manually via ChatGPT's image tool and dropped into `scratchpad/` → `src/assets/`.
  Low priority now since Issue #2's icons ended up hand-drawn instead, but still
  relevant for future poster art.

## Lessons learned (read before touching interaction design)

- **Avoid hover-driven mobile interactions.** Mobile browsers keep `:hover` "stuck"
  after a tap until the user taps elsewhere — confirmed with real touch emulation,
  not just a test artifact. Any `:hover`-gated reveal will not reliably collapse on
  a real phone. Issue #2 was rebuilt from a hover/tap-toggle "brick" layout to a
  simpler always-visible design specifically because of this, plus the accumulated
  complexity of per-breakpoint static-view overrides and height-lock workarounds.
- **Prefer native, JS-free interaction primitives** (`<details>`/`<summary>`) over
  hand-rolled hover/focus/class-toggle logic where the UX allows it — this is why
  `ProjectCard`'s "Director's Cut" uses `<details>` instead of repeating Issue #2's
  original mistake.
- **Astro scoped CSS doesn't cross component boundaries.** A class passed as a
  `class`/`class:list` prop into a child component (e.g. `<Panel class="foo">`)
  carries the *child's* scope attribute, not the parent's — a plain selector for
  `.foo` written in the parent's `<style>` block will never match unless wrapped in
  `:global()`. Hit this twice (once on the hero frame, once on `ProjectCard`'s
  `.card--hero`).
- **Raster art needs a fixed (non-theme-aware) background** wherever it's placed,
  since generated illustrations are baked for a light background — using a theme
  token instead of a literal hex would break in dark mode.
- Any image destined for `astro:assets` optimization must live in `src/assets/`,
  never `public/` — the latter bypasses the responsive `srcset`/format pipeline
  entirely.

## Working agreement reminders

- Two parallel chat sessions have touched this repo in the same day (this one, and
  another that built the forced per-issue theming + the hero-card grid spanning) —
  check `git status`/diffs before assuming which chat wrote what, and watch for
  conflicting edits if both are active at once.
- Playwright's own Chromium download has failed/hung in this environment more than
  once. Don't waste time re-attempting it — launch Playwright against the
  system's installed Microsoft Edge instead:
  `chromium.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' })`.

# ASSETS.md — Image manifest

Every generated image, tracked so we can regenerate consistently.

**Pipeline note:** the brief's original plan was the Gemini API (`scripts/generate-image.mjs`,
kept in the repo for later) to skip the visible sparkle watermark the consumer app adds.
That needs Cloud Billing enabled on the API key's project, which isn't set up yet. For the
hero cover, we ended up generating via ChatGPT's image tool instead (no visible watermark
either way). Revisit the Gemini API path once billing is enabled, for consistency across
assets. Any watermark-free source is fine — the constraint is no visible artifact, not the
specific tool.

All source images live in `src/assets/images/` (not `public/`) so `astro:assets` can process
them into responsive, optimized `srcset`s at build time.

Movie-nod plan (per issue):
- **Issue #1 Origin** — general origin-story cover tone (*Spider-Man* / *Batman Begins*), not one specific poster
- **Issue #2 Powers** — AI/ML skills section, *The Matrix* / *A Beautiful Mind* territory
- **Issue #3 Team-Ups** — each project gets its own specific movie-poster homage matched to what that project does
- **Issue #4 Side Quests** — tutoring section, *Good Will Hunting* / *Dead Poets Society* territory
- **Issue #5 Contact** — closing-credits / back-cover-ad framing

## Status key
`pending` — prompt drafted, not yet generated · `generated` — file exists at target path · `approved` — signed off, in production use

---

## Issue #1 — Origin (hero cover)

| Field | Value |
|---|---|
| Purpose | Hero cover, mobile webtoon layout, above the fold |
| Source path | `src/assets/images/hero-cover.png` |
| Generated via | ChatGPT image tool (ref photo attached) |
| Dimensions | Portrait, ~4:5 |
| Reference photo | `scratchpad/ashfak-ref.jpeg` (gitignored, not committed) |
| Status | generated — pending approval once it's placed in the hero layout |
| Prompt | See below |

```
Illustrate a vintage 1960s-style comic book cover, bold ink-and-halftone style. The
hero, based on the attached reference photo (keep facial likeness, stylize into ink
illustration, not photorealistic), stands in a dynamic three-quarter pose in the
foreground. He wears a simple modern hoodie/jacket, no costume - a civilian hero: a
young student-inventor mixing chalk equations and a laptop glow. Tone: quiet confident
energy like a 1962 Spider-Man cover or Batman Begins, not a spandex superhero.

Background: bold sunburst/ray pattern in Ben-Day halftone dots radiating behind him.

Color palette - strict, no other colors:
ink black #1A1A1A (linework, shading)
paper-cream #F4EDDA (background)
crimson #C62D2D (dominant accent - sunburst rays)
teal #1B7A72 (secondary accent - equations, screen glow)
gold #C68A1F (sparingly - one small starburst badge)

Composition: portrait, vertical 3:4 comic-cover ratio. Leave open negative space in the
top ~15% for a title logo to be added later - do not render any text, letters, or logos
in the image. Thick 6px ink border framing the whole cover like a classic panel.

Style: bold linework, cross-hatching for shade, dynamic halftone gradients, vintage
newsprint grain. No photorealism, no digital airbrush look.
```

---

## Issue #2 — The Powers (superseded by hand-drawn SVG icons)

We tried generating six movie-artifact icons here (Terminator skull, DeLorean,
Jurassic Park logo, Infinity Gauntlet, Inception top, Arc Reactor) across two
rounds — first with plain text prompts, then with `hero-cover.png` attached as a
style reference. Both rounds drifted into glossy/full-color rendering instead of
our ink-and-halftone palette, and six raster images with wildly different aspect
ratios caused most of the layout bugs during that build.

Replaced entirely with hand-drawn inline SVG icons (see `CategoryIcon.astro`) —
one consistent size, no external generation, no asset-management overhead, and a
shared `feTurbulence`/`feDisplacementMap` filter (`#ink-wobble`, defined in
`Powers.astro`) gives them a sketched-ink quality instead of computer-perfect lines.
The movie-nod idea lives on in Issue #3's project posters instead, where it was
always the main event anyway.

---

## Issue #3 — Team-Ups (project posters)

Each `ProjectCard` currently renders its poster block as styled text only (genre /
title / tagline) — no illustration yet, same build-structure-first sequencing as
Hero/Powers. Prompts below are drafted from each project's `poster.backdrop` concept
in `projects.md`, ready to run. All 7 share one format and palette for visual
cohesion across the grid — same fixed style block used for the hero cover, just the
composition paragraph changes per project.

**Aspect ratio note:** written as portrait movie-poster ratio (2:3), matching the
`.card__poster` block's real-poster framing. Composition should read at small sizes
too — the card renders it well below full poster size.

**Usage once generated:** drop each into `src/assets/images/`, then decide whether it
replaces `.card__poster`'s text block entirely (title/tagline burned into the art,
like a real poster) or sits behind the existing HTML text as a background image —
try both against the real card layout before deciding; not a call to make from the
prompt alone.

Shared style block (identical across all 7 — only the composition paragraph changes):

```
Illustrate a vintage-comic-style movie poster, bold ink-and-halftone style, matching
a 1960s-70s pulp/genre poster of the specified genre — not photorealistic, not a
modern digital-airbrush look.

Color palette - strict, no other colors:
ink black #1A1A1A (linework, shading)
paper-cream #F4EDDA (background)
crimson #9E3426 (dominant accent)
teal #1B7A72 (secondary accent)
gold #C68A1F (sparingly - one small highlight)

Composition: portrait, vertical 2:3 movie-poster ratio. Leave open negative space in
the top ~20% and bottom ~12% for title and tagline text to be added later - do not
render any text, letters, numbers, or logos in the image. Thick 6px ink border
framing the whole poster like a classic panel.

Style: bold linework, cross-hatching for shade, dynamic halftone gradients, vintage
newsprint grain.
```

### 1. SME-GPT — *Paper Trail* (forensic detective thriller, prestige tier)

```
[shared style block above] +

Composition: a detective's evidence wall of financial documents — bilingual
English/Sinhala invoices and receipts pinned up, connected by red string to vendor
names and totals. A magnifying glass hovers over one receipt, its highlighted figures
traced back along a string to their source line. Moody, high-contrast lighting like a
single desk lamp in an otherwise dark room — this is the flagship/prestige poster, so
the most detailed and highest-contrast of the seven.
```

### 2. AI Search Algorithm Visualizer — *The Shortest Path* (sci-fi exploration thriller)

```
[shared style block above] +

Composition: a vast dark node-graph maze extending into the distance, nodes as glowing
points connected by thin lines. Several traced paths glow brighter, converging on one
goal node at the center. An expanding frontier of light (like a shockwave / sonar
ping) radiates outward from the search's starting point, rendered in halftone rings.
```

### 3. Marine Learning Hub — *Into the Deep* (deep-sea adventure / documentary)

```
[shared style block above] +

Composition: a descent into a bioluminescent ocean, viewed from behind/above a diver
silhouette sinking into darkness. Ghostly specimen silhouettes (fish, jellyfish, coral
shapes) drift past at different depths. Several flashcard-shaped rectangles glow and
float upward through the water like jellyfish, catching the light.
```

### 4. Codefolio — *Origin File* (spy / dossier drama)

```
[shared style block above] +

Composition: a classified dossier folder snapping open on a wooden desk under a
single desk lamp's cone of light. GitHub-style commit-graph dots and repo cards are
mid-assembly in the air above it, arranging themselves into a clean one-page resume
document. A silhouette headshot outline is being stamped into the corner like an ID
photo.
```

### 5. LocalPDF — *Off the Grid* (privacy heist thriller)

```
[shared style block above] +

Composition: a sealed steel vault room, heavy circular door slightly ajar. Inside, a
single terminal glows on a desk, papers and documents stacked neatly beside it. A
severed network cable lies coiled on the floor in the foreground, sparking faintly. A
stenciled "NO UPLOADS" stamp/sign is visible on the wall, styled like industrial
warning signage.
```

### 6. Flight Tracker AI Agent — *Ground Control* (aviation thriller)

```
[shared style block above] +

Composition: a control-tower silhouette against a dusk sky, one lit window. A radar
sweep glows in circular arcs below it. Multiple flight paths arc across the sky
rendered as thin glowing data-lines with small triangular aircraft markers, converging
toward the tower. A departure-board grid pattern (rows of small rectangles, no actual
text) frames the bottom edge.
```

### 7. Scholarship Eligibility Advisor — *The Verdict* (courtroom / legal drama)

```
[shared style block above] +

Composition: a dim courtroom viewed from behind the gallery, a gavel frozen mid-strike
above the bench. Behind the bench, a glowing branching logic tree hovers in the air —
each branch splitting and eventually terminating in a small glowing seal shape (do not
render the words APPROVED/DENIED as text, just implied by a checkmark-shaped and an
X-shaped seal at the terminal branches).
```



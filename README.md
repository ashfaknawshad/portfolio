# Ashfak Nawshad — Portfolio

A personal portfolio built as a **vintage comic book, directed like a film** — Ben-Day
halftone dots, thick ink panels, speech bubbles, bold cover titles, and movie-reference
easter eggs woven through the copy.

Three personas, one person:

- **AI student & developer** — BSc in Artificial Intelligence, University of Moratuwa
- **Mathematics tutor** — Sri Lankan local syllabus + Edexcel AS / A Level
- **Cinephile** — cinema is the site's whole visual language

## The five "issues"

1. **Origin** — hero cover + intro
2. **The Powers** — skills (AI/ML, languages, frameworks, pure maths)
3. **Team-Ups** — projects, each as a movie-poster card with a "Director's Cut" toggle
4. **Side Quests** — tutoring (syllabi, results, testimonials as speech bubbles)
5. **Contact the Hero** — contact + links, styled as a comic back-cover

The theme alternates dark → cream → dark → cream by issue, with a Ben-Day halftone
dissolve at each boundary. Desktop is a comic-panel grid; mobile is a vertical
"webtoon" scroll — a separate layout, not the desktop grid squished.

## Tech

- **[Astro](https://astro.build)** — static output, ships near-zero JavaScript
- **`astro:assets`** — responsive, optimized images (AVIF/WebP, `srcset`, lazy-loading)
- **Vanilla CSS** with custom-property design tokens (no CSS framework)
- **Self-hosted fonts** — Bangers (display/covers) + Spectral (body), subset & preloaded
- A tiny **scroll-reveal engine** (one `IntersectionObserver`) — directional, honors
  `prefers-reduced-motion`, and degrades to fully-visible content with JS off

## Develop

```sh
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build → ./dist/
npm run preview  # preview the build locally
```

Requires Node ≥ 22.12.

## Structure

```
src/
├── sections/     # the five issues (Hero, Powers, TeamUps, SideQuests, Contact)
├── components/   # Panel, ProjectCard, StatBurst, SpeechBubble, ChapterNav,
│                 # HalftoneDivider, SectionAtmosphere, Icon, …
├── data/         # projects, skills, tutoring, contact (structured content)
├── layouts/      # base HTML shell
├── scripts/      # the scroll-reveal engine
├── styles/       # global.css — design tokens + reveal state machine
└── assets/       # source images (processed by astro:assets) + inline SVG icons
```

## Accessibility & performance

Semantic HTML landmarks, full keyboard navigation with visible on-theme focus states,
contrast-checked palette, `prefers-reduced-motion` respected, meaningful alt text, and a
target of Lighthouse 95+ on mobile across Performance, Accessibility, Best Practices, SEO.

## Deploy

Static site — deploys anywhere. Built for Vercel: import the repo and it auto-detects
Astro (build `astro build`, output `dist/`), no extra config needed.

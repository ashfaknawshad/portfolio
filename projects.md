# PROJECTS.md — Issue #3: "Team-Ups"

> Source content for the projects section of Ashfak Nawshad's portfolio.
> Each project has verified factual fields + a suggested movie-poster treatment.
> Claude Code: use the facts as-is; treat the poster genre/title/tagline/backdrop as a
> strong starting point you can refine with Ashfak. Backdrops are prompts for AI image gen.

---

## 1. AI Search Algorithm Visualizer — `aisearch-v2`

- **What it does:** An interactive, browser-based tool that visualizes eight classic AI
  search algorithms (BFS, DFS, DLS, IDS, UCS, Bidirectional, Greedy, A*) with step-by-step
  animation, custom graph building, and export to PNG / GIF / PDF / SVG.
- **Role:** Solo original concept and implementation; Kavinda Mihiran
  (`github.com/kavindamihiran`) joined later to help with debugging and produced the
  Windows EXE release. Most-active repo with external traction (stars + forks).
- **Tech stack:** Python via Brython (Python-in-the-browser), HTML5 Canvas, CSS; GIF.js +
  jsPDF for exports; packaged as a portable Windows `.exe` (WebView2).
  *(README also describes a Next.js + Prisma + NextAuth version — feature only if actually built.)*
- **Links:** Repo `github.com/ashfaknawshad/aisearch-v2` · Live demo
  `ashfaknawshad.github.io/aisearch-v2/` · Windows EXE release.

**🎬 Poster treatment**
- **Genre:** Sci-fi exploration thriller.
- **Title:** *The Shortest Path*
- **Tagline:** "Every node explored. One route home."
- **Backdrop concept:** A vast dark node-graph maze lit by glowing traced paths converging
  on a single goal node; A* frontier expanding outward like a shockwave.

---

## 2. Codefolio — GitHub Resume Sync — `codefolio`

- **What it does:** A browser extension that auto-generates a polished resume PDF from your
  GitHub repos — connect your account, pick repositories, edit sections in a CV editor, and
  export in Modern or Academic templates.
- **Role:** Solo.
- **Tech stack:** React + TypeScript + Vite + Tailwind + shadcn/ui (extension frontend);
  Python + FastAPI + Jinja2 + WeasyPrint (PDF-generation backend).
- **Links:** Repo `github.com/ashfaknawshad/codefolio` · Demo video `youtu.be/y2BI5gIUDBY`
  *(locally-loaded extension — no hosted demo).*

**🎬 Poster treatment**
- **Genre:** Spy / dossier drama.
- **Title:** *Origin File*
- **Tagline:** "Your code. Assembled into the perfect cover."
- **Backdrop concept:** A classified dossier snapping together on a desk — GitHub commit
  graphs, repo cards and a headshot arranging into a clean resume under a desk lamp.

---

## 3. LocalPDF — `localpdf`

- **What it does:** A privacy-first PDF toolkit (merge, split, remove, reorder, extract)
  that runs entirely on your machine with zero uploads — usable as a CLI, a local web UI,
  or a packaged desktop app, all sharing one engine.
- **Role:** Solo (MIT © Ashfak Nawshad).
- **Tech stack:** Python (`pypdf`, `pypdfium2`); Typer (CLI); FastAPI + vanilla JS (web UI);
  pywebview (desktop shell). Shared-core architecture across all three interfaces.
- **Links:** Repo `github.com/ashfaknawshad/localpdf` *(local-only by design — no hosted demo).*

**🎬 Poster treatment**
- **Genre:** Privacy heist thriller.
- **Title:** *Off the Grid*
- **Tagline:** "Nothing leaves this machine."
- **Backdrop concept:** A sealed steel vault room, single terminal glowing inside, a severed
  network cable and a big "NO UPLOADS" sign; documents safe behind the door.

---

## 4. Flight Tracker AI Agent — `flight-tracker-ai-agent`

- **What it does:** A conversational AI agent for real-time flight tracking, airport info,
  and route search — the LLM decides which tools to call (function calling) to answer
  aviation questions.
- **Role:** Solo. *(Small/focused project.)*
- **Tech stack:** Python + Flask + DeepSeek (LLM function calling) + AviationStack API
  (backend); React + TypeScript + Vite (frontend).
- **Links:** Repo `github.com/ashfaknawshad/flight-tracker-ai-agent`
  *(runs locally, needs API keys — no hosted demo).*

**🎬 Poster treatment**
- **Genre:** Aviation thriller.
- **Title:** *Ground Control*
- **Tagline:** "Ask the skies anything."
- **Backdrop concept:** A control-tower silhouette at dusk, radar sweep glowing, flight
  paths arcing across the sky as data lines; departure-board typography.

---

## 5. Scholarship Eligibility Advisor — `scholarshipadvisor`

- **What it does:** A web-based expert system that matches students to scholarships using
  rule-based logic over GPA, income, nationality and activities — a deductive reasoning
  project, not a machine-learning one.
- **Role:** Solo — university module project (CM2520, Deductive Reasoning & Logic Programming).
- **Tech stack:** SWI-Prolog end-to-end — knowledge base, eligibility rules, session auth,
  and even the web server + HTML generation via DCGs. ~100% Prolog.
- **Links:** Repo `github.com/ashfaknawshad/scholarshipadvisor`
  *(local Prolog server; includes a presentation deck).*

**🎬 Poster treatment**
- **Genre:** Courtroom / legal drama.
- **Title:** *The Verdict*
- **Tagline:** "The rules decide. Every case, judged."
- **Backdrop concept:** A dim courtroom, a gavel mid-strike, a glowing logic tree behind the
  bench where each branch resolves to APPROVED / DENIED.

---

## 6. Marine Learning Hub — `marine-learning-app`

- **What it does:** An AI-powered study companion for marine-science students — log daily
  learnings, manage study modules, and auto-generate flashcards and image-based specimen
  quizzes from your own notes and uploads.
- **Role:** Solo — designed and developed by Ashfak Nawshad; deployed and live.
- **Tech stack:** React + Vite + React Router + Tailwind (frontend); Supabase (Postgres,
  Auth, Storage, Deno Edge Functions) backend; Google Gemini API for generation;
  deployed on Vercel.
- **Links:** Repo `github.com/ashfaknawshad/marine-learning-app` · Live demo
  `marine-learning-app.vercel.app`.

**🎬 Poster treatment**
- **Genre:** Deep-sea adventure / documentary.
- **Title:** *Into the Deep*
- **Tagline:** "Every specimen. Every depth. Remembered."
- **Backdrop concept:** A descent into bioluminescent ocean, specimen silhouettes drifting
  past, flashcards surfacing like glowing jellyfish in the dark water.

---

## 7. SME-GPT — `Shinthurie/SME-GPT`  ⭐ FLAGSHIP

- **What it does:** Explainable AI for Sinhala & English financial-document understanding.
  Sri Lankan SMEs upload invoices, purchase orders, receipts and delivery notes (PDF or
  image, English or Sinhala); the system extracts structured financial data with OCR + LLMs
  and answers natural-language questions ("How much do I owe Company X?") with grounded,
  provenance-backed, **arithmetic-safe** answers — no hallucinated numbers.
- **Role:** Team project (3) — **your role: Backend + AI/ML.** Shinthurie
  (`github.com/Shinthurie`) — Frontend + DB + UX. Tharsan2002
  (`github.com/Tharsan2002`) — Data + Research. Second-year industry-based research
  project, **currently in progress.**
- **Standout engineering (worth surfacing on the card):** a 4-component pipeline — semantic
  OCR post-correction that never alters numbers; layout-aware spatial serialization with
  provenance; **neuro-symbolic PAL QA** where the LLM plans and a deterministic executor
  computes (kills math hallucinations); and a multi-tenant relationship index for
  cross-document answers.
- **Tech stack:** Python 3.12 · FastAPI · Next.js 16 / React 19 / TypeScript / Tailwind 4 ·
  Supabase Postgres + pgvector (Prisma 7 frontend, psycopg backend) · Ollama (local Llama 3
  / fine-tuned GGUF) · Surya OCR · `multilingual-e5-small` embeddings · Supabase Storage ·
  JWT + bcrypt auth with optional 2FA · Docker.
- **Links:** Repo `github.com/Shinthurie/SME-GPT` *(working full-stack app; add a live demo
  link here if/when it's hosted).*

**🎬 Poster treatment** *(give this the prestige / tentpole treatment)*
- **Genre:** Forensic detective thriller — "prestige" tier.
- **Title:** *Paper Trail*
- **Tagline:** "It reads every document. It never invents a number."
- **Backdrop concept:** A detective's evidence wall of financial documents — bilingual
  English/Sinhala invoices connected by red string to vendors and totals, a magnifying glass
  over a receipt, each figure highlighted and traced back to its source line.

---

## Notes for Claude Code

- Treat **SME-GPT as the hero card** of Issue #3 (largest, most technical, research-grade).
  Give it more visual weight / a bigger panel than the others.
- Only two projects have live demos (**AI Search Visualizer**, **Marine Learning Hub**) —
  make those "Live Demo" buttons prominent; for the rest, lead with the repo and, where it
  exists, a demo video (Codefolio) or deck (Scholarship Advisor).
- The "Director's Cut" toggle on each card should expand into: the standout-engineering
  detail, full tech stack, and role breakdown.
- Poster titles/taglines are suggestions — confirm with Ashfak before finalizing; he's a
  cinephile and may want to swap in his own references.

// Issue #3: Team-Ups — project inventory. Source facts live in /projects.md at the
// repo root; this file is the structured version the site actually renders.
//
// To add a project: add an entry here (and to projects.md for the record). Set
// `isHero: true` for the one project that should get the bigger flagship treatment
// — currently only one project should have this at a time.

import type { ImageMetadata } from 'astro';
import smeGptPoster from '../assets/images/sme-gpt-poster.png';
import aiSearchPoster from '../assets/images/ai-search-v2-poster.png';
import marineLearningPoster from '../assets/images/marine-learning-app-poster.png';
import codefolioPoster from '../assets/images/codefolio-poster.png';
import localpdfPoster from '../assets/images/localpdf-poster.png';
import flightTrackerPoster from '../assets/images/flight-tracker-ai-agent-poster.png';
import scholarshipAdvisorPoster from '../assets/images/scholarshipadvisor-poster.png';

export interface ProjectLink {
	label: string;
	url: string;
}

export interface Contributor {
	name: string;
	url: string;
	role: string;
}

export interface Poster {
	genre: string;
	title: string;
	tagline: string;
	/** Prompt concept for the eventual generated poster art — not yet illustrated. */
	backdrop: string;
}

export interface Project {
	slug: string;
	name: string;
	description: string;
	role: string;
	contributors?: Contributor[];
	techStack: string[];
	standoutEngineering?: string;
	links: ProjectLink[];
	poster: Poster;
	/** Generated poster art (see ASSETS.md) — has an empty band at the top for the
	 * title/genre to overlay, like the hero cover. Falls back to the styled-text
	 * poster block when not set. */
	posterImage?: ImageMetadata;
	/** Shorter name for the poster masthead only (card heading/alt text still use the
	 * real `name`) — set when the full name overflows into the artwork. */
	posterName?: string;
	/** Masthead text alignment override, for art where the empty band isn't evenly
	 * balanced (e.g. an object like a lamp intruding from one side). Defaults to
	 * centered. */
	posterTitleAlign?: 'left' | 'center' | 'right';
	/** Set 'compact' to keep the smaller masthead title size on mobile — the default
	 * is larger, but a long two-line title (e.g. "AI Search Algorithm Visualizer")
	 * needs the smaller size to avoid crowding the art. */
	posterTitleSize?: 'normal' | 'compact';
	status?: 'ongoing';
	isHero?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'sme-gpt',
		name: 'SME-GPT',
		description:
			'Explainable AI for Sinhala & English financial-document understanding. Sri Lankan SMEs upload invoices, purchase orders, receipts and delivery notes — the system extracts structured financial data with OCR + LLMs and answers natural-language questions with grounded, provenance-backed, arithmetic-safe answers. No hallucinated numbers.',
		role: 'Team project (3) — Backend + AI/ML. Second-year industry-based research project.',
		contributors: [
			{ name: 'Shinthurie', url: 'https://github.com/Shinthurie', role: 'Frontend + DB + UX' },
			{ name: 'Tharsan2002', url: 'https://github.com/Tharsan2002', role: 'Data + Research' },
		],
		techStack: [
			'Python 3.12',
			'FastAPI',
			'Next.js 16',
			'React 19',
			'TypeScript',
			'Tailwind 4',
			'Supabase Postgres',
			'pgvector',
			'Prisma 7',
			'psycopg',
			'Ollama',
			'Surya OCR',
			'multilingual-e5-small',
			'Supabase Storage',
			'JWT + bcrypt',
			'Docker',
		],
		standoutEngineering:
			'A 4-component pipeline: semantic OCR post-correction that never alters numbers; layout-aware spatial serialization with provenance; neuro-symbolic PAL QA where the LLM plans and a deterministic executor computes (kills math hallucinations); and a multi-tenant relationship index for cross-document answers.',
		links: [{ label: 'Repo', url: 'https://github.com/Shinthurie/SME-GPT' }],
		posterImage: smeGptPoster,
		poster: {
			genre: 'Forensic detective thriller — prestige tier',
			title: 'Paper Trail',
			tagline: 'It reads every document. It never invents a number.',
			backdrop:
				"A detective's evidence wall of financial documents — bilingual English/Sinhala invoices connected by red string to vendors and totals, a magnifying glass over a receipt, each figure highlighted and traced back to its source line.",
		},
		status: 'ongoing',
		isHero: true,
	},
	{
		slug: 'aisearch-v2',
		name: 'AI Search Algorithm Visualizer',
		description:
			'An interactive, browser-based tool that visualizes eight classic AI search algorithms (BFS, DFS, DLS, IDS, UCS, Bidirectional, Greedy, A*) with step-by-step animation, custom graph building, and export to PNG / GIF / PDF / SVG.',
		role: 'Solo original concept and implementation; Kavinda Mihiran joined later for debugging and produced the Windows EXE release.',
		contributors: [
			{
				name: 'Kavinda Mihiran',
				url: 'https://github.com/kavindamihiran',
				role: 'Debugging + EXE release',
			},
		],
		techStack: ['Python (Brython)', 'HTML5 Canvas', 'CSS', 'GIF.js', 'jsPDF', 'WebView2'],
		links: [
			{ label: 'Live Demo', url: 'https://ashfaknawshad.github.io/aisearch-v2/' },
			{ label: 'Repo', url: 'https://github.com/ashfaknawshad/aisearch-v2' },
			{ label: 'Windows EXE', url: 'https://github.com/ashfaknawshad/aisearch-v2/releases' },
		],
		posterImage: aiSearchPoster,
		posterTitleSize: 'compact',
		poster: {
			genre: 'Sci-fi exploration thriller',
			title: 'The Shortest Path',
			tagline: 'Every node explored. One route home.',
			backdrop:
				'A vast dark node-graph maze lit by glowing traced paths converging on a single goal node; A* frontier expanding outward like a shockwave.',
		},
	},
	{
		slug: 'marine-learning-app',
		name: 'Marine Learning Hub',
		description:
			'An AI-powered study companion for marine-science students — log daily learnings, manage study modules, and auto-generate flashcards and image-based specimen quizzes from your own notes and uploads.',
		role: 'Solo — designed and developed end to end; deployed and live.',
		techStack: [
			'React',
			'Vite',
			'React Router',
			'Tailwind',
			'Supabase',
			'Deno Edge Functions',
			'Google Gemini API',
			'Vercel',
		],
		links: [
			{ label: 'Live Demo', url: 'https://marine-learning-app.vercel.app' },
			{ label: 'Repo', url: 'https://github.com/ashfaknawshad/marine-learning-app' },
		],
		posterImage: marineLearningPoster,
		poster: {
			genre: 'Deep-sea adventure / documentary',
			title: 'Into the Deep',
			tagline: 'Every specimen. Every depth. Remembered.',
			backdrop:
				'A descent into bioluminescent ocean, specimen silhouettes drifting past, flashcards surfacing like glowing jellyfish in the dark water.',
		},
	},
	{
		slug: 'codefolio',
		name: 'Codefolio',
		description:
			'A browser extension that auto-generates a polished resume PDF from your GitHub repos — connect your account, pick repositories, edit sections in a CV editor, and export in Modern or Academic templates.',
		role: 'Solo.',
		techStack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'shadcn/ui', 'FastAPI', 'Jinja2', 'WeasyPrint'],
		links: [
			{ label: 'Demo Video', url: 'https://youtu.be/y2BI5gIUDBY' },
			{ label: 'Repo', url: 'https://github.com/ashfaknawshad/codefolio' },
		],
		posterImage: codefolioPoster,
		posterTitleAlign: 'right',
		poster: {
			genre: 'Spy / dossier drama',
			title: 'Origin File',
			tagline: 'Your code. Assembled into the perfect cover.',
			backdrop:
				'A classified dossier snapping together on a desk — GitHub commit graphs, repo cards and a headshot arranging into a clean resume under a desk lamp.',
		},
	},
	{
		slug: 'localpdf',
		name: 'LocalPDF',
		description:
			'A privacy-first PDF toolkit (merge, split, remove, reorder, extract) that runs entirely on your machine with zero uploads — usable as a CLI, a local web UI, or a packaged desktop app, all sharing one engine.',
		role: 'Solo.',
		techStack: ['Python', 'pypdf', 'pypdfium2', 'Typer', 'FastAPI', 'vanilla JS', 'pywebview'],
		links: [{ label: 'Repo', url: 'https://github.com/ashfaknawshad/localpdf' }],
		posterImage: localpdfPoster,
		poster: {
			genre: 'Privacy heist thriller',
			title: 'Off the Grid',
			tagline: 'Nothing leaves this machine.',
			backdrop:
				'A sealed steel vault room, single terminal glowing inside, a severed network cable and a big "NO UPLOADS" sign; documents safe behind the door.',
		},
	},
	{
		slug: 'flight-tracker-ai-agent',
		name: 'Flight Tracker AI Agent',
		description:
			'A conversational AI agent for real-time flight tracking, airport info, and route search — the LLM decides which tools to call (function calling) to answer aviation questions.',
		role: 'Solo.',
		techStack: ['Python', 'Flask', 'DeepSeek', 'AviationStack API', 'React', 'TypeScript', 'Vite'],
		links: [{ label: 'Repo', url: 'https://github.com/ashfaknawshad/flight-tracker-ai-agent' }],
		posterImage: flightTrackerPoster,
		posterName: 'Flight Tracker',
		poster: {
			genre: 'Aviation thriller',
			title: 'Ground Control',
			tagline: 'Ask the skies anything.',
			backdrop:
				'A control-tower silhouette at dusk, radar sweep glowing, flight paths arcing across the sky as data lines; departure-board typography.',
		},
	},
	{
		slug: 'scholarshipadvisor',
		name: 'Scholarship Eligibility Advisor',
		description:
			'A web-based expert system that matches students to scholarships using rule-based logic over GPA, income, nationality and activities — a deductive reasoning project, not a machine-learning one.',
		role: 'Solo — university module project (Deductive Reasoning & Logic Programming).',
		techStack: ['SWI-Prolog', 'DCGs'],
		links: [{ label: 'Repo', url: 'https://github.com/ashfaknawshad/scholarshipadvisor' }],
		posterImage: scholarshipAdvisorPoster,
		posterName: 'ScholAdvise',
		poster: {
			genre: 'Courtroom / legal drama',
			title: 'The Verdict',
			tagline: 'The rules decide. Every case, judged.',
			backdrop:
				'A dim courtroom, a gavel mid-strike, a glowing logic tree behind the bench where each branch resolves to APPROVED / DENIED.',
		},
	},
];

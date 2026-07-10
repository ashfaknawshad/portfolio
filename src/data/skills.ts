// Issue #2: The Powers — skill inventory.
//
// To add a skill: add an entry to the relevant category's `skills` array (or a new
// category). `icon` is optional and must match a filename in src/assets/icons/
// (without the .svg extension) — see that folder for what's already downloaded, or
// grab a new one from https://simpleicons.org (download the SVG, drop it in that
// folder, no edits needed — Icon.astro recolors it automatically).
//
// Set `learning: true` for anything still in progress — it renders with a dashed
// border and a "Learning" tag instead of looking like a finished skill.

export interface Skill {
	name: string;
	icon?: string;
	learning?: boolean;
}

export interface SkillCategory {
	title: string;
	/** Selects which hand-drawn icon to show — see the slug checks in CategoryIcon.astro.
	 * Adding a new category means adding a matching icon there too. */
	slug: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: 'AI / Machine Learning',
		slug: 'ai-ml',
		skills: [
			{ name: 'PyTorch', icon: 'pytorch' },
			{ name: 'scikit-learn', icon: 'scikitlearn' },
			{ name: 'Pandas', icon: 'pandas' },
			{ name: 'NumPy', icon: 'numpy' },
			{ name: 'Matplotlib' },
			{ name: 'RAG' },
			{ name: 'Vector Embeddings' },
			{ name: 'FAISS' },
			{ name: 'Prompt Engineering' },
			{ name: 'LangChain', icon: 'langchain', learning: true },
			{ name: 'LangGraph', icon: 'langgraph', learning: true },
		],
	},
	{
		title: 'Document AI & Computer Vision',
		slug: 'document-ai-cv',
		skills: [
			{ name: 'Surya OCR' },
			{ name: 'Tesseract OCR' },
			{ name: 'Donut' },
			{ name: 'Image Preprocessing' },
			{ name: 'Layout-aware Document Understanding' },
		],
	},
	{
		title: 'Programming Languages',
		slug: 'languages',
		skills: [
			{ name: 'Python', icon: 'python' },
			{ name: 'C++', icon: 'cplusplus' },
			{ name: 'JavaScript', icon: 'javascript' },
			{ name: 'HTML', icon: 'html5' },
			{ name: 'CSS', icon: 'css3' },
			{ name: 'SQL' },
			{ name: 'PHP', icon: 'php' },
		],
	},
	{
		title: 'Web & Backend',
		slug: 'web-backend',
		skills: [
			{ name: 'React', icon: 'react' },
			{ name: 'FastAPI', icon: 'fastapi' },
			{ name: 'Flask', icon: 'flask' },
			{ name: 'Laravel', icon: 'laravel' },
		],
	},
	{
		title: 'Tools & Platforms',
		slug: 'tools-platforms',
		skills: [
			{ name: 'Git', icon: 'git' },
			{ name: 'GitHub', icon: 'github' },
			{ name: 'Google Colab', icon: 'googlecolab' },
			{ name: 'VS Code', icon: 'visualstudiocode' },
			{ name: 'Vercel', icon: 'vercel' },
			{ name: 'Firebase', icon: 'firebase' },
			{ name: 'Supabase', icon: 'supabase' },
			{ name: 'Ollama', icon: 'ollama' },
			{ name: 'Arduino IDE', icon: 'arduino' },
			{ name: 'Docker', icon: 'docker', learning: true },
			{ name: 'Kubernetes', icon: 'kubernetes', learning: true },
		],
	},
	{
		title: 'Embedded Systems',
		slug: 'embedded-systems',
		skills: [
			{ name: 'Arduino', icon: 'arduino' },
			{ name: 'ESP32', icon: 'espressif' },
			{ name: 'ESP32-CAM', icon: 'espressif' },
			{ name: 'NeoPixel LEDs' },
			{ name: 'Sensor Integration' },
		],
	},
];

// Math topics — power-bar levels are PLACEHOLDERS (see Panel discussion). Edit the
// `level` values (0-100) once you've settled on real numbers; nothing else needs
// to change.
export interface MathTopic {
	name: string;
	level: number;
}

export const mathTopics: MathTopic[] = [
	{ name: 'Calculus', level: 88 },
	{ name: 'Algebra', level: 92 },
	{ name: 'Statistics', level: 80 },
];

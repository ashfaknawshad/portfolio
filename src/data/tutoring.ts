// Issue #4: Side Quests — tutoring content.
//
// Syllabi and result stats are real, confirmed by Ashfak. First testimonial is real
// (Sahana Trisha). More to be added as they come in — leave the array at however many
// real quotes exist; don't pad it with [TODO] placeholders just to fill space.

export interface SyllabusGroup {
	name: string;
	subjects: string[];
}

export interface ResultStat {
	value: string;
	label: string;
}

export interface Testimonial {
	quote: string;
	author: string;
}

export const syllabusGroups: SyllabusGroup[] = [
	{
		name: 'Sri Lankan Local Syllabus',
		subjects: ['Grade 9–11 Maths', 'G.C.E. O/L Maths', 'G.C.E. O/L ICT', 'G.C.E. A/L ICT'],
	},
	{
		name: 'Edexcel O Level',
		subjects: ['Computer Science', 'Maths'],
	},
	{
		name: 'Edexcel AS & A Level',
		subjects: [
			'Pure Maths 1 (AS)',
			'Pure Maths 2 (AS)',
			'Pure Maths 3 (A2)',
			'Pure Maths 4 (A2)',
			'FP1',
			'FP2',
			'FP3',
			'S1',
			'S2',
			'M1',
			'M2',
		],
	},
];

export const resultStats: ResultStat[] = [
	{ value: '105+', label: 'Students tutored' },
	{ value: '90%', label: 'Avg. grade improvement' },
	{ value: '100%', label: 'Success rate' },
];

export const testimonials: Testimonial[] = [
	{
		quote:
			'Sir is a dedicated and supportive Mathematics teacher who goes the extra mile for his students. When I was struggling academically, he personally guided me and taught me simple, effective methods to improve. Within three weeks, I gained confidence and was able to progress towards achieving a good pass.',
		author: 'Sahana Trisha — Local O/L Maths',
	},
];

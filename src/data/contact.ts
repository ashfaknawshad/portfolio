// Issue #5: Contact the Hero — real contact details, confirmed by Ashfak.

export interface ContactLink {
	label: string;
	url: string;
	icon: string;
}

export const email = 'ashfaknawshad@gmail.com';

export const contactLinks: ContactLink[] = [
	{ label: 'GitHub', url: 'https://github.com/ashfaknawshad', icon: 'github' },
	{ label: 'LinkedIn', url: 'https://linkedin.com/in/ashfaknawshad', icon: 'linkedin' },
	{ label: 'YouTube', url: 'https://youtube.com/@ashfaknawshad', icon: 'youtube' },
	{ label: 'Medium', url: 'https://medium.com/@ashfaknawshad', icon: 'medium' },
	{ label: 'Letterboxd', url: 'https://letterboxd.com/ashfakn', icon: 'letterboxd' },
];

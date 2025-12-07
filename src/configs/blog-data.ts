export const BLOG_AUTHOR = 'Vijay Aravynthan';
export type Category = 'rants' | 'acads' | 'events' | 'milestones' | 'random';

export interface BlogPost {
	id: string;
	title: string;
	content: string;
	date: string;
	category: Category;
	tags: string[];
}

export const blogPosts: BlogPost[] = [
	{
		id: '1',
		title: 'Hello World: My First Post',
		content: `
			<p>Welcome to my new blog! I've integrated this directly into my portfolio OS.</p>
			<p>It's built with Svelte and uses a custom data structure to manage posts.</p>
			<p>Stay tuned for more updates on my projects and random thoughts.</p>
		`,
		date: '2023-10-27',
		category: 'milestones',
		tags: ['intro', 'svelte', 'portfolio'],
	},
	{
		id: '2',
		title: 'Why I Love Svelte',
		content: `
			<p>Svelte is just amazing. The reactivity system in Svelte 5 with runes is a game changer.</p>
			<p>It makes state management so much simpler and intuitive.</p>
		`,
		date: '2023-11-05',
		category: 'rants',
		tags: ['svelte', 'coding', 'opinion'],
	},
	{
		id: '3',
		title: 'Hackathon Experience',
		content: `
			<p>Just participated in a 24-hour hackathon. It was intense but rewarding.</p>
			<p>We built a cool AI-powered tool and won 2nd place!</p>
		`,
		date: '2023-11-15',
		category: 'events',
		tags: ['hackathon', 'ai', 'winning'],
	},
	{
		id: '4',
		title: 'Academic Progress',
		content: `
			<p>Finished my final exams for this semester. The algorithms course was tough but I learned a lot.</p>
		`,
		date: '2023-12-01',
		category: 'acads',
		tags: ['university', 'exams', 'algorithms'],
	},
	{
		id: '5',
		title: 'Random Thoughts on UI Design',
		content: `
			<p>Glassmorphism is still one of my favorite design trends. It adds such a nice depth to the UI.</p>
			<p>Combined with vibrant colors, it creates a really modern look.</p>
		`,
		date: '2023-12-05',
		category: 'random',
		tags: ['design', 'ui', 'glassmorphism'],
	},
];

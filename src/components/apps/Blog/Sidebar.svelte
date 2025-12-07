<script lang="ts">
	import type { Category } from '🍎/configs/blog-data';

	let { activeCategory, onSelectCategory } = $props<{
		activeCategory: Category | 'all';
		onSelectCategory: (category: Category | 'all') => void;
	}>();

	const categories: (Category | 'all')[] = [
		'all',
		'rants',
		'acads',
		'events',
		'milestones',
		'random',
	];

	function formatCategory(cat: string) {
		return cat.charAt(0).toUpperCase() + cat.slice(1);
	}
</script>

<div class="sidebar">
	<div class="sidebar-header">
		<h2>Blog</h2>
	</div>
	<nav>
		{#each categories as category}
			<button class:active={activeCategory === category} onclick={() => onSelectCategory(category)}>
				<span class="icon">
					{#if category === 'all'}
						📂
					{:else if category === 'rants'}
						😤
					{:else if category === 'acads'}
						📚
					{:else if category === 'events'}
						🎉
					{:else if category === 'milestones'}
						🏆
					{:else}
						🎲
					{/if}
				</span>
				{formatCategory(category)}
			</button>
		{/each}
	</nav>
</div>

<style>
	.sidebar {
		width: 200px;
		background: rgba(240, 240, 240, 0.8);
		backdrop-filter: blur(10px);
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1rem 0.5rem;
	}

	.sidebar-header {
		padding: 0 1rem 1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		margin-bottom: 0.5rem;
	}

	h2 {
		margin: 0;
		font-size: 1.2rem;
		color: #333;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.5rem 1rem;
		border: none;
		background: transparent;
		color: #444;
		font-size: 0.95rem;
		text-align: left;
		cursor: pointer;
		border-radius: 6px;
		transition: background 0.2s;
	}

	button:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	button.active {
		background: rgba(0, 122, 255, 0.1);
		color: #007aff;
		font-weight: 500;
	}

	.icon {
		font-size: 1.1rem;
	}
</style>

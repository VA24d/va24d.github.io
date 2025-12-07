<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import BlogList from './BlogList.svelte';
	import BlogPostView from './BlogPost.svelte';
	import { blogPosts, type Category, type BlogPost } from '🍎/configs/blog-data';

	let activeCategory = $state<Category | 'all'>('all');
	let activePost = $state<BlogPost | null>(null);

	let filteredPosts = $derived(
		activeCategory === 'all'
			? blogPosts
			: blogPosts.filter((post) => post.category === activeCategory),
	);

	function handleSelectCategory(category: Category | 'all') {
		activeCategory = category;
		activePost = null; // Go back to list when changing category
	}

	function handleSelectPost(post: BlogPost) {
		activePost = post;
	}

	function handleBack() {
		activePost = null;
	}
</script>

<div class="blog-app">
	<Sidebar {activeCategory} onSelectCategory={handleSelectCategory} />

	<div class="main-content">
		{#if activePost}
			<BlogPostView post={activePost} onBack={handleBack} />
		{:else}
			<BlogList posts={filteredPosts} onSelectPost={handleSelectPost} />
		{/if}
	</div>
</div>

<style>
	.blog-app {
		display: flex;
		height: 100%;
		width: 100%;
		background: #f9f9f9;
		color: #333;
		border-radius: inherit;
		overflow: hidden;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>

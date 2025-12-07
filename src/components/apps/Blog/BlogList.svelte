<script lang="ts">
	import type { BlogPost } from '🍎/configs/blog-data';

	let { posts, onSelectPost } = $props<{
		posts: BlogPost[];
		onSelectPost: (post: BlogPost) => void;
	}>();

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
</script>

<div class="blog-list">
	{#if posts.length === 0}
		<div class="empty-state">
			<p>No posts found in this category.</p>
		</div>
	{:else}
		{#each posts as post}
			<button class="post-item" onclick={() => onSelectPost(post)}>
				<div class="post-header">
					<h3>{post.title}</h3>
					<span class="date">{formatDate(post.date)}</span>
				</div>
				<div class="post-preview">
					{@html post.content.substring(0, 100) + '...'}
				</div>
				<div class="tags">
					{#each post.tags as tag}
						<span class="tag">#{tag}</span>
					{/each}
				</div>
			</button>
		{/each}
	{/if}
</div>

<style>
	.blog-list {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post-item {
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 1rem;
		text-align: left;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.post-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 122, 255, 0.3);
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #333;
	}

	.date {
		font-size: 0.8rem;
		color: #888;
	}

	.post-preview {
		font-size: 0.9rem;
		color: #666;
		line-height: 1.4;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.tag {
		background: #f0f0f0;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		color: #555;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: #888;
	}
</style>

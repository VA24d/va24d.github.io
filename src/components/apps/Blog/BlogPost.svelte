<script lang="ts">
	import type { BlogPost } from '🍎/configs/blog-data';

	let { post, onBack } = $props<{
		post: BlogPost;
		onBack: () => void;
	}>();

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
</script>

<div class="blog-post">
	<button class="back-btn" onclick={onBack}> ← Back to list </button>

	<article>
		<header>
			<h1>{post.title}</h1>
			<div class="meta">
				<span class="date">{formatDate(post.date)}</span>
				<span class="category">{post.category}</span>
			</div>
		</header>

		<div class="content">
			{@html post.content}
		</div>

		<footer>
			<div class="tags">
				{#each post.tags as tag}
					<span class="tag">#{tag}</span>
				{/each}
			</div>
		</footer>
	</article>
</div>

<style>
	.blog-post {
		flex: 1;
		overflow-y: auto;
		padding: 2rem;
		background: white;
	}

	.back-btn {
		background: none;
		border: none;
		color: #007aff;
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.back-btn:hover {
		text-decoration: underline;
	}

	article {
		max-width: 700px;
		margin: 0 auto;
	}

	header {
		margin-bottom: 2rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 1rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #222;
	}

	.meta {
		display: flex;
		gap: 1rem;
		color: #666;
		font-size: 0.9rem;
	}

	.category {
		text-transform: capitalize;
		background: #eee;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
	}

	.content {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #333;
	}

	/* Target HTML content styles */
	:global(.content p) {
		margin-bottom: 1.5rem;
	}

	footer {
		margin-top: 3rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
	}

	.tag {
		color: #007aff;
		font-size: 0.9rem;
	}
</style>

<script lang="ts">
</script>

<div class="about-mac">
	<div class="logo">
		<img src="/app-icons/finder/256.png" alt="MacOS Logo" />
	</div>
	<div class="info">
		<h2>macOS Portfolio</h2>
		<p class="version">Version 1.0.0</p>
		<div class="specs">
			<p><strong>Processor</strong> 100% Human Brain</p>
			<p><strong>Graphics</strong> CSS 3.0 & Svelte 5</p>
			<p><strong>Memory</strong> Infinite Creativity</p>
			<p><strong>Startup Disk</strong> Vercel</p>
		</div>
		<div class="buttons">
			<button>System Report...</button>
			<button>Software Update...</button>
		</div>
	</div>
</div>

<style>
	.about-mac {
		display: flex;
		padding: 2rem;
		gap: 2rem;
		background-color: #f5f5f5;
		height: 100%;
		color: #333;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
	}

	:global(.dark) .about-mac {
		background-color: #2c2c2c;
		color: white;
	}

	.logo img {
		width: 128px;
		height: 128px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		margin: 0;
		font-weight: 600;
		font-size: 1.5rem;
	}

	.version {
		color: #666;
		margin-bottom: 1rem;
	}

	:global(.dark) .version {
		color: #aaa;
	}

	.specs p {
		margin: 0.2rem 0;
		font-size: 0.9rem;
	}

	.buttons {
		margin-top: 1.5rem;
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.3rem 0.8rem;
		border-radius: 4px;
		border: 1px solid #ccc;
		background: white;
		font-size: 0.85rem;
		cursor: pointer;
	}

	:global(.dark) button {
		background: #444;
		border-color: #555;
		color: white;
	}
</style>

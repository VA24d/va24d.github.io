<script lang="ts">
	import { apps } from '🍎/state/apps.svelte';

	function close() {
		apps.open.welcome = false;
	}
</script>

<div class="welcome-container">
	<div class="content">
		<h1>Welcome to my Portfolio OS</h1>
		<p>
			This is a web-based operating system designed to showcase my work and skills. Feel free to
			explore the apps, check out my projects, and read my blog.
		</p>

		<div class="features">
			<div class="feature">
				<h3>🚀 Fast & Fluid</h3>
				<p>Built with Svelte 5 for optimal performance.</p>
			</div>
			<div class="feature">
				<h3>🎨 Beautiful UI</h3>
				<p>Inspired by macOS, crafted with care.</p>
			</div>
			<div class="feature">
				<h3>📝 Integrated Blog</h3>
				<p>Read about my thoughts and updates directly in the OS.</p>
			</div>
		</div>

		<button onclick={close} class="get-started-btn">Get Started</button>
	</div>
</div>

<style>
	.welcome-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		color: #333;
		padding: 2rem;
		text-align: center;
		border-radius: inherit;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #007aff, #00c6ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #555;
		max-width: 500px;
		margin: 0 auto 2rem;
	}

	.features {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
		justify-content: center;
	}

	.feature {
		background: rgba(255, 255, 255, 0.6);
		padding: 1rem;
		border-radius: 12px;
		backdrop-filter: blur(10px);
		width: 150px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	}

	.feature h3 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.feature p {
		font-size: 0.85rem;
		margin: 0;
		color: #666;
	}

	.get-started-btn {
		background: #007aff;
		color: white;
		border: none;
		padding: 0.8rem 2rem;
		font-size: 1.1rem;
		border-radius: 25px;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3);
	}

	.get-started-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(0, 122, 255, 0.4);
	}

	.get-started-btn:active {
		transform: translateY(0);
	}
</style>

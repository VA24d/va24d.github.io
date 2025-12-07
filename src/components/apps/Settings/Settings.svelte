<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';

	let activeTab = $state('General');

	const tabs = [
		{ name: 'General', icon: '⚙️' },
		{ name: 'Display', icon: '🖥️' },
		{ name: 'Sound', icon: '🔊' },
		{ name: 'Network', icon: '🌐' },
		{ name: 'Wallpaper', icon: '🖼️' },
		{ name: 'Links', icon: '🔗' },
	];

	const wallpapers = [
		{
			name: 'Forest',
			url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=3874&auto=format&fit=crop',
		},
		{
			name: 'Desert',
			url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=3870&auto=format&fit=crop',
		},
		{
			name: 'Ocean',
			url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3873&auto=format&fit=crop',
		},
		{
			name: 'City',
			url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=3744&auto=format&fit=crop',
		},
		{
			name: 'Mountain',
			url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3870&auto=format&fit=crop',
		},
	];
</script>

<div class="settings-app">
	<div class="sidebar">
		<div class="search-bar">
			<input placeholder="Search" />
		</div>
		<ul>
			{#each tabs as tab}
				<li class:active={activeTab === tab.name} onclick={() => (activeTab = tab.name)}>
					<span class="icon">{tab.icon}</span>
					<span class="name">{tab.name}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="main-content">
		<h2>{activeTab}</h2>

		{#if activeTab === 'General'}
			<div class="section">
				<div class="row">
					<label>Appearance</label>
					<select>
						<option>Light</option>
						<option>Dark</option>
						<option>Auto</option>
					</select>
				</div>
				<div class="row">
					<label>Accent Color</label>
					<div class="colors">
						<div class="color blue"></div>
						<div class="color purple"></div>
						<div class="color pink"></div>
						<div class="color red"></div>
					</div>
				</div>
			</div>
		{:else if activeTab === 'Wallpaper'}
			<div class="section">
				<div class="wallpapers-grid">
					{#each wallpapers as wp}
						<button
							class="wallpaper-item"
							class:active={preferences.wallpaper.image === wp.url}
							onclick={() => (preferences.wallpaper.image = wp.url)}
						>
							<img src={wp.url} alt="Wallpaper" />
						</button>
					{/each}
				</div>
			</div>
		{:else if activeTab === 'Links'}
			<div class="section">
				<div class="links">
					<a href="https://github.com" target="_blank" class="link-card">
						<span class="icon">🐙</span>
						<div class="info">
							<h3>GitHub</h3>
							<p>Check out my code</p>
						</div>
					</a>
					<a href="https://linkedin.com" target="_blank" class="link-card">
						<span class="icon">💼</span>
						<div class="info">
							<h3>LinkedIn</h3>
							<p>Connect with me</p>
						</div>
					</a>
					<a href="mailto:email@example.com" class="link-card">
						<span class="icon">📧</span>
						<div class="info">
							<h3>Email</h3>
							<p>Get in touch</p>
						</div>
					</a>
				</div>
			</div>
		{:else}
			<div class="placeholder">
				<p>Settings for {activeTab} are not implemented yet.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.settings-app {
		display: flex;
		height: 100%;
		background-color: #f5f5f5;
		color: #333;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
	}

	:global(.dark) .settings-app {
		background-color: #1e1e1e;
		color: #e0e0e0;
	}

	.sidebar {
		width: 220px;
		background-color: rgba(0, 0, 0, 0.05);
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		padding: 3.5rem 0.5rem 1rem 0.5rem;
	}

	:global(.dark) .sidebar {
		background-color: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.search-bar {
		padding: 0 0.5rem 1rem 0.5rem;
	}

	.search-bar input {
		width: 100%;
		padding: 0.3rem 0.5rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		background: white;
	}

	:global(.dark) .search-bar input {
		background: #333;
		border-color: #444;
		color: white;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
	}

	.sidebar li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.sidebar li:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .sidebar li:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.sidebar li.active {
		background-color: #007aff;
		color: white;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
	}

	h2 {
		margin-top: 0;
		border-bottom: 1px solid #ddd;
		padding-bottom: 0.5rem;
		margin-bottom: 1.5rem;
	}

	:global(.dark) h2 {
		border-color: #333;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	.colors {
		display: flex;
		gap: 0.5rem;
	}

	.color {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.color.blue {
		background: #007aff;
	}
	.color.purple {
		background: #af52de;
	}
	.color.pink {
		background: #ff2d55;
	}
	.color.red {
		background: #ff3b30;
	}

	.links {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.link-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s;
	}

	:global(.dark) .link-card {
		background: #333;
	}

	.link-card:hover {
		transform: translateY(-2px);
	}

	.link-card .icon {
		font-size: 2rem;
	}

	.link-card h3 {
		margin: 0;
		font-size: 1rem;
	}

	.link-card p {
		margin: 0;
		font-size: 0.8rem;
		color: #888;
	}
	.wallpapers-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}

	.wallpaper-item {
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid transparent;
		transition: border-color 0.2s;
	}

	.wallpaper-item.active {
		border-color: #007aff;
	}

	.wallpaper-item img {
		width: 100%;
		height: 100px;
		object-fit: cover;
		display: block;
	}
</style>

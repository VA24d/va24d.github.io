<script lang="ts">
	let currentPath = $state('Home');

	const folders = [
		{ name: 'Desktop', icon: 'desktop' },
		{ name: 'Documents', icon: 'documents' },
		{ name: 'Downloads', icon: 'downloads' },
		{ name: 'Music', icon: 'music' },
		{ name: 'Pictures', icon: 'pictures' },
	];

	const files = [
		{ name: 'Resume.pdf', icon: 'pdf' },
		{ name: 'Project_Specs.docx', icon: 'doc' },
		{ name: 'Budget.xlsx', icon: 'xls' },
	];
</script>

<div class="files-app">
	<div class="sidebar">
		<div class="sidebar-group">
			<h3>Favorites</h3>
			<ul>
				<li class="active">Home</li>
				<li>Desktop</li>
				<li>Documents</li>
				<li>Downloads</li>
				<li>Applications</li>
			</ul>
		</div>
		<div class="sidebar-group">
			<h3>iCloud</h3>
			<ul>
				<li>iCloud Drive</li>
			</ul>
		</div>
	</div>
	<div class="main-content">
		<div class="toolbar">
			<div class="path-nav">
				<button>&lt;</button>
				<button>&gt;</button>
				<span>{currentPath}</span>
			</div>
		</div>
		<div class="grid-view">
			{#each folders as folder}
				<div class="item folder">
					<div class="icon">📁</div>
					<span class="name">{folder.name}</span>
				</div>
			{/each}
			{#each files as file}
				<div class="item file">
					<div class="icon">📄</div>
					<span class="name">{file.name}</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.files-app {
		display: flex;
		height: 100%;
		background-color: white;
		color: #333;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
	}

	:global(.dark) .files-app {
		background-color: #1e1e1e;
		color: #e0e0e0;
	}

	.sidebar {
		width: 200px;
		background-color: #f5f5f5; /* Light gray sidebar */
		backdrop-filter: blur(20px);
		padding: 3.5rem 0 1rem 0;
		border-right: 1px solid #ddd;
		font-size: 0.9rem;
	}

	:global(.dark) .sidebar {
		background-color: #2a2a2a;
		border-color: #333;
	}

	.sidebar-group h3 {
		padding: 0 1rem;
		font-size: 0.75rem;
		color: #888;
		margin-bottom: 0.2rem;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
	}

	.sidebar li {
		padding: 0.3rem 1rem;
		cursor: pointer;
	}

	.sidebar li:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .sidebar li:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.sidebar li.active {
		background-color: #e0e0e0;
	}

	:global(.dark) .sidebar li.active {
		background-color: #444;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.toolbar {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}

	:global(.dark) .toolbar {
		border-color: #333;
	}

	.path-nav {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.grid-view {
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 1rem;
		overflow-y: auto;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.item:hover {
		background-color: #f0f0f0;
	}

	:global(.dark) .item:hover {
		background-color: #333;
	}

	.item .icon {
		font-size: 3rem;
	}

	.item .name {
		font-size: 0.85rem;
		text-align: center;
		word-break: break-word;
	}
</style>

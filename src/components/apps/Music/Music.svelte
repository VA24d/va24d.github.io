<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '🍎/lib/supabaseClient';
	import { adminState, audioPlayer } from '🍎/store/musicStore';
	import { menubar_state } from '🍎/state/menubar.svelte';
	import { music_menu_config } from '🍎/configs/menu/music.menu.config';

	let songs = $state([]);
	let selectedSong = $state(null);
	let review = $state(null);
	let loading = $state(true);

	// Admin form states
	let showUpload = $state(false);
	let newSong = $state({ title: '', artist: '', album: '', mp3_url: '', cover_url: '' });
	let reviewContent = $state('');
	let reviewRating = $state(0);

	$effect(() => {
		menubar_state.menus = music_menu_config;
	});

	onMount(async () => {
		await fetchSongs();
	});

	async function fetchSongs() {
		loading = true;
		const { data, error } = await supabase
			.from('songs')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) console.error(error);
		else songs = data || [];
		loading = false;
	}

	async function playSong(song) {
		audioPlayer.update((s) => ({ ...s, currentTrack: song, isPlaying: true }));
		selectedSong = song;
		await fetchReview(song.id);
	}

	async function fetchReview(songId) {
		review = null;
		reviewContent = '';
		reviewRating = 0;
		const { data, error } = await supabase
			.from('reviews')
			.select('*')
			.eq('song_id', songId)
			.single();
		if (error && error.code !== 'PGRST116') console.error(error);
		else if (data) {
			review = data;
			reviewContent = data.content;
			reviewRating = data.rating;
		}
	}

	async function saveReview() {
		if (!selectedSong) return;

		const reviewData = {
			song_id: selectedSong.id,
			content: reviewContent,
			rating: reviewRating,
		};

		let error;
		if (review) {
			const { error: err } = await supabase.from('reviews').update(reviewData).eq('id', review.id);
			error = err;
		} else {
			const { error: err } = await supabase.from('reviews').insert([reviewData]);
			error = err;
		}

		if (error) alert('Error saving review: ' + error.message);
		else {
			alert('Review saved!');
			await fetchReview(selectedSong.id);
		}
	}

	async function uploadSong() {
		const { error } = await supabase.from('songs').insert([newSong]);
		if (error) alert('Error uploading song: ' + error.message);
		else {
			alert('Song uploaded!');
			showUpload = false;
			newSong = { title: '', artist: '', album: '', mp3_url: '', cover_url: '' };
			await fetchSongs();
		}
	}

	async function deleteSong(id) {
		if (!confirm('Are you sure?')) return;
		const { error } = await supabase.from('songs').delete().eq('id', id);
		if (error) alert('Error deleting song: ' + error.message);
		else await fetchSongs();
	}
</script>

<div class="music-app">
	<!-- Left Sidebar -->
	<div class="sidebar">
		<div class="traffic-lights-spacer"></div>
		<div class="search-box">
			<span class="search-icon">🔍</span>
			<input type="text" placeholder="Search" />
		</div>

		<div class="nav-group">
			<div class="nav-item"><span class="icon">🏠</span> Home</div>
			<div class="nav-item"><span class="icon">🆕</span> New</div>
			<div class="nav-item"><span class="icon">📻</span> Radio</div>
		</div>

		<div class="nav-group">
			<div class="group-title">Library</div>
			<div class="nav-item"><span class="icon">📌</span> Pins</div>
			<div class="nav-item"><span class="icon">🕒</span> Recently Added</div>
			<div class="nav-item"><span class="icon">🎤</span> Artists</div>
			<div class="nav-item"><span class="icon">💿</span> Albums</div>
			<div class="nav-item active"><span class="icon">🎵</span> Songs</div>
		</div>

		<div class="nav-group">
			<div class="group-title">Store</div>
			<div class="nav-item"><span class="icon">🛍️</span> iTunes Store</div>
		</div>

		<div class="nav-group">
			<div class="group-title">Devices</div>
			<div class="nav-item"><span class="icon">📱</span> Vijay's iPad</div>
			<div class="nav-item"><span class="icon">📱</span> Vijay's iPhone</div>
		</div>

		<div class="nav-group">
			<div class="group-title">Playlists</div>
			<div class="nav-item"><span class="icon">playlist</span> All Playlists</div>
			<div class="nav-item"><span class="icon">⭐</span> Favourite Songs</div>
		</div>

		{#if $adminState.isAuthenticated}
			<button class="admin-btn" onclick={() => (showUpload = !showUpload)}>
				{showUpload ? 'Cancel Upload' : 'Upload Song'}
			</button>
		{/if}

		<div class="user-profile">
			<div class="avatar">VA</div>
			<span class="username">VA</span>
		</div>
	</div>

	<!-- Main Content -->
	<div class="main-content">
		<div class="content-header">
			<h2>Songs</h2>
			<div class="header-controls">
				<button class="icon-btn">☰</button>
				<div class="filter-search">
					<span class="icon">🔍</span>
					<input type="text" placeholder="Find in Songs" />
				</div>
			</div>
		</div>

		<div class="content-subheader">
			<div class="column-header artist-col">Album by Artist</div>
			<div class="column-header title-col">Title</div>
		</div>

		{#if showUpload && $adminState.isAuthenticated}
			<div class="upload-form">
				<h3>Upload Song</h3>
				<input bind:value={newSong.title} placeholder="Title" />
				<input bind:value={newSong.artist} placeholder="Artist" />
				<input bind:value={newSong.album} placeholder="Album" />
				<input bind:value={newSong.mp3_url} placeholder="MP3 URL" />
				<input bind:value={newSong.cover_url} placeholder="Cover URL" />
				<button onclick={uploadSong}>Submit</button>
			</div>
		{/if}

		<div class="songs-container">
			{#if loading}
				<p class="loading">Loading...</p>
			{:else}
				{#each songs as song, i}
					<div
						class="song-row"
						class:playing={$audioPlayer.currentTrack?.id === song.id}
						class:selected={selectedSong?.id === song.id}
						ondblclick={() => playSong(song)}
						onclick={() => {
							selectedSong = song;
							fetchReview(song.id);
						}}
					>
						<div class="album-artist-cell">
							<img src={song.cover_url || 'https://placehold.co/40'} alt="art" class="album-art" />
							<div class="info">
								<div class="album-title">{song.album || 'Unknown Album'}</div>
								<div class="artist-name">{song.artist}</div>
								<div class="rating">☆☆☆☆☆</div>
							</div>
						</div>
						<div class="title-cell">
							<span class="track-num">{i + 1}</span>
							<span class="check">✓</span>
							<span class="song-title">{song.title}</span>
							{#if $adminState.isAuthenticated}
								<button
									class="delete-btn"
									onclick={(e) => {
										e.stopPropagation();
										deleteSong(song.id);
									}}>🗑️</button
								>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Floating Player -->
		<div class="floating-player">
			<div class="player-controls">
				<button class="control-btn">🔀</button>
				<button class="control-btn">⏮</button>
				<button
					class="play-pause-btn"
					onclick={() => audioPlayer.update((s) => ({ ...s, isPlaying: !s.isPlaying }))}
				>
					{$audioPlayer.isPlaying ? '⏸' : '▶'}
				</button>
				<button class="control-btn">⏭</button>
				<button class="control-btn">🔁</button>
			</div>
			<div class="apple-logo"></div>
			<div class="extra-controls">
				<button class="control-btn">💬</button>
				<button class="control-btn">≡</button>
				<button class="control-btn">📡</button>
				<button class="control-btn">🔊</button>
			</div>
		</div>
	</div>

	<!-- Right Sidebar -->
	<div class="right-sidebar">
		<div class="top-buttons">
			<button class="pill-btn">♾ AutoPlay</button>
			<button class="pill-btn red">♾ AutoMix</button>
		</div>

		<div class="sidebar-header">
			<h3>Continue Playing</h3>
			<button class="clear-btn">Clear</button>
		</div>

		<div class="queue-list">
			{#each songs.slice(0, 10) as song}
				<div class="queue-item" onclick={() => playSong(song)}>
					<img src={song.cover_url || 'https://placehold.co/40'} alt="art" />
					<div class="info">
						<div class="title">{song.title}</div>
						<div class="artist">{song.artist}</div>
					</div>
					<button class="more-btn">•••</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.music-app {
		display: grid;
		grid-template-columns: 220px 1fr 280px;
		height: 100%;
		background-color: #1e1e1e;
		color: #e0e0e0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 13px;
	}

	/* Left Sidebar */
	.sidebar {
		background-color: #262626;
		padding: 0 0 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow-y: auto;
	}

	.traffic-lights-spacer {
		height: 3.5rem;
	}

	.search-box {
		margin: 0 1rem 1rem 1rem;
		background: #3a3a3a;
		border-radius: 4px;
		padding: 6px 8px;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.search-box input {
		background: transparent;
		border: none;
		color: white;
		width: 100%;
		outline: none;
		font-size: 13px;
	}

	.nav-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	.group-title {
		padding: 0 1.5rem;
		color: #888;
		font-size: 11px;
		font-weight: 600;
		margin-bottom: 4px;
		text-transform: uppercase;
	}

	.nav-item {
		padding: 6px 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 10px;
		color: #ccc;
		font-weight: 500;
	}

	.nav-item:hover {
		color: white;
		background-color: rgba(255, 255, 255, 0.05);
	}

	.nav-item.active {
		background-color: #3a3a3a;
		color: #fa2d48;
		border-left: 3px solid #fa2d48;
		padding-left: calc(1.5rem - 3px);
	}

	.user-profile {
		margin-top: auto;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.avatar {
		width: 30px;
		height: 30px;
		background: #555;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
	}

	/* Main Content */
	.main-content {
		background-color: #1e1e1e;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	.content-header {
		padding: 3.5rem 2rem 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content-header h2 {
		margin: 0;
		font-size: 24px;
		font-weight: 700;
	}

	.header-controls {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.filter-search {
		background: #2a2a2a;
		border-radius: 6px;
		padding: 4px 8px;
		display: flex;
		align-items: center;
		gap: 6px;
		width: 200px;
	}

	.filter-search input {
		background: transparent;
		border: none;
		color: white;
		width: 100%;
		outline: none;
	}

	.content-subheader {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0.5rem 2rem;
		border-bottom: 1px solid #333;
		color: #888;
		font-size: 12px;
		font-weight: 600;
	}

	.songs-container {
		flex: 1;
		overflow-y: auto;
		padding-bottom: 80px; /* Space for floating player */
	}

	.song-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0.5rem 2rem;
		border-bottom: 1px solid #2a2a2a;
		cursor: pointer;
	}

	.song-row:hover {
		background-color: #2a2a2a;
	}

	.song-row.selected {
		background-color: #333;
	}

	.album-artist-cell {
		display: flex;
		gap: 1rem;
	}

	.album-art {
		width: 48px;
		height: 48px;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.album-title {
		font-weight: 600;
		color: white;
		margin-bottom: 2px;
	}

	.artist-name {
		color: #aaa;
	}

	.rating {
		color: #666;
		font-size: 10px;
	}

	.title-cell {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: #ccc;
	}

	.track-num {
		width: 20px;
		text-align: right;
		color: #666;
	}

	.check {
		color: #666;
	}

	.song-title {
		color: white;
		font-weight: 500;
	}

	/* Floating Player */
	.floating-player {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(40, 40, 40, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 0.5rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
		width: 90%;
		max-width: 600px;
		z-index: 10;
	}

	.player-controls,
	.extra-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.control-btn {
		background: none;
		border: none;
		color: #aaa;
		font-size: 16px;
		cursor: pointer;
	}

	.control-btn:hover {
		color: white;
	}

	.play-pause-btn {
		background: white;
		color: black;
		border: none;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		cursor: pointer;
	}

	.apple-logo {
		flex: 1;
		text-align: center;
		font-size: 20px;
		color: #666;
	}

	/* Right Sidebar */
	.right-sidebar {
		background-color: #1a1a1a;
		padding: 3.5rem 1rem 1rem 1rem;
		border-left: 1px solid #333;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.top-buttons {
		display: flex;
		gap: 10px;
		margin-bottom: 1.5rem;
	}

	.pill-btn {
		flex: 1;
		background: #333;
		border: none;
		padding: 6px;
		border-radius: 16px;
		color: #fa2d48;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
	}

	.pill-btn.red {
		background: rgba(250, 45, 72, 0.2);
	}

	.sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.sidebar-header h3 {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: white;
	}

	.clear-btn {
		background: none;
		border: none;
		color: #fa2d48;
		cursor: pointer;
		font-size: 12px;
	}

	.queue-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 4px;
	}

	.queue-item:hover {
		background-color: #2a2a2a;
	}

	.queue-item img {
		width: 40px;
		height: 40px;
		border-radius: 4px;
	}

	.queue-item .info {
		flex: 1;
		min-width: 0;
	}

	.queue-item .title {
		color: white;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.queue-item .artist {
		color: #888;
		font-size: 12px;
	}

	.more-btn {
		background: none;
		border: none;
		color: #888;
		cursor: pointer;
		opacity: 0;
	}

	.queue-item:hover .more-btn {
		opacity: 1;
	}

	.admin-btn {
		margin: 1rem;
		padding: 8px;
		background: #fa2d48;
		border: none;
		border-radius: 4px;
		color: white;
		cursor: pointer;
	}

	.upload-form {
		padding: 1rem;
		background: #2a2a2a;
		margin: 1rem;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.upload-form input {
		padding: 8px;
		background: #333;
		border: 1px solid #444;
		color: white;
		border-radius: 4px;
	}
</style>

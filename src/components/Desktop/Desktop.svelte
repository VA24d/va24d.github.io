<script>
	import Dock from '../Dock/Dock.svelte';
	import TopBar from '../TopBar/TopBar.svelte';
	import BootupScreen from './BootupScreen.svelte';
	import LockScreen from './LockScreen.svelte';
	import ContextMenu from './ContextMenu.svelte';
	import SystemUpdate from './SystemUpdate.svelte';
	import WindowsArea from './Window/WindowsArea.svelte';
	import { audioPlayer } from '🍎/store/musicStore.js';
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import { apps } from '🍎/state/apps.svelte';

	const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

	if (!isMac) {
		Promise.all([
			import('@fontsource/inter/latin-ext-300.css'),
			import('@fontsource/inter/latin-ext-400.css'),
			import('@fontsource/inter/latin-ext-500.css'),
			import('@fontsource/inter/latin-ext-600.css'),
		]);
	}
	/** @type {HTMLElement} */
	let mainEl;

	let audioEl;
	let isLocked = $state(true);

	function handleUnlock() {
		isLocked = false;
		const audio = new Audio('/sounds/mac-startup-sound.mp3');
		audio.play().catch((e) => console.error(e));

		// Open Welcome App
		apps.open.welcome = true;
	}

	$effect(() => {
		if (audioEl && $audioPlayer.currentTrack) {
			if ($audioPlayer.isPlaying) {
				audioEl.play().catch((e) => console.error('Play failed', e));
			} else {
				audioEl.pause();
			}
			audioEl.volume = $audioPlayer.volume;
		}
	});
</script>

<div
	bind:this={mainEl}
	class="container"
	style:--wallpaper-url="url('{preferences.wallpaper.image}')"
>
	<main class:hidden={isLocked}>
		<TopBar />
		<WindowsArea />
		<Dock />
	</main>

	{#if isLocked}
		<LockScreen on:unlock={handleUnlock} />
	{/if}
	<BootupScreen />
	<SystemUpdate />

	<ContextMenu target_element={mainEl} />

	<audio
		bind:this={audioEl}
		src={$audioPlayer.currentTrack?.mp3_url}
		onended={() => audioPlayer.update((s) => ({ ...s, isPlaying: false }))}
	></audio>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		background-image: var(--wallpaper-url);
		background-size: cover;
		background-position: center;
	}

	main {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	.hidden {
		display: none;
	}
</style>

<script lang="ts">
	import BatterySVG from '../SVG/BatterySVG.svelte';
	import DisplaySVG from '../SVG/DisplaySVG.svelte';
	import FlagSVG from '../SVG/FlagSVG.svelte';
	import MoonSVG from '../SVG/MoonSVG.svelte';
	import SoundSVG from '../SVG/SoundSVG.svelte';
	import WalletSVG from '../SVG/WalletSVG.svelte';
	import WifiSVG from '../SVG/WifiSVG.svelte';
</script>

<div class="status-icons">
	<button class="icon-btn"><FlagSVG /></button>
	<button class="icon-btn"><MoonSVG /></button>
	<button class="icon-btn"><SoundSVG /></button>
	<button class="icon-btn"><DisplaySVG /></button>
	<button class="icon-btn"><WalletSVG /></button>
	<div class="battery-group">
		<span class="battery-text">100%</span>
		<button class="icon-btn"><BatterySVG /></button>
	</div>
	<button class="icon-btn"><WifiSVG /></button>
</div>

<style>
	.status-icons {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-right: 0.5rem;
	}

	.icon-btn {
		background: none;
		border: none;
		padding: 0 4px;
		cursor: default;
		color: var(--system-color-light-contrast);
		display: flex;
		align-items: center;
		height: 100%;
		border-radius: 4px;
	}

	.icon-btn:hover {
		background-color: hsla(var(--system-color-dark-hsl), 0.1);
	}

	.battery-group {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 500;
	}

	:global(svg) {
		fill: currentColor;
	}
</style>

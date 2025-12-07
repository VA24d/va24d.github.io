<script lang="ts">
	import { fade_out } from '🍎/helpers/fade';
	import { should_show_notch } from '🍎/state/menubar.svelte.ts';

	import { sineIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import ActionCenterToggle from './ActionCenterToggle.svelte';
	import MenuBar from './MenuBar.svelte';
	import StatusIcons from './StatusIcons.svelte';
	import TopBarTime from './TopBarTime.svelte';
</script>

<header>
	<MenuBar />

	<span style:flex="1 1 auto"></span>

	{#if should_show_notch.value}
		<div class="notch" in:fade={{ duration: 150, easing: sineIn }} out:fade_out>
			<span> <img src="/emojis/wink.png" alt="Wink emoji" class="emoji" /> </span>
		</div>
	{/if}

	<StatusIcons />
	<ActionCenterToggle />

	<button>
		<TopBarTime />
	</button>
</header>

<style>
	header {
		display: flex;
		align-items: center;

		position: relative;

		width: 100%;
		height: 1.8rem;

		z-index: 9998; /* Ensure it's on top but below LockScreen */

		/* Liquid Glass Style */
		background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);
		backdrop-filter: blur(8px) saturate(var(--saturation));
		-webkit-backdrop-filter: blur(8px) saturate(var(--saturation));
		box-shadow:
			inset 0 0 0 1px
				color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
			inset 1.8px 3px 0px -2px
				color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 90%), transparent),
			inset -2px -2px 0px -2px
				color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 80%), transparent),
			inset -3px -8px 1px -6px
				color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent),
			inset -0.3px -1px 4px 0px
				color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 12%), transparent),
			inset -1.5px 2.5px 0px -2px
				color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent),
			0px 1px 5px 0px
				color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent),
			0px 6px 16px 0px
				color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent);

		transition:
			background-color 400ms cubic-bezier(1, 0, 0.4, 1),
			box-shadow 400ms cubic-bezier(1, 0, 0.4, 1);

		color: var(--system-color-light-contrast);
		fill: var(--system-color-light-contrast);

		button {
			font-weight: 500;
			font-size: 0.8rem;
			font-family: var(--system-font-family);

			letter-spacing: 0.3px;

			position: relative;

			height: 100%;

			text-shadow: 0 0 1px hsla(0, 0%, 0%, 0.1);
		}
	}

	.notch {
		--width: 140px;

		display: grid;
		place-items: center;

		position: absolute;
		top: 0;
		left: 50%;

		width: var(--width);
		height: 95%;

		background-color: #222;
		border-radius: 0 0 0.5rem 0.5rem;
		transform: translateX(-50%);

		& > span {
			opacity: 0;

			transition: opacity 0.2s ease-in-out;
		}

		&:hover {
			& > span {
				opacity: 1;
			}
		}

		/* // for outward curves */
		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			height: 16px;
			width: 16px;
			border-radius: 50%;
		}
		&::before {
			left: -16px;
			box-shadow: 8px -8px #222;
		}
		&::after {
			right: -16px;
			box-shadow: -8px -8px #222;
		}
	}

	header::before {
		content: '';

		width: inherit;
		height: inherit;

		position: fixed;
		left: 0;
		top: 0;

		z-index: 0;
		backdrop-filter: blur(12px);
	}

	.emoji {
		height: 1.5em;
		width: 1.5em;

		vertical-align: middle;
	}
</style>

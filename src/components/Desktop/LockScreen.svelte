<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let password = $state('');
	let isShaking = $state(false);

	function unlock() {
		if (password === 'VA') {
			const audio = new Audio('/sounds/mac-startup-sound.mp3');
			audio.play();
			dispatch('unlock');
		} else {
			password = '';
			isShaking = true;
			setTimeout(() => (isShaking = false), 500);
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			unlock();
		}
	}
</script>

<div class="lock-screen" out:fade={{ duration: 500 }}>
	<div class="content">
		<div class="profile">
			<div class="avatar">
				<img
					src="/purus-profile/profile.webp"
					alt="User"
					onerror={(e) =>
						((e.currentTarget as HTMLImageElement).src =
							'https://ui-avatars.com/api/?name=Vijay+Aravynthan&background=random')}
				/>
			</div>
			<h2>Vijay Aravynthan</h2>
		</div>
		<div class="input-group" class:shake={isShaking}>
			<input
				type="password"
				placeholder="Enter Password"
				bind:value={password}
				onkeydown={handleKeydown}
			/>
		</div>
		<p class="hint">Press Enter to unlock</p>
	</div>
</div>

<style>
	.lock-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: 20vh;
		align-items: center;
		z-index: 9999; /* Below BootupScreen (10000) but above TopBar (9998) */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.profile {
		text-align: center;
		color: white;
		margin-bottom: 2rem;
	}
	.avatar img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 1rem;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}
	.input-group {
		display: flex;
		gap: 0.5rem;
	}
	.shake {
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
	input {
		padding: 0.5rem;
		border-radius: 20px;
		border: none;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		text-align: center;
		backdrop-filter: blur(10px);
	}
	input::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}
	.hint {
		color: rgba(255, 255, 255, 0.7);
		margin-top: 1rem;
		font-size: 0.8rem;
	}
</style>

<script>
	import { supabase } from '🍎/lib/supabaseClient';
	import { adminState } from '🍎/store/musicStore';
	import { apps } from '🍎/state/apps.svelte';

	let email = $state('');
	let password = $state('');
	let error = $state('');

	let { onClose } = $props();

	async function login() {
		const { data, error: err } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (err) {
			error = err.message;
		} else {
			adminState.set({ isAuthenticated: true, user: data.user });

			// Open Welcome App
			apps.open.welcome = true;

			onClose();
		}
	}
</script>

<div class="modal-overlay">
	<div class="modal">
		<h2>Admin Login</h2>
		{#if error}<p class="error">{error}</p>{/if}
		<input bind:value={email} placeholder="Email" />
		<input type="password" bind:value={password} placeholder="Password" />
		<div class="buttons">
			<button onclick={login}>Login</button>
			<button onclick={onClose}>Cancel</button>
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	.modal {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		color: black;
	}
	.error {
		color: red;
	}
	.buttons {
		display: flex;
		gap: 1rem;
	}
</style>

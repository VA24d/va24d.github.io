<script lang="ts">
	import type { AppID } from '🍎/state/apps.svelte';

	const {
		app_id,
		is_being_dragged,
	}: {
		app_id: AppID;
		is_being_dragged: boolean;
	} = $props();
</script>

{#if app_id === 'files'}
	{#await import('./Files/Files.svelte') then { default: Files }}
		<Files />
	{/await}
{:else if app_id === 'aboutMac'}
	{#await import('./AboutMac/AboutMac.svelte') then { default: AboutMac }}
		<AboutMac />
	{/await}
{:else if app_id === 'music'}
	{#await import('./Music/Music.svelte') then { default: Music }}
		<Music />
	{/await}
{:else if app_id === 'settings'}
	{#await import('./Settings/Settings.svelte') then { default: Settings }}
		<Settings />
	{/await}
{:else if app_id === 'terminal'}
	{#await import('./Terminal/Terminal.svelte') then { default: Terminal }}
		<Terminal />
	{/await}
{:else if app_id === 'welcome'}
	{#await import('./Welcome/Welcome.svelte') then { default: Welcome }}
		<Welcome />
	{/await}
{:else if app_id === 'blog'}
	{#await import('./Blog/Blog.svelte') then { default: Blog }}
		<Blog />
	{/await}
{:else if app_id === 'user'}
	{#await import('./Settings/Settings.svelte') then { default: Settings }}
		<Settings />
	{/await}
{:else if app_id === 'mail'}
	{#await import('./Mail/Mail.svelte') then { default: Mail }}
		<Mail />
	{/await}
{:else if app_id === 'safari'}
	{#await import('./Safari/Safari.svelte') then { default: Safari }}
		<Safari />
	{/await}
{:else if app_id === 'reminders'}
	{#await import('./Reminders/Reminders.svelte') then { default: Reminders }}
		<Reminders />
	{/await}
{:else if app_id === 'notes'}
	{#await import('./Notes/Notes.svelte') then { default: Notes }}
		<Notes />
	{/await}
{:else if app_id === 'firefox'}
	{#await import('./Firefox/Firefox.svelte') then { default: Firefox }}
		<Firefox />
	{/await}
{:else if app_id === 'vscode'}
	{#await import('./VSCode/VSCode.svelte') then { default: VSCode }}
		<VSCode />
	{/await}
{:else if app_id === 'arc'}
	{#await import('./Arc/Arc.svelte') then { default: Arc }}
		<Arc />
	{/await}
{:else if app_id === 'chrome'}
	{#await import('./Chrome/Chrome.svelte') then { default: Chrome }}
		<Chrome />
	{/await}
{:else if app_id === 'spark'}
	{#await import('./Spark/Spark.svelte') then { default: Spark }}
		<Spark />
	{/await}
{:else if app_id === 'word'}
	{#await import('./Word/Word.svelte') then { default: Word }}
		<Word />
	{/await}
{/if}

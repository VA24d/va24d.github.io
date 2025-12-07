<script lang="ts">
	import { onMount } from 'svelte';

	let history = $state([
		{ type: 'output', content: 'Welcome to macOS Terminal' },
		{ type: 'output', content: 'Type "help" for a list of commands.' },
	]);
	let input = $state('');
	let inputEl;

	const commands = {
		help: 'Available commands: help, clear, echo, date, whoami, ls',
		clear: () => (history = []),
		echo: (args) => args.join(' '),
		date: () => new Date().toString(),
		whoami: 'admin',
		ls: 'Desktop  Documents  Downloads  Music  Pictures',
	};

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			const cmdLine = input.trim();
			if (cmdLine) {
				history = [...history, { type: 'input', content: cmdLine }];
				const [cmd, ...args] = cmdLine.split(' ');

				if (commands[cmd]) {
					const output = typeof commands[cmd] === 'function' ? commands[cmd](args) : commands[cmd];
					if (output !== undefined) {
						history = [...history, { type: 'output', content: output }];
					}
				} else {
					history = [...history, { type: 'error', content: `command not found: ${cmd}` }];
				}
			} else {
				history = [...history, { type: 'input', content: '' }];
			}
			input = '';
			setTimeout(() => inputEl?.scrollIntoView(), 10);
		}
	}

	onMount(() => {
		inputEl?.focus();
	});
</script>

<div class="terminal" onclick={() => inputEl?.focus()}>
	{#each history as item}
		<div class={item.type}>
			{#if item.type === 'input'}
				<span class="prompt">➜ ~</span>
			{/if}
			{item.content}
		</div>
	{/each}
	<div class="input-line">
		<span class="prompt">➜ ~</span>
		<input
			bind:this={inputEl}
			bind:value={input}
			onkeydown={handleKeydown}
			spellcheck="false"
			autocomplete="off"
		/>
	</div>
</div>

<style>
	.terminal {
		background-color: #1e1e1e;
		color: #f0f0f0;
		font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
		font-size: 14px;
		padding: 3.5rem 10px 10px 10px;
		height: 100%;
		width: 100%;
		overflow-y: auto;
		cursor: text;
	}

	.prompt {
		color: #0f0;
		margin-right: 8px;
	}

	.input-line {
		display: flex;
	}

	input {
		background: transparent;
		border: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		flex: 1;
		outline: none;
		padding: 0;
		margin: 0;
	}

	.error {
		color: #ff5555;
	}
</style>

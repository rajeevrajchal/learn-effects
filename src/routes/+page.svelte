<script lang="ts">
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let background: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	const ratios = $state({
		background: 0.5,
		content: 0.25,
		cover: 0.75
	});

	let config = $state<Record<string, { x: number; y: number }>>({
		main: {
			x: 0,
			y: 0
		},
		content: {
			x: 0,
			y: 0
		},
		cover: {
			x: 0,
			y: 0
		},
		background: {
			x: 0,
			y: 0
		}
	});

	const positions = $derived({
		content: {
			x: config.main.x * ratios.content + config.content.x,
			y: config.main.y * ratios.content + config.content.y
		},
		cover: {
			x: config.main.x * ratios.cover + config.cover.x,
			y: config.main.y * ratios.cover + config.cover.y
		},
		background: {
			x: config.main.x * ratios.background + config.background.x,
			y: config.main.y * ratios.background + config.background.y
		}
	});

	const transforms = $derived({
		content: `translate(${positions.content.x}px, ${positions.content.y}px)`,
		cover: `translate(${positions.cover.x}px, ${positions.cover.y}px)`,
		background: `translate(${positions.background.x}px, ${positions.background.y}px)`
	});

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Movement' });
		if (!folder) return;

		Object.entries(config).forEach(([key]) => {
			const itemFolder = folder?.addFolder({ title: key });
			if (!itemFolder) return;

			itemFolder.addBinding(config[key], 'x', {
				min: -100,
				max: 100,
				step: 1,
				label: 'Move X Axis'
			});
			itemFolder.addBinding(config[key], 'y', {
				min: -100,
				max: 100,
				step: 1,
				label: 'Move Y Axis'
			});
		});

		const ratiosFolder = folder.addFolder({ title: 'Ratios' });
		ratiosFolder.addBinding(ratios, 'background', {
			min: 0,
			max: 2,
			step: 0.05,
			label: 'Background Ratio'
		});
		ratiosFolder.addBinding(ratios, 'content', {
			min: 0,
			max: 2,
			step: 0.05,
			label: 'Content Ratio'
		});
		ratiosFolder.addBinding(ratios, 'cover', {
			min: 0,
			max: 2,
			step: 0.05,
			label: 'Cover Ratio'
		});

		folder.addButton({ title: 'Reset Card UI' })?.on('click', () => {
			config.main.x = 0;
			config.main.y = 0;
			config.content.x = 0;
			config.content.y = 0;
			config.cover.x = 0;
			config.cover.y = 0;
			config.background.x = 0;
			config.background.y = 0;
			pane.refresh();
		});
	};

	$inspect('positions', { positions });

	onMount(() => {
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<div class="center" bind:this={container}>
	<div class="card" bind:this={card}>
		<!-- Background layer -->
		<img
			class="background"
			bind:this={background}
			src="/player/background.png"
			alt="Background"
			style:transform={transforms.background}
		/>

		<!-- Content layer -->
		<img
			class="content"
			bind:this={content}
			src="/player/player.png"
			alt="Player"
			style:transform={transforms.content}
		/>

		<!-- Cover layer -->
		<div class="cover" bind:this={cover} style:transform={transforms.cover}></div>
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4rem;
		overflow: hidden;
	}

	.card {
		width: 20rem;
		height: 30rem;
		border-radius: 20px;
		position: relative;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.1);
	}

	.background,
	.content,
	.cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		will-change: transform;
	}

	.background {
		object-fit: cover;
	}

	.content {
		object-fit: contain;
	}

	.cover {
		background-image: url('/player/shape.png');
		background-size: cover;
		background-position: bottom center;
		background-repeat: no-repeat;
	}
</style>

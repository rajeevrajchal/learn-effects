<script lang="ts">
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	const pane = useTweakpane();
	let folder: FolderApi | null = null;
	let config = $state<Record<string, { x: number; y: number }>>({
		content: {
			x: 0,
			y: 0
		},
		cover: {
			x: 0,
			y: 0
		},
		card: {
			x: 0,
			y: 0
		}
	});

	let animation = $state<Record<string, number | string>>({ transition: 0.1, ease: 'ease-out' });

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Movement' });
		if (!folder) return;

		// Add movement controls for each element
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

		// Add animation controls
		const animationFolder = folder.addFolder({ title: 'Animation' });
		if (animationFolder) {
			animationFolder.addBinding(animation, 'transition', {
				min: 0,
				max: 0.5,
				step: 0.1,
				label: 'Transition Speed'
			});
			animationFolder.addBinding(animation, 'ease', {
				label: 'Easing',
				options: {
					'Ease In': 'ease-in',
					'Ease Out': 'ease-out',
					'Ease In-Out': 'ease-in-out',
					Linear: 'linear'
				}
			});
		}

		// Add action buttons
		folder.addButton({ title: 'Break Card UI in X Axis' })?.on('click', () => {
			config.content.x = 100;
			config.content.y = 0;
			config.cover.x = -100;
			config.cover.y = 0;
			config.card.x = 0;
			config.card.y = 0;
			pane.refresh();
		});

		folder.addButton({ title: 'Break Card UI in Y Axis' })?.on('click', () => {
			config.content.x = 0;
			config.content.y = 100;
			config.cover.x = 0;
			config.cover.y = 100;
			config.card.x = 0;
			config.card.y = 100;
			pane.refresh();
		});

		folder.addButton({ title: 'Reset Card UI' })?.on('click', () => {
			config.content.x = 0;
			config.content.y = 0;
			config.cover.x = 0;
			config.cover.y = 0;
			config.card.x = 0;
			config.card.y = 0;
			pane.refresh();
		});
	};

	const parallexCard = () => {
		if (!card || !cover || !content) return;

		content.style.transform = `translate(${config.content.x}%, ${config.content.y}%)`;
		card.style.transform = `translate(${config.card.x}%, ${config.card.y}%)`;
		cover.style.transform = `translate(${config.cover.x}%, ${config.cover.y}%)`;
	};

	$effect(() => {
		parallexCard();
	});

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
	<div
		class="card"
		bind:this={card}
		style:--ease={animation.ease}
		style:--duration={`${animation.transition}s`}
	>
		<!-- svelte-ignore a11y_missing_attribute -->
		<img class="content" bind:this={content} src="/player/player.png" />
		<div class="cover" bind:this={cover}></div>
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

	.card,
	.content,
	.cover {
		transition: transform var(--duration) var(--ease);
	}

	.card {
		width: 20rem;
		height: 30rem;
		background-color: #3498db;
		border-radius: 20px;
		position: relative;
		will-change: transform, opacity;
		background-image: url('/player/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.content {
		height: 20rem;
		position: absolute;
		inset: 0;
		will-change: transform, opacity;
		object-fit: cover;
	}

	.cover {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;

		background-image: url('/player/shape.png');
		background-size: cover;
		background-position: bottom center;
		background-repeat: no-repeat;
		overflow: hidden;
	}
</style>

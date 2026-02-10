<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	const config = {
		card: { delay: 0, duration: 600, distance: 100 },
		cover: { delay: 150, duration: 500, distance: 80 },
		content: { delay: 300, duration: 400, distance: 60 }
	};

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	/**
	 * Trigger the parallax entrance animation
	 * Elements animate in sequence: card -> cover -> content
	 */
	const triggerParallaxEntrance = () => {
		if (!card || !cover || !content) return;

		// Reset elements to starting position (hidden below)
		card.style.transition = 'none';
		cover.style.transition = 'none';
		content.style.transition = 'none';

		card.style.transform = `translateY(${config.card.distance}px)`;
		card.style.opacity = '0';

		cover.style.transform = `translateY(${config.cover.distance}px)`;
		cover.style.opacity = '0';

		content.style.transform = `translate(-50%, -30%) translateY(${config.content.distance}px)`;
		content.style.opacity = '0';

		// Force reflow to apply initial styles
		void card.offsetHeight;

		// Animate card (first)
		setTimeout(() => {
			if (!card) return;
			card.style.transition = `transform ${config.card.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${config.card.duration}ms ease-out`;
			card.style.transform = 'translateY(0)';
			card.style.opacity = '1';
		}, config.card.delay);

		// Animate cover (second)
		setTimeout(() => {
			if (!cover) return;
			cover.style.transition = `transform ${config.cover.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${config.cover.duration}ms ease-out`;
			cover.style.transform = 'translateY(0)';
			cover.style.opacity = '1';
		}, config.card.delay + config.cover.delay);

		// Animate content (third - last)
		setTimeout(
			() => {
				if (!content) return;
				content.style.transition = `transform ${config.content.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${config.content.duration}ms ease-out`;
				content.style.transform = 'translate(-50%, -30%) translateY(0)';
				content.style.opacity = '1';
			},
			config.card.delay + config.cover.delay + config.content.delay
		);
	};

	onMount(() => {
		// Setup Tweakpane controls
		folder = pane.addFolder({ title: 'Parallax Animation' });

		if (folder) {
			// Card controls
			const cardFolder = folder.addFolder({ title: 'Card' });
			cardFolder.addBinding(config.card, 'delay', { min: 0, max: 500, step: 10, label: 'Delay' });
			cardFolder.addBinding(config.card, 'duration', {
				min: 100,
				max: 1500,
				step: 50,
				label: 'Duration'
			});
			cardFolder.addBinding(config.card, 'distance', {
				min: 20,
				max: 300,
				step: 10,
				label: 'Distance'
			});

			// Cover controls
			const coverFolder = folder.addFolder({ title: 'Cover' });
			coverFolder.addBinding(config.cover, 'delay', { min: 0, max: 500, step: 10, label: 'Delay' });
			coverFolder.addBinding(config.cover, 'duration', {
				min: 100,
				max: 1500,
				step: 50,
				label: 'Duration'
			});
			coverFolder.addBinding(config.cover, 'distance', {
				min: 20,
				max: 300,
				step: 10,
				label: 'Distance'
			});

			// Content controls
			const contentFolder = folder.addFolder({ title: 'Content' });
			contentFolder.addBinding(config.content, 'delay', {
				min: 0,
				max: 500,
				step: 10,
				label: 'Delay'
			});
			contentFolder.addBinding(config.content, 'duration', {
				min: 100,
				max: 1500,
				step: 50,
				label: 'Duration'
			});
			contentFolder.addBinding(config.content, 'distance', {
				min: 20,
				max: 300,
				step: 10,
				label: 'Distance'
			});

			// Replay button
			folder.addButton({ title: 'Replay Animation' }).on('click', () => {
				triggerParallaxEntrance();
			});
		}

		// Trigger animation on page load
		triggerParallaxEntrance();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<div class="center" bind:this={container}>
	<div class="card" bind:this={card}>
		<!-- svelte-ignore a11y_missing_attribute -->
		<img class="content" bind:this={content} src="./player/player.png" />
		<div class="cover" bind:this={cover}></div>
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 4rem;
		overflow: hidden;
	}

	.card {
		width: 20rem;
		height: 30rem;
		background-color: #3498db;
		border-radius: 20px;
		position: relative;
		will-change: transform, opacity;
		opacity: 0;
		background-image: url('./player/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
	}

	.content {
		height: 20rem;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -30%);
		will-change: transform, opacity;
		opacity: 0;
		object-fit: cover;
	}

	.cover {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;

		background-image: url('./player/shape.png');
		background-size: cover;
		background-position: bottom center;
		background-repeat: no-repeat;
		border-radius: 0 0 20px 20px;
		opacity: 0;
		overflow: hidden;
	}
</style>

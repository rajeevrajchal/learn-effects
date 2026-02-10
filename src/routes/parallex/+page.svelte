<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	const ANIMATION_CONFIG = {
		card: {
			delay: 0, // Starts first
			duration: 600, // ms
			distance: 100 // px from below
		},
		cover: {
			delay: 100, // Starts after card begins
			duration: 500,
			distance: 80
		},
		content: {
			delay: 200, // Starts after cover begins
			duration: 400,
			distance: 80
		}
	};

	const triggerParallaxEntrance = () => {
		if (!card || !cover || !content) return;
		// Reset elements to starting position (hidden below)
		card.style.transition = 'none';
		cover.style.transition = 'none';
		content.style.transition = 'none';
		card.style.transform = `translateY(${ANIMATION_CONFIG.card.distance}px)`;
		card.style.opacity = '0';
		cover.style.transform = `translateY(${ANIMATION_CONFIG.cover.distance}px)`;
		cover.style.opacity = '0';
		content.style.transform = `translate(-50%, -30%) translateY(${ANIMATION_CONFIG.content.distance}px)`;
		content.style.opacity = '0';

		setTimeout(() => {
			card!.style.transition = `transform ${ANIMATION_CONFIG.card.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${ANIMATION_CONFIG.card.duration}ms ease-out`;
			card!.style.transform = 'translateY(0)';
			card!.style.opacity = '1';
		}, ANIMATION_CONFIG.card.delay);

		setTimeout(() => {
			cover!.style.transition = `transform ${ANIMATION_CONFIG.cover.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${ANIMATION_CONFIG.cover.duration}ms ease-out`;
			cover!.style.transform = 'translateY(0)';
			cover!.style.opacity = '1';
		}, ANIMATION_CONFIG.card.delay + ANIMATION_CONFIG.cover.delay);

		setTimeout(
			() => {
				content!.style.transition = `transform ${ANIMATION_CONFIG.content.duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${ANIMATION_CONFIG.content.duration}ms ease-out`;
				content!.style.transform = 'translate(-50%, -30%) translateY(0)';
				content!.style.opacity = '1';
			},
			ANIMATION_CONFIG.card.delay + ANIMATION_CONFIG.cover.delay + ANIMATION_CONFIG.content.delay
		);
	};

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Parallax Animation' });
		if (folder) {
			folder.addButton({ title: 'Replay Animation' }).on('click', () => {
				triggerParallaxEntrance();
			});
		}
	};

	onMount(() => {
		triggerParallaxEntrance();
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="center" bind:this={container}>
	<div class="card" bind:this={card}>
		<div class="content" bind:this={content}></div>
		<div class="cover" bind:this={cover}></div>
	</div>
</div>

<style>
	.center {
		padding: 4rem;
		overflow: hidden; /* Hide elements when below */
	}

	.card {
		width: 20rem;
		height: 30rem;
		background-color: #3498db;
		border-radius: 20px;
		position: relative;
		will-change: transform, opacity;
		opacity: 0; /* Start hidden */
		overflow: hidden; /* Ensure content and cover don't overflow the card */
		perspective: 1000px;
	}

	.content {
		background-color: green;
		width: 10rem;
		height: 20rem;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -30%);
		will-change: transform, opacity;
		opacity: 0; /* Start hidden */
	}

	.cover {
		position: absolute;
		bottom: 0;
		left: 0;
		background: red;
		width: 100%;
		height: 15rem;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		will-change: transform, opacity;
		opacity: 0; /* Start hidden */
	}

	button {
		margin-top: 2rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>

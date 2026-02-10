<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';

	import gsap, { Quad } from 'gsap';
	import Card from '$lib/components/card.svelte';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	const config: Record<
		string,
		{
			distance: number;
			duration: number;
			scale: number;
			ease: typeof Quad.easeOut;
		}
	> = {
		card: {
			distance: 30, // Small distance (far away)
			duration: 1200, // Slower
			scale: 0.95, // Slight scale
			ease: Quad.easeOut
		},
		cover: {
			distance: 100, // Medium distance
			duration: 1000, // Medium speed
			scale: 0.9, // More scale change
			ease: Quad.easeOut
		},
		content: {
			distance: 200, // Large distance (close)
			duration: 800, // Fastest
			scale: 0.85, // Most scale change
			ease: Quad.easeOut
		}
	};

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	const triggerParallaxEntrance = () => {
		if (!card || !cover || !content) return;
		gsap.killTweensOf([card, cover, content]);

		const tl = gsap.timeline();
		const toSec = (ms: number) => ms / 1000;
		gsap.set(card, {
			y: config.card.distance,
			scale: config.card.scale
		});
		gsap.set(cover, {
			y: config.cover.distance,
			scale: 1
		});
		gsap.set(content, {
			y: config.content.distance,
			scale: config.content.scale,
			xPercent: -50,
			yPercent: -30
		});

		// All start at same time (time: 0)
		// But different durations + distances = parallax depth
		tl.to(
			card,
			{
				y: 0,
				scale: 1,
				opacity: 1,
				duration: toSec(config.card.duration),
				ease: config.card.ease
			},
			0.01
		);
		tl.to(
			cover,
			{
				y: 0,
				scale: 1,
				opacity: 1,
				duration: toSec(config.cover.duration),
				ease: config.cover.ease
			},
			0.05
		); // Tiny offset for layered feel
		tl.to(
			content,
			{
				y: 0,
				scale: 1,
				opacity: 1,
				duration: toSec(config.content.duration),
				ease: config.content.ease
			},
			0.1
		); // Slightly later, but fastest so catches up
		return tl;
	};

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Parallax Animation' });
		if (!folder) return;

		const parentFolder = folder;
		Object.entries(config).forEach(([key]) => {
			const newFolder = parentFolder.addFolder({ title: key });
			newFolder.addBinding(config[key], 'duration', {
				min: 100,
				max: 1500,
				step: 50,
				label: 'Duration'
			});
			newFolder.addBinding(config[key], 'distance', {
				min: 20,
				max: 1500,
				step: 10,
				label: 'Distance'
			});
			newFolder.addBinding(config[key], 'scale', {
				min: 0,
				max: 1,
				step: 0.1,
				label: 'Scale'
			});
		});

		folder.addButton({ title: 'Replay Animation' }).on('click', () => {
			triggerParallaxEntrance();
		});
	};

	onMount(() => {
		// Trigger animation on page load
		triggerParallaxEntrance();
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<Card bind:container bind:content bind:card bind:cover />

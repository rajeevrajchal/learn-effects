<script lang="ts">
	import Team from '$lib/components/team.svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';
	import gsap from 'gsap';

	const pane = useTweakpane();
	let folder: FolderApi | null = null;
	let parallaxFolder: FolderApi | null = null;

	let shineConfig = $state({
		shine: { rotation: 0 },
		mouse: { x: 0, y: 0 }
	});

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Shine Effect' });
		if (!folder) return;
		folder.addBinding(shineConfig.shine, 'rotation', {
			min: -1,
			max: 1,
			step: 0.01,
			label: 'Rotation'
		});

		parallaxFolder = pane.addFolder({ title: 'Parallax' });
		if (!parallaxFolder) return;
		parallaxFolder.addBinding(shineConfig.mouse, 'x', {
			min: -1,
			max: 1,
			step: 0.01,
			label: 'X Axis',
			readonly: true
		});
		parallaxFolder.addBinding(shineConfig.mouse, 'y', {
			min: -1,
			max: 1,
			step: 0.01,
			label: 'Y Axis',
			readonly: true
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		const x = (e.clientX / window.innerWidth) * 2 - 1;
		const y = (e.clientY / window.innerHeight) * 2 - 1;
		gsap.to(shineConfig.mouse, { x, y, duration: 0.5, ease: 'power2.out', overwrite: true });
	};

	const handleMouseLeave = () => {
		gsap.to(shineConfig.mouse, { x: 0, y: 0, duration: 1.0, ease: 'power2.out' });
	};

	onMount(async () => {
		setUpTweakpane();
	});

	onDestroy(() => {
		gsap.killTweensOf(shineConfig.mouse);
		if (folder) pane.removeFolder(folder);
		if (parallaxFolder) pane.removeFolder(parallaxFolder);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="center" onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}>
	<Team config={shineConfig} />
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100dvh;

		:global(svg) {
			width: 10rem;
			height: 10rem;
		}
	}
</style>

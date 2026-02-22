<script lang="ts">
	import Team from '$lib/components/team.svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	const pane = useTweakpane();
	let folder: FolderApi | null = null;
	let parallax: FolderApi | null = null;

	let shineConfig = $state({
		shine: {
			rotation: 0
		},
		mouse: {
			x: 0,
			y: 0
		}
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

		parallax = pane.addFolder({ title: 'Parallax' });
		if (!parallax) return;
		parallax.addBinding(shineConfig.mouse, 'x', {
			min: -100,
			max: 100,
			step: 1,
			label: 'X Axis'
		});
		parallax.addBinding(shineConfig.mouse, 'y', {
			min: -100,
			max: 100,
			step: 1,
			label: 'Y Axis'
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		shineConfig.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		shineConfig.mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
	};

	const handleMouseLeave = () => {
		shineConfig.mouse.x = 0;
		shineConfig.mouse.y = 0;
	};

	onMount(() => {
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
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

		:global(svg) {
			width: 10rem;
			height: 10rem;
		}
	}
</style>

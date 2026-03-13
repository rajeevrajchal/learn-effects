<script lang="ts">
	import Progress from '$lib/components/progress.svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	let progressConfig = $state({
		value: 80,
		steps: 2,
		width: 8
	});

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Progress' });
		if (!folder) return;
		folder.addBinding(progressConfig, 'value', {
			min: 0,
			max: 100,
			step: 1
		});
		folder.addBinding(progressConfig, 'steps', {
			min: 0,
			max: 5,
			step: 1
		});
		folder.addBinding(progressConfig, 'width', {
			min: 0,
			max: 100,
			step: 10
		});
	};

	let value = $derived(progressConfig.value);
	let steps = $derived(progressConfig.steps);

	onMount(async () => {
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) pane.removeFolder(folder);
	});
</script>

<div class="center" style="--width: {progressConfig.width}">
	<Progress {value} {steps} />
</div>

<style>
	.center {
		--width: 8;
		:global(svg) {
			width: calc(var(--width) * 10px);
		}
	}
</style>

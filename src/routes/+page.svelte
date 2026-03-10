<script lang="ts">
	import Progress from '$lib/components/progress.svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	let progressConfig = $state({
		progress: { value: 80 }
	});

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Progress' });
		if (!folder) return;
		folder.addBinding(progressConfig.progress, 'value', {
			min: 0,
			max: 100,
			step: 1
		});
	};

	let value = $derived(progressConfig.progress.value);

	onMount(async () => {
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) pane.removeFolder(folder);
	});
</script>

<div class="center">
	<Progress {value} />
</div>

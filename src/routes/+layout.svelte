<script lang="ts">
	import '../style/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import { TweakpaneProvider } from '$lib/tweakpane';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<TweakpaneProvider title="Controls" position="top-right">
	{@render children()}
</TweakpaneProvider>

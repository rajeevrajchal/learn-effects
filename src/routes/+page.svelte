<script lang="ts">
	import Card from '$lib/components/card.svelte';

	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let card: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();
</script>

<Card bind:container bind:content bind:card bind:cover />

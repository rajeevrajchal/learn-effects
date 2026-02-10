<script lang="ts">
	let {
		container = $bindable(undefined),
		card = $bindable(undefined),
		content = $bindable(undefined),
		cover = $bindable(undefined)
	}: {
		container?: HTMLElement;
		card?: HTMLElement;
		content?: HTMLElement;
		cover?: HTMLElement;
	} = $props();
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
		background-image: url('./player/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		perspective: 1000px;
	}

	.content {
		height: 20rem;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -30%);
		will-change: transform, opacity;
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
		overflow: hidden;
	}
</style>

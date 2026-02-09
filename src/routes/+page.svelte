<script lang="ts">
	let content: HTMLElement | undefined = $state();
	let cover: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();
</script>

<div class="center">
	<div class="card" bind:this={container}>
		<div class="content" bind:this={content}></div>
		<div class="cover" bind:this={cover}></div>
	</div>
</div>

<style>
	.card {
		width: 20rem;
		height: 30rem;
		background-color: #3498db;
		border-radius: 20px;
		position: relative;
	}

	.content {
		background-color: green;
		width: 10rem;
		height: 20rem;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -30%);
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
	}
</style>

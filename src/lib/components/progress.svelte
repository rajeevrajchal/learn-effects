<script lang="ts">
	let {
		value
	}: {
		value: number;
	} = $props();
</script>

<div class="progress">
	<div class="body"></div>

	<div class="inner-body"></div>

	<div class="track" style:width={`${value}%`}></div>

	<div class="steps">
		<div class="step"></div>
		<div class="step"></div>
	</div>
</div>

<style>
	.progress {
		width: 30rem;
		height: 100%;
		min-height: 50px;
		position: relative;
	}

	.body {
		width: 100%;
		height: 100%;
		border-radius: 24px;
		background: blue;
	}

	.inner-body {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		height: 34px;
		border-top: 8px solid black;
		border-bottom: 8px solid black;
		border-radius: 10px;
		z-index: 1;
	}

	.track {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background: green;
		max-width: 100%;
		height: 34px;
	}

	.steps {
		position: absolute;
		top: 50%;
		left: -8px;
		right: -8px;
		transform: translateY(-50%);

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.step {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		border: 8px solid black;
	}
</style>

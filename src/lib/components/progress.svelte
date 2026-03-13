<script lang="ts">
	let {
		value = $bindable(0),
		steps = 2
	}: {
		value?: number;
		steps?: number;
	} = $props();

	const VIEWBOX_WIDTH = 100;
	const VIEWBOX_HEIGHT = 80;
	const CX_LEFT = 40;
	const CX_RIGHT = 540;
	const CY = 40;

	const circlePositions = $derived(
		steps < 2
			? steps === 1
				? [CX_LEFT]
				: []
			: Array.from({ length: steps }, (_, i) => CX_LEFT + ((CX_RIGHT - CX_LEFT) * i) / (steps - 1))
	);

	// One tube segment [left cx, right cx] between each adjacent pair of circles.
	// Empty when steps <= 1.
	const segments = $derived(
		circlePositions.slice(0, -1).map((cx, i) => ({
			left: cx,
			right: circlePositions[i + 1]
		}))
	);

	// Total bone extent — drives green fill rect width.
	// steps=0: pure tube spanning full viewBox width, no knobs.
	// steps>=1: from leftmost circle edge to rightmost circle edge.
	const boneStart = $derived(steps === 0 ? 0 : circlePositions[0] - 34);
	const boneEnd = $derived(steps === 0 ? VIEWBOX_WIDTH : (circlePositions.at(-1) ?? CX_LEFT) + 34);
	const boneTotalWidth = $derived(boneEnd - boneStart);

	const tipX = $derived(boneStart + (value / 100) * boneTotalWidth);
	const showTip = $derived(
		value > 0 && !circlePositions.some((cx) => Math.abs(tipX - cx - 4) <= 30)
	);
</script>

<svg
	viewBox="0 0 {VIEWBOX_WIDTH} {VIEWBOX_HEIGHT}"
	class="progress-svg"
	overflow="visible"
	aria-label="Progress bar: {value}%"
	role="progressbar"
	aria-valuenow={value}
>
	<defs>
		<linearGradient id="pg-gradient" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#d9e649" />
			<stop offset="100%" stop-color="#8cc63f" />
		</linearGradient>
		<clipPath id="pg-bone-inner">
			{#if steps === 0}
				<rect x="0" y="34" width={VIEWBOX_WIDTH} height="12" />
			{:else}
				{#each circlePositions as cx (cx)}
					<circle {cx} cy={CY} r="22" />
				{/each}
				{#each segments as seg (seg.left)}
					<rect x={seg.left} y="34" width={seg.right - seg.left} height="12" />
				{/each}
			{/if}
		</clipPath>
	</defs>

	<!-- Gray border layer -->
	{#if steps === 0}
		<rect x="0" y="25" width={VIEWBOX_WIDTH} height="30" fill="#4a4a4a" />
	{:else}
		{#each circlePositions as cx (cx)}
			<circle {cx} cy={CY} r="34" fill="#4a4a4a" />
		{/each}
		{#each segments as seg (seg.left)}
			<rect x={seg.left} y="25" width={seg.right - seg.left} height="30" fill="#4a4a4a" />
		{/each}
	{/if}

	<!-- Dark inner body -->
	{#if steps === 0}
		<rect x="0" y="31" width={VIEWBOX_WIDTH} height="18" fill="#2e2e2e" />
	{:else}
		{#each circlePositions as cx (cx)}
			<circle {cx} cy={CY} r="28" fill="#2e2e2e" />
		{/each}
		{#each segments as seg (seg.left)}
			<rect x={seg.left} y="31" width={seg.right - seg.left} height="18" fill="#2e2e2e" />
		{/each}
	{/if}

	<!-- Green fill clipped to inner bone shape, width driven by value -->
	<rect
		x={boneStart}
		y="0"
		width={(value / 100) * boneTotalWidth}
		height={VIEWBOX_HEIGHT}
		fill="url(#pg-gradient)"
		clip-path="url(#pg-bone-inner)"
	/>

	<!-- indicator -->
	{#if showTip}
		<rect x={tipX - 2} y="25" width="12" height={30} fill="url(#pg-gradient)" />
	{/if}
</svg>

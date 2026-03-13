<script lang="ts">
	let {
		value = $bindable(0),
		steps = 2
	}: {
		value?: number;
		steps?: number;
	} = $props();

	const CY = 40;
	const CX_LEFT = 40;
	const CX_RIGHT = 540;

	const circles = $derived(
		Array.from({ length: Math.max(steps, 1) }, (_, i) =>
			steps < 2 ? CX_LEFT : CX_LEFT + ((CX_RIGHT - CX_LEFT) * i) / (steps - 1)
		)
	);

	const segments = $derived(
		circles.slice(0, -1).map((left, i) => ({ left, right: circles[i + 1] }))
	);

	const start = $derived(circles[0] - 34);
	const end = $derived(circles.at(-1)! + 34);
	const filled = $derived((value / 100) * (end - start));
	const tipX = $derived(start + filled);
	const showTip = $derived(value > 0 && circles.every((cx) => Math.abs(tipX - cx - 4) > 30));
</script>

<svg
	viewBox="0 0 100 80"
	overflow="visible"
	role="progressbar"
	aria-valuenow={value}
	class="progress"
	aria-label="Progress: {value}%"
>
	<defs>
		<linearGradient id="pg-gradient" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#d9e649" />
			<stop offset="100%" stop-color="#8cc63f" />
		</linearGradient>
		<clipPath id="pg-bone-inner">
			{#each circles as cx (cx)}<circle {cx} cy={CY} r="22" />{/each}
			{#each segments as { left, right } (left)}<rect
					x={left}
					y="34"
					width={right - left}
					height="12"
				/>{/each}
		</clipPath>
	</defs>

	{#snippet layer(r: number, fill: string)}
		{#each circles as cx (cx)}<circle {cx} cy={CY} {r} {fill} />{/each}
		{#each segments as { left, right } (left)}<rect
				x={left}
				y={CY - r * 0.536}
				width={right - left}
				height={r * 1.072}
				{fill}
			/>{/each}
	{/snippet}

	{@render layer(34, '#4a4a4a')}
	{@render layer(28, '#2e2e2e')}

	<rect
		x={start}
		y="0"
		width={filled}
		height="80"
		fill="url(#pg-gradient)"
		clip-path="url(#pg-bone-inner)"
	/>
	{#if showTip}<rect x={tipX - 2} y="25" width="12" height="30" fill="url(#pg-gradient)" />{/if}
</svg>

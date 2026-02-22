<script lang="ts">
	const colors = ['#8DADFF', '#FFFFFF', '#1C5FDA'];

	let ratio = {
		background: 1,
		midground: 2,
		foreground: 3,
		shine: 5
	};

	let {
		config
	}: {
		config: {
			shine: { rotation: number };
			mouse: { x: number; y: number };
		};
	} = $props();

	let derivedColors = $derived(colors);
	let derivedType = $derived('all');

	let fills = $derived({
		background: derivedColors[0 % derivedColors.length],
		midground: derivedColors[1 % derivedColors.length],
		foreground: derivedColors[2 % derivedColors.length]
	});

	let opacity = $derived(fills.background === '#000000' ? 0.3 : 0.5);
	let mixBlendMode = $derived(fills.background === '#000000' ? 'normal' : 'overlay');

	let shine = $derived(config.shine);
	let mouse = $derived(config.mouse);

	let svgElement: SVGSVGElement | undefined = $state(undefined);

	let shineTransform = $derived(
		`rotate(${shine.rotation * 360 + mouse.x * ratio.shine * 36}, 20, 20) scale(1, -1) translate(0, -40)`
	);

	let parallax = $derived({
		background: { x: mouse.x * ratio.background, y: mouse.y * ratio.background },
		midground: { x: mouse.x * ratio.midground, y: mouse.y * ratio.midground },
		foreground: { x: mouse.x * ratio.foreground, y: mouse.y * ratio.foreground }
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={['team-icon']}
	viewBox="0 0 40 40"
	transform="matrix(1,0,0,-1,0,0)"
	bind:this={svgElement}
>
	<defs>
		<linearGradient
			id="team-badge-gradient"
			x1="0"
			y1="0"
			x2="0"
			y2="40"
			gradientUnits="userSpaceOnUse"
		>
			<stop offset=".05" stop-color="#000" />
			<stop offset=".95" stop-color="#fff" />
		</linearGradient>
	</defs>

	<path
		fill={fills.background}
		transform={`translate(${parallax.background.x}, ${parallax.background.y})`}
		d="M20,0h0C8.9,0,0,9,0,20v16c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-16C40,9,31,0,20,0Z"
	/>
	<path
		fill="url(#team-badge-gradient)"
		{opacity}
		style:mix-blend-mode={mixBlendMode}
		d="M20,2C10.1,2,2,10.1,2,20v16c0,1.1.9,2,2,2h32c1.1,0,2-.9,2-2v-16c0-9.9-8.1-18-18-18Z"
	/>
	<circle
		fill={fills.midground}
		cx="20"
		cy="20"
		r="17"
		transform={`translate(${parallax.midground.x}, ${parallax.midground.y})`}
	/>

	{#if derivedType === 'diamond'}
		<polygon
			fill={fills.foreground}
			transform={`translate(${parallax.foreground.x}, ${parallax.foreground.y})`}
			points="20 10.1 10.1 20 20 29.9 29.9 20 20 10.1"
		/>
	{:else if derivedType === 'circle'}
		<circle
			fill={fills.foreground}
			cx="20"
			cy="20"
			r="10"
			transform={`translate(${parallax.foreground.x}, ${parallax.foreground.y})`}
		/>
	{:else if derivedType === 'square'}
		<rect
			fill={fills.foreground}
			x="12"
			y="12"
			width="16"
			height="16"
			transform={`translate(${parallax.foreground.x}, ${parallax.foreground.y})`}
		/>
	{:else}
		<path
			fill={fills.foreground}
			transform={`translate(${parallax.foreground.x}, ${parallax.foreground.y})`}
			d="M26.76 8.8 9.349 27.082 5.6 23.149l10.577-11.113L13.252 8.8zm-.811 21.6h-13.51l17.413-18.282 3.748 3.934-10.578 11.112z"
		/>
	{/if}

	<image
		href="/team/team-shine.png"
		x="-2.2"
		y="-6.2"
		width="42"
		height="44"
		transform={shineTransform}
		style="mix-blend-mode: overlay;"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>

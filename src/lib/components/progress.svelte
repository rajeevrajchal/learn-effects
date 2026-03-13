<script lang="ts">
	let {
		value = $bindable(0)
	}: {
		value?: number;
	} = $props();

	const VIEWBOX_WIDTH = 580;
	const VIEWBOX_HEIGHT = 80;
	const CX_LEFT = 40;
	const CX_RIGHT = 540;
	const CY = 40;
</script>

<div class="wrapper">
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
				<circle cx={CX_LEFT} cy={CY} r="22" />
				<rect x={CX_LEFT} y="34" width="500" height="12" />
				<circle cx={CX_RIGHT} cy={CY} r="22" />
			</clipPath>
		</defs>

		<!-- Gray border layer -->
		<circle cx={CX_LEFT} cy={CY} r="34" fill="#4a4a4a" />
		<circle cx={CX_RIGHT} cy={CY} r="34" fill="#4a4a4a" />
		<rect x={CX_LEFT} y="25" width="500" height="30" fill="#4a4a4a" />

		<!-- Dark inner body -->
		<circle cx={CX_LEFT} cy={CY} r="28" fill="#2e2e2e" />
		<circle cx={CX_RIGHT} cy={CY} r="28" fill="#2e2e2e" />
		<rect x={CX_LEFT} y="31" width="500" height="18" fill="#2e2e2e" />

		<!-- Green fill clipped to INNER bone shape, width driven by value -->
		<rect
			x="0"
			y="0"
			width={(value / 100) * VIEWBOX_WIDTH}
			height={VIEWBOX_HEIGHT}
			fill="url(#pg-gradient)"
			clip-path="url(#pg-bone-inner)"
		/>
	</svg>
</div>

<style>
	.wrapper {
		background: #1a1a1a;
		padding: 48px;
		display: flex;
		flex-direction: column;
		gap: 44px;
		align-items: center;
	}

	.progress-svg {
		width: 560px;
		height: 77px;
	}
</style>

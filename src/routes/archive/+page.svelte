<script lang="ts">
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import { onDestroy, onMount } from 'svelte';

	const colors = ['#8DADFF', '#FFFFFF', '#1C5FDA'];
	const pane = useTweakpane();
	let folder: FolderApi | null = null;

	let derivedColors = $derived(colors);
	let derivedType = $derived('all');
	let fills = $derived({
		background: derivedColors[0 % derivedColors.length],
		midground: derivedColors[1 % derivedColors.length],
		foreground: derivedColors[2 % derivedColors.length]
	});
	let opacity = $derived(fills.background === '#000000' ? 0.3 : 0.5);
	let mixBlendMode = $derived(fills.background === '#000000' ? 'normal' : 'overlay');

	let config = $state<Record<string, { x: number; y: number; shine: number }>>({
		shine_bg: {
			x: 0,
			y: 0,
			shine: 0
		}
	});

	let parallax = $state({
		x: 0,
		y: 0,
		background: 1,
		midground: 2,
		foreground: 3,
		shine: 5
	});

	const setUpTweakpane = () => {
		folder = pane.addFolder({ title: 'Movement' });
		if (!folder) return;

		Object.entries(config).forEach(([key]) => {
			const itemFolder = folder?.addFolder({ title: key });
			if (!itemFolder) return;

			itemFolder.addBinding(config[key], 'x', {
				min: -20,
				max: 20,
				step: 0.5,
				label: 'Move X Axis'
			});

			itemFolder.addBinding(config[key], 'y', {
				min: -20,
				max: 20,
				step: 0.5,
				label: 'Move Y Axis'
			});

			itemFolder.addBinding(config[key], 'shine', {
				min: -1,
				max: 1,
				step: 0.01,
				label: 'Shine Orbit'
			});
		});

		const parallaxFolder = folder.addFolder({ title: 'parallax' });

		parallaxFolder.addBinding(parallax, 'x', {
			min: -20,
			max: 20,
			step: 0.5,
			label: 'Mouse X'
		});

		parallaxFolder.addBinding(parallax, 'y', {
			min: -20,
			max: 20,
			step: 0.5,
			label: 'Mouse Y'
		});

		parallaxFolder.addBinding(parallax, 'background', {
			min: 0,
			max: 10,
			step: 0.1,
			label: 'Background Depth'
		});

		parallaxFolder.addBinding(parallax, 'midground', {
			min: 0,
			max: 10,
			step: 0.1,
			label: 'Midground Depth'
		});

		parallaxFolder.addBinding(parallax, 'foreground', {
			min: 0,
			max: 10,
			step: 0.1,
			label: 'Foreground Depth'
		});

		parallaxFolder.addBinding(parallax, 'shine', {
			min: 0,
			max: 10,
			step: 0.1,
			label: 'Shine Depth'
		});
	};

	let shine = $derived(config.shine_bg);

	// shine slider rotates around badge center (20,20)
	// parallax mouse nudges it further with depth multiplier
	let shineTransform = $derived(
		`rotate(${shine.shine * 360 + parallax.x * parallax.shine * 36}, 20, 20) scale(1, -1) translate(0, -40)`
	);

	onMount(() => {
		setUpTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<div
	class="center"
	onmousemove={(e) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		parallax.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
		parallax.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
	}}
	onmouseleave={() => {
		parallax.x = 0;
		parallax.y = 0;
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class={['team-icon']}
		viewBox="0 0 40 40"
		transform="matrix(1,0,0,-1,0,0)"
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
			transform={`translate(${parallax.x * parallax.background}, ${parallax.y * parallax.background})`}
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
			transform={`translate(${parallax.x * parallax.midground}, ${parallax.y * parallax.midground})`}
		/>

		{#if derivedType === 'diamond'}
			<polygon
				fill={fills.foreground}
				transform={`translate(${parallax.x * parallax.foreground}, ${parallax.y * parallax.foreground})`}
				points="20 10.1 10.1 20 20 29.9 29.9 20 20 10.1"
			/>
		{:else if derivedType === 'circle'}
			<circle
				fill={fills.foreground}
				cx="20"
				cy="20"
				r="10"
				transform={`translate(${parallax.x * parallax.foreground}, ${parallax.y * parallax.foreground})`}
			/>
		{:else if derivedType === 'square'}
			<rect
				fill={fills.foreground}
				x="12"
				y="12"
				width="16"
				height="16"
				transform={`translate(${parallax.x * parallax.foreground}, ${parallax.y * parallax.foreground})`}
			/>
		{:else}
			<path
				fill={fills.foreground}
				transform={`translate(${parallax.x * parallax.foreground}, ${parallax.y * parallax.foreground})`}
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
</div>

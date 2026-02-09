<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	const layers = {
		glow: 0.3, // Far background - moves slow
		shadow: 0.5, // Mid background
		image: 1.0, // Main element - base speed
		shine: 1.5 // Foreground - moves fast
	};

	const maxTiltAngle = 15;

	let containerRef: HTMLElement | undefined = $state();

	let animationFrameId: number | undefined = undefined;
	let currentTilt = $state({ x: 0, y: 0 });
	let targetTilt = $state({ x: 0, y: 0 });

	const getLayerStyle = (depth: number, includeTranslate = true) => {
		const rotateX = currentTilt.x * depth;
		const rotateY = currentTilt.y * depth;

		const translateX = includeTranslate ? currentTilt.y * depth * 2 : 0;
		const translateY = includeTranslate ? -currentTilt.x * depth * 2 : 0;

		return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`;
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!containerRef) {
			return;
		}

		const rect = containerRef.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * maxTiltAngle;
		const rotateY = ((x - centerX) / centerX) * maxTiltAngle;
		targetTilt = { x: rotateX, y: rotateY };
	};

	const handleMouseLeave = () => {
		targetTilt = { x: 0, y: 0 };
	};

	const animate = () => {
		const easing = 0.08;
		currentTilt = {
			x: currentTilt.x + (targetTilt.x - currentTilt.x) * easing,
			y: currentTilt.y + (targetTilt.y - currentTilt.y) * easing
		};

		animationFrameId = requestAnimationFrame(animate);
	};

	onMount(() => {
		animate();
	});

	onDestroy(() => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<div class="center">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="card"
		bind:this={containerRef}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
	>
		<div class="parallax-container">
			<img
				src="./car-design.png"
				alt="Car design"
				class="layer main-image"
				style="transform: {getLayerStyle(layers.image)}"
			/>
		</div>
	</div>
</div>

<style>
	.card {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		height: 40rem;
		width: 40rem;
		padding-inline: 2rem;
		padding-block: 2rem;
	}

	.parallax-container {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	.layer {
		position: absolute;
		inset: 0;
		will-change: transform;
		pointer-events: none;
	}

	.main-image {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
		z-index: 1;
		pointer-events: auto;
		border-radius: 1rem;
		will-change: transform gpu;
	}
</style>

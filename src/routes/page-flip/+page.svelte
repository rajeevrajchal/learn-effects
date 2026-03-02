<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { useTweakpane, type FolderApi } from '$lib/tweakpane';
	import gsap from 'gsap';

	// --- Data (static, never changes) ---
	const pages = [
		{ label: 'Cover', color: '#e63946' },
		{ label: 'Preface', color: '#457b9d' },
		{ label: 'Chapter 1', color: '#2a9d8f' },
		{ label: 'Chapter 2', color: '#e9c46a' }
	];

	// --- Reactive state ---
	let currentPage = $state(0);
	let flipDuration = $state(0.6);
	let isAnimating = $state(false);

	// --- DOM refs via use: action ---
	let pageEls = $state<(HTMLElement | undefined)[]>([]);

	function setPageRef(node: HTMLElement, index: number) {
		pageEls[index] = node;
		return {
			destroy() {
				pageEls[index] = undefined;
			}
		};
	}

	// --- Tweakpane ---
	const pane = useTweakpane();
	let folder: FolderApi | null = null;
	const tweakpaneState = $state({ current: 'Cover', duration: 0.6 });

	function setupTweakpane() {
		folder = pane.addFolder({ title: 'Page Flip' });
		if (!folder) return;

		folder.addBinding(tweakpaneState, 'current', {
			readonly: true,
			label: 'Page'
		});

		folder
			.addBinding(tweakpaneState, 'duration', {
				min: 0.2,
				max: 2.0,
				step: 0.05,
				label: 'Duration (s)'
			})
			.on('change', (ev: { value: number }) => {
				flipDuration = ev.value;
			});
	}

	// --- Flip logic ---
	function flipNext() {
		if (isAnimating) return;

		if (currentPage < pages.length) {
			// Flip the currently visible top page away
			isAnimating = true;
			const el = pageEls[currentPage];
			if (!el) return;

			gsap.to(el, {
				rotateY: -90,
				duration: flipDuration,
				ease: 'power2.inOut',
				onComplete: () => {
					isAnimating = false;
				}
			});
			currentPage++;

			// Update tweakpane display
			tweakpaneState.current = pages[currentPage]?.label ?? 'All Flipped';
			pane.refresh();
		} else {
			// All flipped -- reset in reverse order with staggered delay
			isAnimating = true;

			for (let i = pages.length - 1; i >= 0; i--) {
				const el = pageEls[i];
				if (!el) continue;

				gsap.to(el, {
					rotateY: 0,
					duration: flipDuration,
					delay: (pages.length - 1 - i) * 0.1,
					ease: 'power2.inOut',
					onComplete:
						i === 0
							? () => {
									isAnimating = false;
								}
							: undefined
				});
			}
			currentPage = 0;

			// Update tweakpane display
			tweakpaneState.current = pages[0].label;
			pane.refresh();
		}
	}

	// --- Lifecycle ---
	onMount(() => {
		setupTweakpane();
	});

	onDestroy(() => {
		if (folder) {
			pane.removeFolder(folder);
		}
	});
</script>

<div class="center">
	<div
		class="book"
		role="button"
		tabindex="0"
		onclick={flipNext}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				flipNext();
			}
		}}
	>
		{#each pages as page, i (page.label)}
			<div
				class="page"
				use:setPageRef={i}
				style:background={page.color}
				style:z-index={pages.length - i}
			>
				<span class="page-label">{page.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.book {
		position: relative;
		width: 320px;
		height: 460px;
		perspective: 1200px;
		cursor: pointer;
	}

	.page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: left center;
		will-change: transform;
		backface-visibility: hidden;
		border-radius: 4px;
		box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
	}

	.page-label {
		font-size: 2rem;
		font-weight: bold;
		color: #fff;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
		user-select: none;
		pointer-events: none;
	}
</style>

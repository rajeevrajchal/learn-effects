<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createTweakpaneContext } from './context';
	import type { TweakpaneContext } from './types';

	interface Props {
		children: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		title?: string;
	}

	let { children, position = 'top-right', title = 'Controls' }: Props = $props();

	// Navigation routes
	const routes = [
		{ label: 'Home', path: '/' },
		{ label: 'Card', path: '/parallex-card' },
		{ label: 'Parallax', path: '/parallex' },
		{ label: 'Screw', path: '/screw' }
	];

	// Position styles mapping
	const positionStyles: Record<string, Record<string, string>> = {
		'top-right': { top: '1rem', right: '1rem' },
		'top-left': { top: '1rem', left: '1rem' },
		'bottom-right': { bottom: '1rem', right: '1rem' },
		'bottom-left': { bottom: '1rem', left: '1rem' }
	};

	// Create context synchronously during component initialization
	// This allows child components to access it via useTweakpane()
	const tweakpaneContext: TweakpaneContext = createTweakpaneContext();

	onMount(() => {
		// Configure the pane after mount (client-side only)
		const pane = tweakpaneContext.getPane();
		if (pane) {
			// Set the pane title
			if (title) {
				pane.title = title;
			}

			// Position the pane element
			const element = pane.element;
			if (element) {
				element.style.position = 'fixed';
				element.style.zIndex = '9999';

				const posStyle = positionStyles[position];
				Object.entries(posStyle).forEach(([key, value]) => {
					element.style.setProperty(key, value);
				});
			}

			// Add navigation folder
			const navFolder = pane.addFolder({ title: 'Navigation', expanded: true });

			// Add navigation buttons for each route
			routes.forEach((route) => {
				navFolder.addButton({ title: route.label }).on('click', () => {
					goto(route.path);
				});
			});

			// Add separator blade
			navFolder.addBlade({ view: 'separator' });
		}
	});

	onDestroy(() => {
		if (browser) {
			tweakpaneContext.dispose();
		}
	});
</script>

{@render children()}

<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { createTweakpaneContext } from './context';
	import type { TweakpaneContext } from './types';

	interface Props {
		children: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		title?: string;
	}

	let { children, position = 'top-right', title = 'Controls' }: Props = $props();

	let tweakpaneContext: TweakpaneContext | undefined = $state();
	let mounted = $state(false);

	// Position styles mapping
	const positionStyles: Record<string, Record<string, string>> = {
		'top-right': { top: '1rem', right: '1rem' },
		'top-left': { top: '1rem', left: '1rem' },
		'bottom-right': { bottom: '1rem', right: '1rem' },
		'bottom-left': { bottom: '1rem', left: '1rem' }
	};

	onMount(() => {
		// Create context without container - Tweakpane will create its own
		tweakpaneContext = createTweakpaneContext();

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
		}

		mounted = true;
	});

	onDestroy(() => {
		if (tweakpaneContext) {
			tweakpaneContext.dispose();
		}
	});
</script>

{#if mounted}
	{@render children()}
{/if}

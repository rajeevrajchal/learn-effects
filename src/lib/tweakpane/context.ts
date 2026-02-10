import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import { Pane, type FolderApi, type ButtonApi } from 'tweakpane';
import type { TweakpaneContext, FolderOptions, BindingOptions, ButtonOptions } from './types';

const TWEAKPANE_KEY = Symbol('tweakpane');

/**
 * Creates and sets the Tweakpane context
 * Should only be called from TweakpaneProvider during component initialization
 * The Pane is created lazily when first accessed (client-side only)
 */
export function createTweakpaneContext(): TweakpaneContext {
	let pane: Pane | null = null;

	const ensurePane = (): Pane | null => {
		if (!browser) return null;
		if (!pane) {
			pane = new Pane();
		}
		return pane;
	};

	const context: TweakpaneContext = {
		getPane: () => ensurePane(),

		addFolder: (options: FolderOptions): FolderApi | null => {
			const p = ensurePane();
			if (!p) return null;
			return p.addFolder({
				title: options.title,
				expanded: options.expanded ?? true
			});
		},

		removeFolder: (folder: FolderApi): void => {
			if (folder) {
				folder.dispose();
			}
		},

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		addBinding: (object: any, key: string, options?: BindingOptions): any => {
			const p = ensurePane();
			if (!p) return null;
			return p.addBinding(object, key, {
				min: options?.min,
				max: options?.max,
				step: options?.step,
				label: options?.label,
				readonly: options?.readonly
			});
		},

		addButton: (options: ButtonOptions): ButtonApi | null => {
			const p = ensurePane();
			if (!p) return null;
			return p.addButton({
				title: options.title,
				label: options.label
			});
		},

		refresh: (): void => {
			pane?.refresh();
		},

		dispose: (): void => {
			pane?.dispose();
			pane = null;
		}
	};

	setContext(TWEAKPANE_KEY, context);
	return context;
}

/**
 * Gets the Tweakpane context from the nearest provider
 * Must be called during component initialization
 */
export function useTweakpane(): TweakpaneContext {
	const context = getContext<TweakpaneContext>(TWEAKPANE_KEY);
	if (!context) {
		throw new Error('useTweakpane must be used within a TweakpaneProvider');
	}
	return context;
}

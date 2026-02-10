import { getContext, setContext } from 'svelte';
import { Pane, type FolderApi, type ButtonApi } from 'tweakpane';
import type { TweakpaneContext, FolderOptions, BindingOptions, ButtonOptions } from './types';

const TWEAKPANE_KEY = Symbol('tweakpane');

/**
 * Creates and sets the Tweakpane context
 * Should only be called from TweakpaneProvider
 * @param container - Optional container element. If not provided, Tweakpane creates its own.
 */
export function createTweakpaneContext(container?: HTMLElement): TweakpaneContext {
	const pane = container ? new Pane({ container }) : new Pane();

	const context: TweakpaneContext = {
		getPane: () => pane,

		addFolder: (options: FolderOptions): FolderApi | null => {
			if (!pane) return null;
			return pane.addFolder({
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
			if (!pane) return null;
			return pane.addBinding(object, key, {
				min: options?.min,
				max: options?.max,
				step: options?.step,
				label: options?.label,
				readonly: options?.readonly
			});
		},

		addButton: (options: ButtonOptions): ButtonApi | null => {
			if (!pane) return null;
			return pane.addButton({
				title: options.title,
				label: options.label
			});
		},

		refresh: (): void => {
			pane?.refresh();
		},

		dispose: (): void => {
			pane?.dispose();
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

import type { Pane, FolderApi, InputBindingApi, ButtonApi } from 'tweakpane';

/**
 * Options for creating a folder in Tweakpane
 */
export interface FolderOptions {
	title: string;
	expanded?: boolean;
}

/**
 * Options for binding a value to Tweakpane
 */
export interface BindingOptions {
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	readonly?: boolean;
	options?: Record<string, string | number>;
}

/**
 * Options for creating a button in Tweakpane
 */
export interface ButtonOptions {
	title: string;
	label?: string;
}

/**
 * Context interface for Tweakpane
 * Provides methods to interact with the Tweakpane instance
 */
export interface TweakpaneContext {
	/**
	 * Get the raw Pane instance for advanced usage
	 */
	getPane: () => Pane | null;

	/**
	 * Add a folder to organize controls
	 * @param options - Folder configuration
	 * @returns The created FolderApi instance
	 */
	addFolder: (options: FolderOptions) => FolderApi | null;

	/**
	 * Remove a folder from the pane
	 * @param folder - The folder to remove
	 */
	removeFolder: (folder: FolderApi) => void;

	/**
	 * Add a binding directly to the root pane
	 * @param object - The object containing the property
	 * @param key - The property key to bind
	 * @param options - Binding options
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addBinding: (object: Record<string, any>, key: string, options?: BindingOptions) => any;

	/**
	 * Add a button to the root pane
	 * @param options - Button configuration
	 */
	addButton: (options: ButtonOptions) => ButtonApi | null;

	/**
	 * Refresh the pane to reflect external changes
	 */
	refresh: () => void;

	/**
	 * Dispose of the pane and clean up
	 */
	dispose: () => void;
}

export type { Pane, FolderApi, InputBindingApi, ButtonApi };

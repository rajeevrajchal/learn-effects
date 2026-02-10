// Tweakpane SvelteKit Integration
// Usage:
// 1. Wrap your app with TweakpaneProvider in +layout.svelte
// 2. Use useTweakpane() in any page to add controls

export { default as TweakpaneProvider } from './tweakpane_provider.svelte';
export { useTweakpane, createTweakpaneContext } from './context';
export type {
	TweakpaneContext,
	FolderOptions,
	BindingOptions,
	ButtonOptions,
	Pane,
	FolderApi,
	InputBindingApi,
	ButtonApi
} from './types';

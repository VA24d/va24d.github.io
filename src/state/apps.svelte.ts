import type { apps_config } from '🍎/configs/apps/apps-config';

export type AppID = keyof typeof apps_config;

export const apps = $state({
	open: {
		files: false,
		music: false,
		settings: false,
		terminal: false,
		welcome: false,
		blog: false,
		aboutMac: true,
		user: true,
	} as Record<AppID, boolean>,

	active: 'files' satisfies AppID,

	/**
	 * Maximum zIndex for the active app
	 * Initialize with -2, so that it becomes 0 when initialised
	 */
	active_z_index: -2,

	z_indices: {
		files: 0,
		music: 0,
		settings: 0,
		terminal: 0,
		welcome: 0,
		blog: 0,
	} as Record<AppID, number>,

	is_being_dragged: false as boolean,

	fullscreen: {
		files: false,
		music: false,
		settings: false,
		terminal: false,
		welcome: false,
		blog: false,
	} as Record<AppID, boolean>,
});

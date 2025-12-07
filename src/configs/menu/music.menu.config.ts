import { create_menu_config } from '🍎/helpers/create-menu-config';

export const music_menu_config = create_menu_config({
	default: {
		title: 'Music',
		menu: {
			'about-music': {
				title: 'About Music',
				breakAfter: true,
			},
			preferences: {
				title: 'Settings...',
				breakAfter: true,
			},
			quit: {
				title: 'Quit Music',
			},
		},
	},
	file: {
		title: 'File',
		menu: {
			new: {
				title: 'New',
			},
			open: {
				title: 'Open...',
			},
		},
	},
	edit: {
		title: 'Edit',
		menu: {
			undo: {
				title: 'Undo',
			},
			redo: {
				title: 'Redo',
			},
		},
	},
	song: {
		title: 'Song',
		menu: {},
	},
	view: {
		title: 'View',
		menu: {},
	},
	controls: {
		title: 'Controls',
		menu: {},
	},
	account: {
		title: 'Account',
		menu: {},
	},
	window: {
		title: 'Window',
		menu: {},
	},
	help: {
		title: 'Help',
		menu: {},
	},
});

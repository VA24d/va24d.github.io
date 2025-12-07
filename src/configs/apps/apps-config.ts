import { create_app_config } from '🍎/helpers/create-app-config.ts';

const aboutMac = create_app_config({
	title: 'About This Mac',
	resizable: false,
	height: 300,
	width: 550,
    should_open_window: true,
    dock: false,
});

const files = create_app_config({
	title: 'Files',
	resizable: true,
	should_open_window: true,
});

const music = create_app_config({
	title: 'Music',
	resizable: true,
	height: 600,
	width: 900,
});

const settings = create_app_config({
	title: 'Settings',
	resizable: false,
	height: 400,
	width: 600,
});

const terminal = create_app_config({
	title: 'Terminal',
	resizable: true,
});

export const apps_config = {
	finder: create_app_config({
		title: 'Finder',
		resizable: true,
		should_open_window: true,
		dock: true,
	}),
	mail: create_app_config({
		title: 'Mail',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	safari: create_app_config({
		title: 'Safari',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	reminders: create_app_config({
		title: 'Reminders',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	notes: create_app_config({
		title: 'Notes',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	music,
	firefox: create_app_config({
		title: 'Firefox',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	vscode: create_app_config({
		title: 'VS Code',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	arc: create_app_config({
		title: 'Arc',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	chrome: create_app_config({
		title: 'Google Chrome',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	spark: create_app_config({
		title: 'Spark',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	word: create_app_config({
		title: 'Microsoft Word',
		resizable: true,
		dock: true,
		should_open_window: true,
	}),
	trash: create_app_config({
		title: 'Trash',
		resizable: false,
		dock: true,
		dock_breaks_before: true,
	}),
	// Hidden/System Apps
	aboutMac,
	settings,
	terminal,
	files, // Keeping original files app just in case, but finder is the main one now
	welcome: create_app_config({
		title: 'Welcome',
		resizable: false,
		height: 400,
		width: 600,
		dock: false,
		should_open_window: true,
	}),
	blog: create_app_config({
		title: 'Blog',
		resizable: true,
		height: 600,
		width: 800,
		dock: false, // Hidden from dock based on screenshot
		should_open_window: true,
	}),
	user: create_app_config({
		title: 'User Profile',
		resizable: false,
		height: 400,
		width: 600,
		dock: false, // Hidden from dock based on screenshot
		should_open_window: true,
	}),
};

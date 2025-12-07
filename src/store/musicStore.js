import { writable } from 'svelte/store';

export const audioPlayer = writable({
    isPlaying: false,
    currentTrack: null, // object with url, title, artist
    volume: 0.5
});

export const adminState = writable({
    isAuthenticated: false,
    user: null
});
;
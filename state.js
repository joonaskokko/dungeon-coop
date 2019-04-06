const emitter = require("events");

const state = {
	running: false,
	keysDown: new Set(),
	objects: new Set(),
	events: emitter
}

export default state;
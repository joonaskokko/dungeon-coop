const state = {
	running: null,
	player: null,
	mapsize: null,
	canvas: null,
	context: null,
	keysDown: new Set(),
	mousePosition: {
		x:0,
		y:0
	},
	objects: new Set()
}

export default state;
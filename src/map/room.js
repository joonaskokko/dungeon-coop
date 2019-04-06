import Thing from "./thing.js";
import state from "./state.js";

export default class Room extends Thing { // TODO: Remove extending.
	constructor({ width, height, level, doors }) {
		super();
		
		if (typeof width === 'undefined' || typeof height === 'undefined') {
			width = 10;
			height = 8;
		}
		
		this.width = width;
		this.height = height;
		this.floor = [];
		
		if (typeof doors === 'undefined') {
			doors = {
				1: false,
				2: false,
				3: false,
				4: false
			};
		}
		
		this.doors = doors;
		
		this.objects = new Set();
		this.level = level;
		this.theme = null;
		
		this.generateFloor();
	}
	
	generateFloor() {
		if (this.width && this.height) {
			for (let y = 0; y < this.height; y++) {
				for (let x = 0; x < this.width; x++) {
					this.floor[y][x] = null;
				}
			}
		}
	}
	
	randomizeFloor() {
		
	}
	
	render() {
		// TODO: Remove.
		state.context.fillStyle = "black";
		state.context.fillRect(0, 0, state.canvas.width, state.canvas.height);
		
		state.context.fillStyle = "grey";
		state.context.fillRect(0, 200, 1000, 800);
		
		state.context.fillStyle = "lightgrey";
		state.context.fillRect(100, 300, 800, 600);
	}
}
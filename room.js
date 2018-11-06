import Thing from "./thing.js";
import state from "./state.js";

export default class Room extends Thing {
	constructor() {
		super();
		this.floor = {
			
		};
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
import state from "./state.js";
import Thing from "./thing.js";

export default class Obstacle extends Thing {	
	collide() {
		while (((state.player.x > this.x || state.player.x + state.player.size > this.x) && state.player.x < this.x + this.width)
			&& ((state.player.y > this.y || state.player.y + state.player.size > this.y) && state.player.y < this.y + this.height)) {
				console.log("COLLISION");
			
			if (state.player.oldx < state.player.x) {
				state.player.x = state.player.oldx;
				console.log("Left bump.");
			}
			else if (state.player.oldx > state.player.x) {
				state.player.x = state.player.oldx;
				console.log("Right bump.");
			}
			else if (state.player.oldy < state.player.y) {
				state.player.y = state.player.oldy;
				console.log("Up bump.");
			}
			else if (state.player.oldy > state.player.y) {
				state.player.y = state.player.oldy;
				console.log("Down bump.");
			}
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.renderx, this.rendery, this.width, this.height);
	
		state.context.fillStyle = "black";
		state.context.font = "20px Helvetica";
		state.context.fillText("x: " + this.renderx + " y: " + this.rendery, this.renderx, this.rendery);
	}
}
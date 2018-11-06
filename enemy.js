import state from "./state.js";
import Creature from "./creature.js";

export default class Enemy extends Creature {
	constructor({ x, y }) {
		super({ x: x, y: y });
	}

	move() {
		if (this.idle > 0) {
			if (this.direction == "left") {
				this.location.targetx -= this.speed;
			}
			else if (this.direction == "right") {
				this.location.targetx += this.speed;
			}
			else if (this.direction == "up") {
				this.location.targety -= this.speed;
			}
			else if (this.direction == "down") {
				this.location.targety += this.speed;
			}
		}
		else {
			let directions = [ "left", "right", "up", "down"];
			let direction = directions[Math.floor(Math.random() * 3)];
			
			this.direction = direction;
		}
	}
}
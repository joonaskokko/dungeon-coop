import state from "./state.js";
import Creature from "./creature.js";
import Thing from "./thing.js";

export default class Item extends Thing {
	construct({ name, cost }) {
		this.name = name;
		this.cost = cost;
	}
	
	pickup() {
		if (!this.owner) {
			throw new Error("Invalid owner.");
		}
		
		this.location = { x: null, y: null };
	}
	
	drop() {
		this.location = this.owner.location;
		this.owner = null;
	}
	
	render() {
		if (this.owner === 'null' && this.owner.location.x && this.owner.location.y) {
			state.context.fillStyle = this.color;
			state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
		}
	}
}
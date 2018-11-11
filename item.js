import state from "./state.js";
import Creature from "./creature.js";
import Thing from "./thing.js";

export default class Item extends Thing {
	construct({ name, cost }) {
		this.name = name;
		this.cost = cost;
	}
	
	pickup() {
		this.location.current = { x: null, y: null };
	}
	
	drop() {
		this.location = this.owner.location;
		this.owner = null;
	}
	
	render() {
		if (this.owner === 'null' && this.location.current.x && this.location.current.y) {
			state.context.fillStyle = this.color;
			state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
		}
	}
}
import state from "./state.js";
import Thing from "./thing.js";

export default class Effecter extends Thing {
	constructor({ damage, duration, size, x, y }) {
		super();
		this.location.x = x;
		this.location.y = y;
		this.damage = damage;
		this.duration = duration;
		this.size = size;
		this.color = "red";
	}
	
	update() {
		if (this.duration == 0) {
			this.destroy();
		}
		else {
			this.duration -= 1;
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
	}
}
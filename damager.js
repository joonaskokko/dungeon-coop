import state from "./state.js";
import Thing from "./thing.js";

export default class Damager extends Thing {
	constructor({ damage, duration, size, x, y, owner }) {
		super();
		this.location.current = { x, y };
		this.damage = damage;
		this.duration = duration;
		this.size = size;
		this.color = "red";
		this.owner = owner;
	}
	
	update() {
		super.update();
		if (this.duration !== null) {
			if (this.duration == 0) {
				this.destroy();
			}
			else {
				this.duration -= 1;
			}
		}
	}
	
	render() {
		super.render();
	}
	
	clean() {
		if (this.status == false) {
			state.objects.projectiles.delete(this);
		}
	}
}
import state from "./state.js";
import Proposition from "./proposition.js";

export default class MovementProposition extends Proposition {
	constructor({ direction, object }) {
		super({ object });
		this.direction = direction;
		this.location = { x: object.location.x, y: object.location.y };
		
		if (this.direction == "left") {
			this.location.x = this.object.location.x - this.object.speed.current;
		}
		else if (this.direction == "right") {
			this.location.x = this.object.location.x + this.object.speed.current;
		}
		else if (this.direction == "up") {
			this.location.y = this.object.location.y - this.object.speed.current;
		}
		else if (this.direction == "down") {
			this.location.y = this.object.location.y + this.object.speed.current;
		}
	}
	
	validate() {
		super.validate();
		
		if (!this.object.speed.current) {
			this.accepted = false;
			return;
		}
		
		if (!this.direction) {
			this.accepted = false;
			return;
		}
		
		if (this.object.effects.immobilized > 0) {
			this.accepted = false;
			return;
		}
		
		for (let obstacle of state.objects.creatures) {
			if (obstacle === this.object) {
				continue;
			}
			
			if ((Math.abs(this.location.x - obstacle.location.x) * 2 < (this.object.size + obstacle.size)) && (Math.abs(this.location.y - obstacle.location.y) * 2 < (this.object.size + obstacle.size))) {
				this.accepted = false;
			}
		}
		
		// FIXME
		if (this.object.location.x > 1000 || this.object.location.y > 1000 || this.object.location.x < 0 || this.object.location.y < 0) {
			this.object.destroy();
		}
	}
	
	apply() {
		super.apply();
		
		if (this.location.x !== null) {
			this.object.location.x = this.location.x;
		}
		
		if (this.location.y !== null) {
			this.object.location.y = this.location.y;
		}
		
		this.object.direction = this.direction;
	}
}
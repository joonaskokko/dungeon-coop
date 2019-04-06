import state from "./state.js";
import Damager from "./damager.js";
import MovementProposition from "./movementproposition.js";

export default class Projectile extends Damager {
	constructor({ x, y, direction, speed, size, owner, duration, damage }) {
		super({ damage, duration, size, x, y });
		this.direction = direction;
		this.speed.current = speed;
	}
	
	move() {
		this.propositions.movement.add(new MovementProposition({ direction: this.direction, object: this }));
	}
}
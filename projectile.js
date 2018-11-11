import state from "./state.js";
import Damager from "./damager.js";

export default class Projectile extends Damager {
	constructor({ x, y, direction, speed, size, owner, duration, damage }) {
		super({ damage, duration, size, x, y });
		this.direction.current = direction;
		this.speed = speed;
	}
	
	move() {
		if (this.direction.current == "left") {
			this.location.target.x = this.location.current.x - this.speed;
		}
		else if (this.direction.current == "right") {
			this.location.target.x = this.location.current.x + this.speed;
		}
		else if (this.direction.current == "up") {
			this.location.target.y = this.location.current.y - this.speed;
		}
		else if (this.direction.current == "down") {
			this.location.target.y = this.location.current.y + this.speed;
		}
	}
}
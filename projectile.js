import state from "./state.js";
import Thing from "./thing.js";

export default class Projectile extends Thing {
	constructor({ startx, starty, direction, speed, size, owner }) {
		super();
		
		this.location.x = startx;
		this.location.y = starty;
		
		this.size = size;
		this.direction.current = direction;
		this.speed.current = speed;
		this.color = "red";
		this.owner = owner;
	}
	
	move() {
		if (this.direction.current == "left") {
			this.location.targetx = this.location.x - this.speed.current;
		}
		else if (this.direction.current == "right") {
			this.location.targetx = this.location.x + this.speed.current;
		}
		else if (this.direction.current == "up") {
			this.location.targety = this.location.y - this.speed.current;
		}
		else if (this.direction.current == "down") {
			this.location.targety = this.location.y + this.speed.current;
		}
	}
	
	update() {
		super.update();
		
		// FIXME
		if (this.location.x > 1000 || this.location.y > 1000 || this.location.x < 0 || this.location.y < 0) {
			this.destroy();
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
	}
}
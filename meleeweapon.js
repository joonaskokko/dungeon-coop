import state from "./state.js";
import Weapon from "./weapon.js";
import Effecter from "./effecter.js";

export default class MeleeWeapon extends Weapon {
	constructor({ name, cost, damage, speed, size, owner }) {
		super({ name, cost });
		this.damage = damage;
		this.speed = speed;
		this.size = size;
	}
	
	attack() {
		console.log("melee attack");
		let spawnCoordinates = {
			x: null,
			y: null
		};
	
		if (this.owner.direction.current == "left") {
			spawnCoordinates.x = this.owner.location.x - this.size;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.size / 2;
		}
		else if (this.owner.direction.current == "right") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.size / 2;
		}
		else if (this.owner.direction.current == "up") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.size / 2;
			spawnCoordinates.y = this.owner.location.y - this.size;
		}
		else if (this.owner.direction.current == "down") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.size / 2;
			spawnCoordinates.y = this.owner.location.y + this.owner.size;
		}

		state.objects.projectiles.add(new Effecter({damage: this.damage, size: this.size, duration: 10, x: spawnCoordinates.x, y: spawnCoordinates.y }));
	}
}
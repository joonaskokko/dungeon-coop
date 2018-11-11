import state from "./state.js";
import Weapon from "./weapon.js";
import Damager from "./damager.js";

export default class MeleeWeapon extends Weapon {
	constructor({ name, cost, damage, speed, size, owner, cooldown }) {
		super({ name, cost, damage, cooldown, speed });
		
		this.size = size;
		this.owner = owner;
	}
	
	attack() {
		super.attack();

		this.owner.effects.freezeMeleeAttack = this.cooldown;
		
		let spawnCoordinates = {
			x: null,
			y: null
		};
	
		if (this.owner.direction.current == "left") {
			spawnCoordinates.x = this.owner.location.current.x - this.size;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size / 2 - this.size / 2;
		}
		else if (this.owner.direction.current == "right") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size / 2 - this.size / 2;
		}
		else if (this.owner.direction.current == "up") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size / 2 - this.size / 2;
			spawnCoordinates.y = this.owner.location.current.y - this.size;
		}
		else if (this.owner.direction.current == "down") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size / 2 - this.size / 2;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size;
		}

		state.objects.projectiles.add(new Damager({damage: this.damage, size: this.size, duration: this.speed, x: spawnCoordinates.x, y: spawnCoordinates.y, owner: this.owner }));
	}
}
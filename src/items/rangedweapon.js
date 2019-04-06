import state from "./state.js";
import Weapon from "./weapon.js";
import Projectile from "./projectile.js";

export default class RangedWeapon extends Weapon {
	constructor({ name, cost, damage, cooldown, projectileSize, projectileSpeed, speed }) {
		super({ name, cost, damage, cooldown, speed });
		this.projectileSize = projectileSize;
		this.projectileSpeed = projectileSpeed;
	}
	
	attack() {
		super.attack();
		this.owner.effects.freezeRangedAttack = this.cooldown;
		
		let spawnCoordinates = {
			x: null,
			y: null
		};
	
		if (this.owner.direction == "left") {
			spawnCoordinates.x = this.owner.location.x - this.projectileSize;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction == "right") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction == "up") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.y - this.projectileSize;
		}
		else if (this.owner.direction == "down") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.y + this.owner.size;
		}

		state.objects.projectiles.add(new Projectile({ x: spawnCoordinates.x, y: spawnCoordinates.y, direction: this.owner.direction, duration: null, speed: this.projectileSpeed, size: this.projectileSize, owner: this }));
	}
}
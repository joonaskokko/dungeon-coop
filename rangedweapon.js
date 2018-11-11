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
	
		if (this.owner.direction.current == "left") {
			spawnCoordinates.x = this.owner.location.current.x - this.projectileSize;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction.current == "right") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction.current == "up") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.current.y - this.projectileSize;
		}
		else if (this.owner.direction.current == "down") {
			spawnCoordinates.x = this.owner.location.current.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.current.y + this.owner.size;
		}

		state.objects.projectiles.add(new Projectile({ x: spawnCoordinates.x, y: spawnCoordinates.y, direction: this.owner.direction.current, duration: null, speed: this.projectileSpeed, size: this.projectileSize, owner: this }));
	}
	
	render() {
		
	}
}
import state from "./state.js";
import Weapon from "./weapon.js";
import Projectile from "./projectile.js";

export default class RangedWeapon extends Weapon {
	constructor({ name, cost, damage, speed, projectileSize, projectileSpeed }) {
		super({ name, cost, damage, speed });
		this.damage = damage;
		this.speed = speed;
		this.projectileSize = projectileSize;
		this.projectileSpeed = projectileSpeed;
	}
	
	attack() {
		let spawnCoordinates = {
			x: null,
			y: null
		};
	
		if (this.owner.direction.current == "left") {
			spawnCoordinates.x = this.owner.location.x - this.projectileSize;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction.current == "right") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size;
			spawnCoordinates.y = this.owner.location.y + this.owner.size / 2 - this.projectileSize / 2;
		}
		else if (this.owner.direction.current == "up") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.y - this.projectileSize;
		}
		else if (this.owner.direction.current == "down") {
			spawnCoordinates.x = this.owner.location.x + this.owner.size / 2 - this.projectileSize / 2;
			spawnCoordinates.y = this.owner.location.y + this.owner.size;
		}

		state.objects.projectiles.add(new Projectile({ startx: spawnCoordinates.x, starty: spawnCoordinates.y, direction: this.owner.direction.current, speed: this.projectileSpeed, size: this.projectileSize, owner: this }));
	}
	
	render() {
		
	}
}
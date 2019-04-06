import state from "./state.js";
import Item from "./item.js";

export default class Weapon extends Item {
	constructor({ name, cost, damage, cooldown, speed }) {
		super({ name, cost });
		this.damage = damage;
		this.speed = speed;
		this.cooldown = cooldown;
	}
	
	attack() {
		this.owner.effects.immobilized = this.speed;
	}
}
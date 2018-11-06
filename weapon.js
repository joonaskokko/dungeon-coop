import state from "./state.js";
import Item from "./item.js";

export default class Weapon extends Item {
	constructor({ name, cost, damage, speed }) {
		super({ name: name, cost: cost });
		this.damage = damage;
		this.speed = speed;
	}
}
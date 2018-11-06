import state from "./state.js";
import Creature from "./creature.js";

export default class Item {
	construct({ name, cost }) {
		this.name = name;
		this.cost = cost;
		this._owner = null;
	}
	
	get owner() {
		return this._owner;
	}
	
	set owner(owner) {
		if (owner instanceof Creature === false) {
			throw "Invalid owner.";
		}
		
		this._owner = owner;
	}
}
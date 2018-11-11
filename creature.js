import state from "./state.js";
import Thing from "./thing.js";

export default class Creature extends Thing {
	constructor({ x, y }) {
		super();
		
		this.size = 50;
		this.color = "green";
		
		this.location.current = { x, y };
		this.direction.current = "up";
		
		this.health = {
			current: 1,
			max: 1
		};
		
		this.speed = {
			current: 5,
			min: 1,
			max: 10
		};
		
		this.weaponSlots = {
			1: {
				item: null,
				cooldown: 0
			},
			2: {
				item: null,
				cooldown: 0
			}
		};
	}
	
	/*
	get inventory() { return this.inventory; }
	
	set equipWeapon(weaponSlotNumber, item) { this.weaponSlots[weaponSlotNumber].item = item; }
	get weaponSlots() { return this.weaponSlots; }
	
	set freezeAttack(time) { this.effects.freezeAttack = time; }
	get freezeAttack() { return this.effects.freezeAttack; }
	
	set freezeMovement(time) { this.effects.freezeMovement = time; }
	get freezeMovement() { return this.effects.freezeMovement; }
	
	set invicibility(time) { this.effects.invicibility = time; }
	get invicibility() { return this.effects.invicibility; }
	*/
	
	addItem({ item, weaponSlotNumber }) {
		item.owner = this;
		this.inventory.add(item);
		item.pickup();
		
		if (weaponSlotNumber) {
			this.weaponSlots[weaponSlotNumber].item = item;
		}
	}
	
	clean() {
		if (this.status === false) {
			state.objects.creatures.delete(this);
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.current.x, this.location.current.y, this.size, this.size);
	}
}
import state from "./state.js";
import Thing from "./thing.js";

export default class Creature extends Thing {
	constructor({ x, y }) {
		super();
		
		this.size = 50;
		this.color = "green";
		
		this.location = { x, y };
		this.direction = "up";
		
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
			1: null,
			2: null,
		};
	}
	
	addItem({ item, weaponSlotNumber }) {
		item.owner = this;
		this.inventory.add(item);
		item.pickup();
		
		if (weaponSlotNumber) {
			this.equip({ item, weaponSlotNumber });
		}
	}
	
	dropItem({}) {
		// TODO: Remove from inventory and call item.drop().
	}
	
	equip({ item, weaponSlotNumber }) {
		if (this.weaponSlots[weaponSlotNumber] == null) {
			this.weaponSlots[weaponSlotNumber] = item;
		}
	}
	
	unequip({ weaponSlotNumber }) {
		this.weaponSlots[weaponSlotNumber] = null;
	}
	
	clean() {
		super.clean();
		
		if (this.status === false) {
			state.objects.creatures.delete(this);
		}
	}	
}
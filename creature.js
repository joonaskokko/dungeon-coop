import state from "./state.js";
import Thing from "./thing.js";

export default class Creature extends Thing {
	constructor({ x, y }) {
		super();
		
		this.size = 50;
		this.color = "green";
		this.location = {
			x: x,
			y: y,
			targetx: null,
			targety: null,
			previousx: null,
			previousy: null
		};
		
		this.direction = {
			current: "up",
			target: null
		};
		
		this.status = "alive";
		
		this.health = {
			current: 1,
			max: 1
		};
		
		this.speed = {
			current: 1,
			min: 1,
			max: 1
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
		
		this.inventory = new Set();
	}
	
	addItem({ item, weaponSlotNumber }) {
		item.owner = this;
		this.inventory.add(item);
		
		this.weaponSlots[weaponSlotNumber].item = item;
	}
	
	update() {
		super.update();
		
		for (const weaponSlot of Object.values(this.weaponSlots)) {
			if (weaponSlot.cooldown > 0) {
				weaponSlot.cooldown -= 1;
			}
		}
	}
	
	clean() {
		if (this.status == false) {
			state.objects.creatures.delete(this);
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
	}
}
import state from "./state.js";
import Projectile from "./projectile.js";
import Creature from "./creature.js";

export default class Player extends Creature {
	constructor({ x, y, bindings, color }) {
		super({ x, y });
		this.speed = {
			current: 5,
			min: 1,
			max: 10
		};
		
		this.color = color;
		
		this.bindings = bindings;
	}
	
	move() {
		if (state.keysDown.has(this.bindings.leftkey)) {
			this.direction.target = "left";
			this.location.targetx = this.location.x - this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.rightkey)) {
			this.direction.target = "right";
			this.location.targetx = this.location.x + this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.upkey)) {
			this.direction.target = "up";
			this.location.targety = this.location.y - this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.downkey)) {
			this.direction.target = "down";
			this.location.targety = this.location.y + this.speed.current;
		}
	}
	
	attack() {
		for (const [ slotNumber, weaponSlot ] of Object.entries(this.weaponSlots)) {
			if ((slotNumber == 1 && state.keysDown.has(this.bindings.attack1key)) || (slotNumber == 2 && state.keysDown.has(this.bindings.attack2key))) {
				if (weaponSlot.item && weaponSlot.cooldown == 0 && this.freeze.attack == 0) {
					weaponSlot.item.attack();
					weaponSlot.cooldown = weaponSlot.item.speed;
					
					this.freeze.movement = 10;
					this.freeze.attack = 10;
				}
			}
		}
	}
}

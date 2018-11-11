import state from "./state.js";
import Projectile from "./projectile.js";
import Creature from "./creature.js";

export default class Player extends Creature {
	constructor({ x, y, bindings, color }) {
		super({ x, y });
		
		this.color = color;
		
		this.bindings = bindings;
		
		state.objects.players.add(this);
	}
	
	move() {
		if (state.keysDown.has(this.bindings.leftkey)) {
			this.direction.target = "left";
			this.location.target.x = this.location.current.x - this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.rightkey)) {
			this.direction.target = "right";
			this.location.target.x = this.location.current.x + this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.upkey)) {
			this.direction.target = "up";
			this.location.target.y = this.location.current.y - this.speed.current;
		}
		else if (state.keysDown.has(this.bindings.downkey)) {
			this.direction.target = "down";
			this.location.target.y = this.location.current.y + this.speed.current;
		}
	}
	
	clean() {
		super.clean();
		if (this.status === false) {
			state.objects.players.delete(this);
		}
	}
	
	attack() {
		for (const [ slotNumber, weaponSlot ] of Object.entries(this.weaponSlots)) {
			if (weaponSlot.item) {
				if (slotNumber == 1 && state.keysDown.has(this.bindings.attack1key) && this.effects.freezeMeleeAttack == 0) {
					weaponSlot.item.attack();
					state.keysDown.delete(this.bindings.attack1key);
				}
				else if (slotNumber == 2 && state.keysDown.has(this.bindings.attack2key) && this.effects.freezeRangedAttack == 0) {
					weaponSlot.item.attack();
					state.keysDown.delete(this.bindings.attack2key);
				}
			}
		}
	}
}

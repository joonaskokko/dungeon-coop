import state from "./../../state.js";
import assets from "./../../assets/assets.js";
import Projectile from "./../effects/projectile.js";
import Creature from "./creature.js";

export default class Player extends Creature {
	constructor({ x, y, bindings, color }) {
		super({ x, y });
		this.color = color;
		
		this.bindings = bindings;
		state.objects.players.add(this);
	}
	
	move() {
		// TODO: Maybe add movement commands to Thing?
		let direction = null;
		
		if (state.keysDown.has(this.bindings.leftkey)) {
			direction = "left";
		}
		else if (state.keysDown.has(this.bindings.rightkey)) {
			direction = "right";
		}
		else if (state.keysDown.has(this.bindings.upkey)) {
			direction = "up";
		}
		else if (state.keysDown.has(this.bindings.downkey)) {
			direction = "down";
		}
		
		if (direction) {
			this.propositions.movement.add(new MovementProposition({ direction, object: this }));
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
			if ((slotNumber == 1 && state.keysDown.has(this.bindings.attack1key) || (slotNumber == 2 && state.keysDown.has(this.bindings.attack2key)))) {
				this.propositions.attack.add(new AttackProposition({ direction: this.direction, weaponSlot, object: this }));
				state.keysDown.delete(this.bindings.attack1key);
				state.keysDown.delete(this.bindings.attack2key);
			}
		}
	}
	
	render() {
		this.asset = assets.player.sprite;
		state.context.drawImage(this.asset.image, 0, 0, 100, 100, this.location.x, this.location.y, 100, 100);
	}
}
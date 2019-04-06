import MeleeWeapon from "./meleeweapon.js";
import RangedWeapon from "./rangedweapon.js";
import Proposition from "./proposition.js";

export default class AttackProposition extends Proposition {
	constructor({ direction, object, weaponSlot }) {
		super({ object });
		this.direction = direction;
		this.weaponSlot = weaponSlot;
		this.location = { x: null, y: null }; // FIXME
	}
	
	validate() {
		super.validate();
		
		if (this.object.effects.freezeMeleeAttack > 0 && this.weaponSlot instanceof MeleeWeapon) {
			this.accepted = false;
			return;
		}
		
		if (this.object.effects.freezeRangedAttack > 0 && this.weaponSlot instanceof RangedWeapon) {
			this.accepted = false;
			return;
		}
		
		if (this.weaponSlot == null) {
			this.accepted = false;
			return;
		}
	}
	
	apply() {
		super.apply();
		
		this.weaponSlot.attack();
	}
}
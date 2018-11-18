import state from "./state.js";

// Class that updates based on player position.
export default class Thing {
	constructor() {
		this.location = {
				x: null,
				y: null
		};
		
		this.direction = null;
		
		this.status = null;
		this.owner = null;
		
		this.color = null;
		this.size = null;
		
		this.speed = {
			current: null,
			min: null,
			max: null
		};
		
		this.inventory = new Set();
		
		this.effects = {
			freezeMeleeAttack: 0,
			freezeRangedAttack: 0,
			immobilized: 0,
			invicibility: 0
		};
		
		this.sets = {
			primary: null,
			secondary: null
		};
		
		this.propositions = {
			movement: new Set(),
			attack: new Set(),
			damage: new Set()
		};
	}
	
	/*
	set currentLocation({ x, y }) {
		this._location = { x, y };
	}
	
	get currentLocation() { return this._location; }
	
	set targetLocation({ x, y }) {
		this._location.target = { x, y };
	}
	
	set currentDirection(direction) { this._direction = direction; }
	get currentDirection() { return this._direction; }
	
	set targetDirection(direction) { this._direction = direction; }
	get targetDirection() { return this._direction; }
	
	get targetLocation() { this._location.target; }
	
	set currentSpeed(speed) { this._speed.current = speed; }
	get currentSpeed() { return this._speed.current;}
	
	set status(status) { this._status = status; }
	get status() { return this._status; }
	*/

	location_center() { return { x: this.location.x + ( this.size / 2 ), y: this.location.y + ( this.size / 2 )}; }
	
	location_corner(cornernumber) {
		switch (cornernumber) {
		case 1:
			return this.location;
		case 2:
			return { x: this.location.x, y: this.location.y + this.size };
		case 3:
			return { x: this.location.x + this.size, y: this.location.y + this.size };
		case 4:
			return { x: this.location.x, y: this.location.y + this.size };
		}
	}
	
	getSide(sidenumber) {
		let location = null;
		let halfsize = this.size / 2;
		
		if (sidenumber == 1) {
			location = this.getCornerLocation(1);
			location.x += halfsize;
		}
		else if (sidenumber == 2) {
			location = this.getCornerLocation(2);
			location.y += halfsize;
		}
		else if (sidenumber == 3) {
			location = this.getCornerLocation(4);
			location.x += halfsize;
		}
		else if (sidenumber == 4) {
			location = this.getCornerLocation(1);
			location.y += halfsize;
		}
		
		return location;
	}
	
	updateEffects() {
		for (const [name, value] of Object.entries(this.effects)) {
			// FIXME: Broken
			if (value > 0) {
				this.effects[name] -= 1;
			}
		}
	}
	
	applyPropositions() {
		// TODO: FIXME.
		for (const proposition of this.propositions.movement) {
			proposition.validate();
		
			if (proposition.accepted == true) {
				proposition.apply();
			}
		
			this.propositions.movement.delete(proposition);
		}
		
		for (const proposition of this.propositions.attack) {
			proposition.validate();
		
			if (proposition.accepted == true) {
				proposition.apply();
			}
		
			this.propositions.attack.delete(proposition);
		}
		
	}
	
	collidesWith(object) {
		if (object === this) {
			return false;
		}
		
		/*
		if (((object.location.x >= this.location.x || object.location.x + object.size >= this.location.x) && object.location.x <= this.location.x + this.size)
			&& ((object.location.y >= this.location.y || object.location.y + object.size >= this.location.y) && object.location.y <= this.location.y + this.size)) {
				return true;
		}*/
		if ((Math.abs(this.location.x - object.location.x) * 2 < (this.size + object.size)) && (Math.abs(this.location.y - object.location.y) * 2 < (this.size + object.size))) {
			return true;
		}
		
		return false;
	}
	
	mutate(mutator) {
		Object.assign(this, {...mutator});
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.x, this.location.y, this.size, this.size);
	}
	
	destroy() {
		this.status = false;
	}
	
	checkAbstract() {
		// TODO: Utility function to prevent spawning abstracts.
	}
	
	clean() {
		this.propositions = {
			movement: new Set(),
			attack: new Set(),
			damage: new Set()
		};
	}
}
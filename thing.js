import state from "./state.js";

// Class that updates based on player position.
export default class Thing {
	constructor() {
		this.location = {
			current: {
				x: null,
				y: null
			},
			target: {
				x: null,
				y: null
			}
		};
		
		this.direction = {
			current: null,
			target: null
		};
		
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
	}
	
	/*
	set currentLocation({ x, y }) {
		this._location.current = { x, y };
	}
	
	get currentLocation() { return this._location.current; }
	
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

	location_center() { return { x: this.location.current.x + ( this.size / 2 ), y: this.location.current.y + ( this.size / 2 )}; }
	
	location_corner(cornernumber) {
		switch (cornernumber) {
		case 1:
			return this.location.current;
		case 2:
			return { x: this.location.current.x, y: this.location.current.y + this.size };
		case 3:
			return { x: this.location.current.x + this.size, y: this.location.current.y + this.size };
		case 4:
			return { x: this.location.current.x, y: this.location.current.y + this.size };
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
	
	update() {
		// TODO: Move towards target location.
		// TODO: Proposal system for attacks and health losses.
		// TODO: Mutator class that acts as target?
		if (this.effects.immobilized <= 0) {
			if (this.location.target.x) {
				this.location.current.x = this.location.target.x;
			}
		
			if (this.location.target.y) {
				this.location.current.y = this.location.target.y;
			}

			if (this.direction.target) {
				this.direction.current = this.direction.target;
			}
		}
		else {
			this.effects.immobilized -= 1;
		}
		
		if (this.effects.freezeMeleeAttack <= 0) {
			// :D
		}
		else {
			this.effects.freezeMeleeAttack -= 1;
		}
		
		if (!this.effects.freezeRangedAttack) {
			// :D
		}
		else {
			this.effects.freezeRangedAttack -= 1;
		}
		
		this.location.target = { x: null, y: null };
		this.direction.target = null;
		
		// FIXME
		if (this.location.current.x > 1000 || this.location.current.y > 1000 || this.location.current.x < 0 || this.location.current.y < 0) {
			this.destroy();
		}
	}
	
	mutate(mutator) {
		for (let key of Object.keys(mutator)) {
		  this[key] = mutator[key]
		}
	}
	
	render() {
		state.context.fillStyle = this.color;
		state.context.fillRect(this.location.current.x, this.location.current.y, this.size, this.size);
	}
	
	destroy() {
		this.status = false;
	}
}
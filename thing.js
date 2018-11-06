import state from "./state.js";

// Class that updates based on player position.
export default class Thing {
	constructor() {
		this.location = {
			x: null,
			y: null,
			targetx: null,
			targety: null,
			previousx: null,
			previousy: null
		};
		
		this.direction = {
			current: null,
			target: null
		};
		
		this.speed = {
			current: null,
			min: null,
			max: null
		};
		
		this.renderVars = {
			animation: {
				frames: null,
				currentFrame: null
			}
		};
		
		this.status = true;
		this.owner = null;
		
		this.freeze = {
			attack: 0,
			movement: 0
		};
	}
	
	update() {
		if (this.freeze.movement == 0) {
			if (this.location.targetx !== null) {
				this.location.x = this.location.targetx;
			}
		
			if (this.location.targety !== null) {
				this.location.y = this.location.targety
			}

			if (this.direction.target !== null) {
				this.direction.current = this.direction.target;
			}
		}
		else {
			this.freeze.movement -= 1;
		}
		
		if (this.freeze.attack == 0) {
			
		}
		else {
			this.freeze.attack -= 1;
		}
		
		this.location.targetx = null;
		this.location.targety = null;
		this.direction.target = null;
	}
	
	clean() {
		if (this.status == false) {
			state.objects.delete(this);
		}
	}
	
	destroy() {
		this.status = false;
	}
}
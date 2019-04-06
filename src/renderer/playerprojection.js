import assets from "./assets.js";

export default class PlayerProjection extends CreatureProjection {
	constructor({ thing }) {
		super.constructor({ thing });
		
		this.asset = assets.player;
		this.animation = null;
		this.frame = 1;
	}
	
	preDraw() {
		
	}
	
	draw() {
		
	}
}
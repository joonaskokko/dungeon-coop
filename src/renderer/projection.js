import state from "./state.js";

export default class Projection {
	constructor({ thing }) {
		this.duration = 0;
		this.source = thing;
		this.level = 0;
		this.color = "blue";
		this.asset = null;
		this.animation = null;
		this.animationSpeed = 1;
		this.assetX = 0;
		this.assetY = 0;
		this.origin = null;
		this.thing = thing;
	}
	
	update() {
		this.duration++;
		
		if (this.duration > this.animationSpeed) {
			this.nextFrame();
		}
	}
	
	nextFrame() {
		// TODO: Change sprite frame.
		
		// Reset duration.
		this.duration = 0;
	}
	
	clean() {
		if (this.thing.status = 0) {
			
		}
	}
	
	preDraw() {
		
	}
	
	draw() {
		state.context.drawImage(this.asset, this.assetX, this.assetY, this.asset.size, this.asset.size, this.thing.location.x, this.thing.location.y);
	}
}
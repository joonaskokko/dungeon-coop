export default class CanvasRenderer extends Renderer {
	constructor() {
		this.width = 1000;
		this.height = 1000;
		this.projections = [];
		
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
	}
}
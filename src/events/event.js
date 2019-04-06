import state from "./state.js";

export default class Event {
	constructor() {
		state.events.add(this);
	}
}
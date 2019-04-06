export default class Level {
	constructor({ width, height }) {
		this.rooms = [];
		this.width = width || 3;
		this.height = height|| 3;
		this.startingRoom = null;
		this.currentRoom = this.startingRoom;
		this.endingRoom = null
		this.generateEmptyLevelGrid();
	}
	
	generateEmptyLevelGrid() {
		if (this.width && this.height) {
			for (let y = 0; y < this.height; y++) {
				for (let x = 0; x < this.width; x++) {
					this.addRoom({ x: x, y: y }));
				}
			}
		}
	}
	
	searchRoom({ room }) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				// TODO: Shitty.
				if (room === this.rooms[y][x]) {
					return { x: x, y: y};
				}
			}
		}
		
		return null;
	}
	
	addRoom({ x, y, startingRoom }) {
		if (typeof this.rooms[y][x] !== 'undefined') {
			let room = new Room( { level: this });
			this.rooms[y][x] = room;
			
			if (startingRoom) {
				this.startingRoom = room;
			}
		}
	}
	
	getRoom({ x, y }) {
		
	}
	
	getNextRoom({ currentRoom, direction }) {
		let nextRoom = null;
		
		let currentRoomCoordinates = searchRoom( { currentRoom } );
		let nextRoomCoordinates = currentRoomCoordinates;
		
		if (currentRoomCoordinates == null) {
			// TODO: Error.
		}
		
		switch (direction) {
		case 1;
			nextRoomCoordinates.y -= 1;
			break;
		case 2:
			nextRoomCoordinates.x += 1;
			break;
		case 3:
			nextRoomCoordinates.y += 1;
			break;
		case 4:
			nextRoomCoordinates.x -= 1;
			break;
		}
		
		if (this.rooms[nextRoomCoordinates.y][nextRoomCoordinates.x] !== 'undefined') {
			nextRoom = this.rooms[nextRoomCoordinates.y][nextRoomCoordinates.x];
		}
		
		return nextRoom;
	}
}
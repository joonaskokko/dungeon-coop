/*
thing:
	creature:
		player
		enemy
	obstacle:
		building
		crate
		door
	projectile
	item
		weapon
*/
import state from "./state.js";
import assets from "./assets/assets.js";

import Player from "./src/creatures/player.js";
import RangedWeapon from "./src/items/rangedweapon.js";
import MeleeWeapon from "./src/items/meleeweapon.js";

import Level from "./src/map/level.js";
import Room from "./src/map/room.js";
import Projectile from "./src/effects/projectile.js";

import CanvasRenderer from "./src/renderer/canvasrenderer.js";

// Load player asset.
// TODO: Make more sense to this.
new Promise(function(resolve, reject) {
	let image = new Image();
	
	image.src = assets.player.sprite.src;
	image.onload = resolve;
	
	assets.player.sprite.image = image;
}).then(function() { state.running = true; });

let animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	window.setTimeout(callback, 1000 / 60)
};

let renderer = new CanvasRenderer();

const bindings = {
	/*
	UP = 38
	DW = 40
	LF = 37
	RT = 39
	SHIFT = 16
	CTRL = 17
	*/
	1: {
		upkey: 38,
		downkey: 40,
		rightkey: 39,
		leftkey: 37,
		attack1key: 17,
		attack2key: 16
	},
	/*
	W = 87
	S = 83
	D = 68
	A = 65
	*/
	2: {
		upkey: 87,
		downkey: 83,
		rightkey: 68,
		leftkey: 65,
		attack1key: 69,
		attack2key: 81
	}
};

state.level = new Level();
state.level.generateRooms();
state.currentRoom = state.level.startingRoom;

state.objects = {};

state.objects.creatures = new Set();
state.objects.enemies = new Set();
state.objects.players = new Set();
state.objects.items = new Set();

let player1 = new Player({ x: 220, y: 220, bindings: bindings[1], color: "blue" });
let player2 = new Player({ x: 420, y: 420, bindings: bindings[2], color: "orange" });

player1.addItem({ item: new MeleeWeapon({ name: "Sword", damage: 10, cooldown: 20, speed: 5, size: 50}), weaponSlotNumber: 1 });
player1.addItem({ item: new RangedWeapon({ name: "Bow", cost: 10, damage: 50, speed: 5, cooldown: 50, projectileSize: 10, projectileSpeed: 20}), weaponSlotNumber: 2 });

player2.addItem({ item: new MeleeWeapon({ name: "Sword", damage: 10, cooldown: 20, speed: 5, size: 50}), weaponSlotNumber: 1 });
player2.addItem({ item: new RangedWeapon({ name: "Bow", cost: 10, damage: 50, cooldown: 50, speed: 5, projectileSize: 10, projectileSpeed: 20}), weaponSlotNumber: 2 });

state.objects.creatures.add(player1);
state.objects.creatures.add(player2);

state.objects.projectiles = new Set();

let hooks = [ "clean", "move", "attack", "updateEffects", "applyPropositions" ];

let invoke = function(function_name, object) {
	if (typeof object[function_name] === "function") {
		object[function_name].call(object);
	}
};

let step = function () {
	if (state.running) {
		hooks.forEach(function(hook) {
			invoke(hook, state.objects.room);
			
			for (let player of state.objects.players) {
				invoke(hook, player);
			};
			
			for (let item of state.objects.items) {
				invoke(hook, item);
			};
			
			for (let enemy of state.objects.enemies) {
				invoke(hook, enemy);
			};
			
			for (let projectile of state.objects.projectiles) {
				invoke(hook, projectile);
			}
		});
		
		
		
		animate(step);
	}
};

window.onload = function() {
	document.body.appendChild(state.canvas);
	animate(step);
}

window.addEventListener("keydown", function (event) {
	state.keysDown.add(event.keyCode);
});

window.addEventListener("keyup", function (event) {
	delete state.keysDown.delete(event.keyCode);
});

window.onblur = function(){  
	state.running = false;  
}  
window.onfocus = function(){  
	state.running = true;
	animate(step);
}
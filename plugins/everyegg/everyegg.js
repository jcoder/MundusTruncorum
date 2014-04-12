/**
 * Every thrown egg spawns a creature if you have an emerald in your inventory
 * 
 * This plugin is part of github.com/jcoder/MundusTruncorum
 *  
 * author: jCoder
 * version: 1.0   
 */

events.on('player.PlayerEggThrowEvent', function(evt) {
	// get the current player and the inventory
	var player = evt.player;
	var inventory = player.inventory;
	// check if at least one emerald is in player's inventory
	if (inventory.contains(org.bukkit.Material.EMERALD, 1)) {
		// force spawning
		evt.hatching = true;
		// number of spawned creatures
		evt.numHatches = 1;
	}
});

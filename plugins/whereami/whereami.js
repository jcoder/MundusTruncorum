/**
 * Informs the player about the current coordinates
 * 
 * This is an in-game command, available to all users.
 * Usage: /jsp whereami   
 * 
 * This plugin is part of github.com/jcoder/MundusTruncorum
 *  
 * author: jCoder
 * version: 1.0   
 */

var foreach = require('utils').foreach;

command('whereami',function(parameters,sender) {
	var loc = sender.location;
	var msg = 'You are at X=' + loc.blockX + ' Z=' + loc.blockZ + ' (Y=' + loc.blockY + ')';
	sender.sendMessage(msg.indigo());
});

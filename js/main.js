require(["prez"], function( Prez ) {
	"use strict";

	var p = new Prez({
		callback: function(timeElapsed) {
			console.log("%c" + timeElapsed, "font-size: 10em; color: transparent; -webkit-text-stroke: 3px pink;");
		}
	});

	p.start();

});
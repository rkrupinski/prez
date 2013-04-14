require(["prez"], function( Prez ) {
	"use strict";

	function completeHandler(timeElapsed) {
		console.log("%c" + timeElapsed, "font-size: 10em; color: transparent; -webkit-text-stroke: 3px pink;");
	}

	function progressHandler(index, slide) {
		console.log(index, slide.id);
	}

	new Prez({
		onComplete: completeHandler,
		onProgress: progressHandler
	}).start();

});
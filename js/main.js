require(["prez"], function( Prez ) {
	"use strict";

	var p = new Prez({

		onComplete: function(timeElapsed) {
			console.log("%c" + timeElapsed, "font-size: 10em; color: transparent; -webkit-text-stroke: 3px pink;");
		},

		onProgress: function(index, slide) {
			console.log(index, slide.id);

			if (slide.querySelectorAll(".quot").length) {
				slide.classList.add("foo");
			}
		}

	});

	p.start();

});
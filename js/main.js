require(['prez'], function( Prez ) {

	var p = new Prez({
		callback: function(timeElapsed) {
			// alert(timeElapsed);
		}
	});

	p.start();

});
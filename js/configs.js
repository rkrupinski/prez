define(["utils"], function(utils) {
	"use strict";

	var env = utils.env();

	return {
		config: [
			{
				implementation: "config/webkit",
				isAvailable: function() {
					return env === "webkit";
				}
			},
			{
				implementation: "config/moz",
				isAvailable: function() {
					return env === "moz";
				}
			},
			{
				implementation: "config/default",
				isAvailable: function() {
					return true;
				}
			}
		]
	};

});
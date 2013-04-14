define(["exports"], function(exports) {
	"use strict";

	exports.extend = function(obj /* , sources */) {
		var sources = Array.prototype.slice.call(arguments, 1);

		sources.forEach(function(source) {
			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					obj[key] = source[key];
				}
			}
		});

		return obj;
	};

	exports.makeArray = function(obj) {
		return Array.prototype.slice.call(obj);
	};

	exports.env = function() {
		// http://davidwalsh.name/vendor-prefix
		var styles = window.getComputedStyle(document.documentElement, "");

		return (Array.prototype.slice
			.call(styles)
			.join("")
			.match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"])
		)[1];
	};

});
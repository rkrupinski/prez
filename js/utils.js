define(["exports"], function(exports) {

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

});
define(["utils", "defaults"], function(utils, defaults) {
	"use strict";

	function Prez(config) {
		if ( !(this instanceof Prez) ) {
			return new Prez(config);
		}

		this._config    = utils.extend({}, defaults, config);

		this._prez1     = document.querySelector(".-prez1");
		this._prez2     = document.querySelector(".-prez2");
		this._slides    = document.querySelectorAll(".-slide");
		this._current   = 0;
		this._startTime = null;

		this._prepareSlides();
		this._bindHandlers();
	}

	Prez.prototype._prepareSlides = function() {
		var data;

		Array.prototype.forEach.call(this._slides, function(slide) {
			data = slide.dataset;

			slide.classList.add(this._config.beforeClassName);

			slide.style[this._config.transformProp] = [
				"translate(-50%, -50%) ",
				"translate3d(" + data.posx + "px, " + data.posy + "px, " + data.posz + "px) ",
				"rotateX(" + data.rotatex + "deg) ",
				"rotateY(" + data.rotatey + "deg) ",
				"rotateZ(" + data.rotatez + "deg) ",
				"scale(" + data.scale + ")"
			].join("");

		}.bind(this));
	};

	Prez.prototype._bindHandlers = function() {
		this._prez2.addEventListener(this._config.transitionEndEvent, this._switch.bind(this), false);
	};

	Prez.prototype._getCurrentSlide = function() {
		return this._slides[this._current];
	};

	Prez.prototype._switch = function(e) {
		var slide;

		if (e.target !== this._prez2) {
			return;
		}

		slide = this._getCurrentSlide();

		slide.classList.remove(this._config.beforeClassName);
		slide.classList.remove(this._config.nextClassName);
		slide.classList.add(this._config.currentClassName);

		setTimeout(
			this[this._current < this._slides.length - 1 ? '_next' : '_end'].bind(this),
			this._getCurrentSlide().dataset.duration
		);
	};

	Prez.prototype._next = function() {
		var slide = this._getCurrentSlide();

		slide.classList.remove(this._config.currentClassName);
		slide.classList.add(this._config.afterClassName);

		this._current += 1;
		this._transition();
	};

	Prez.prototype._transition = function() {
		var slide = this._getCurrentSlide(),
			data = slide.dataset;

		slide.classList.add(this._config.nextClassName);

		this._prez1.style[this._config.transformProp] = [
			"perspective(" + this._config.basePerspective + "px) ",
			"scale(" + (1 / data.scale) + ")"
		].join("");

		this._prez1.style[this._config.transitionDurationProp] = data.transition + "ms";

		this._prez2.style[this._config.transformProp] = [
			"rotateZ(" + -data.rotatez + "deg) ",
			"rotateY(" + -data.rotatey + "deg) ", 
			"rotateX(" + -data.rotatex + "deg) ",
			"translate3d(" + -data.posx + "px, " + -data.posy + "px, " + -data.posz + "px)"
		].join("");

		this._prez2.style[this._config.transitionDurationProp] = data.transition + "ms";
	};

	Prez.prototype._end = function() {
		var slide = this._getCurrentSlide();

		slide.classList.remove(this._config.currentClassName);
		slide.classList.add(this._config.afterClassName);

		if (typeof this._config.callback === "function") {
			this._config.callback.call(null, Date.now() - this._startTime);
		}
	};

	Prez.prototype.start = function() {
		document.body.classList.add(this._config.activeClassName);

		this._startTime = Date.now();
		this._transition();
	};

	return Prez;

});
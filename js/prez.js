define(["utils", "config"], function(utils, config) {
	"use strict";

	function Prez(options) {
		if ( !(this instanceof Prez) ) {
			return new Prez(options);
		}

		this._config    = utils.extend({}, config, options);

		this._prez1     = document.querySelector(".-prez1");
		this._prez2     = document.querySelector(".-prez2");
		this._slides    = utils.makeArray(document.querySelectorAll(".-slide"));
		this._current   = null;
		this._startTime = null;

		this._prepareSlides();
		this._bindHandlers();
	}

	Prez.prototype._prepareSlides = function() {
		var data;

		this._slides.forEach(function(slide) {
			data = slide.dataset;

			slide.classList.add(this._config.beforeClassName);

			slide.style[this._config.transformProp] = [
				"translate(-50%, -50%) ", 
				"translate3d(",
					data.posX || 0, "px, ",
					data.posY || 0, "px, ",
					data.posZ || 0, "px",
				")",
				"rotateX(", data.rotateX || 0, "deg) ",
				"rotateY(", data.rotateY || 0, "deg) ",
				"rotateZ(", data.rotateZ || 0, "deg) ",
				"scale(", data.scale || 1, ")"
			].join("");

		}.bind(this));
	};

	Prez.prototype._bindHandlers = function() {
		this._prez2.addEventListener(this._config.transitionEndEvent, this._switch.bind(this), false);
	};

	Prez.prototype._getCurrentSlide = function() {
		return this._slides[this._current];
	};

	Prez.prototype._isLast = function() {
		return this._current === this._slides.length - 1;
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
			this[this._isLast() ? "_end" : "_next"].bind(this),
			this._getCurrentSlide().dataset.duration || this._config.defaults.lifetime
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
			"perspective(", this._config.defaults.perspective, "px) ",
			"scale(", 1 / data.scale, ")"
		].join("");

		this._prez1.style[this._config.transitionDurationProp] = (data.transition || this._config.defaults.transition) + "ms";
		this._prez1.style[this._config.transitionTimingProp] = data.easing || this._config.defaults.easing;

		this._prez2.style[this._config.transformProp] = [
			"rotateZ(",	-data.rotateZ || 0, "deg) ",
			"rotateY(", -data.rotateY || 0, "deg) ",
			"rotateX(", -data.rotateX || 0, "deg) ",
			"translate3d(",
				-data.posX || 0, "px, ",
				-data.posY || 0, "px, ",
				-data.posZ || 0, "px",
			")"
		].join("");

		this._prez2.style[this._config.transitionDurationProp] = (data.transition || this._config.defaults.transition) + "ms";
		this._prez2.style[this._config.transitionTimingProp] = data.easing || this._config.defaults.easing;
	};

	Prez.prototype._end = function() {
		var slide = this._getCurrentSlide();

		slide.classList.remove(this._config.currentClassName);
		slide.classList.add(this._config.afterClassName);

		if (typeof this._config.callback === "function") {
			this._config.callback.call(this, Date.now() - this._startTime);
		}
	};

	Prez.prototype.start = function() {
		document.body.classList.add(this._config.activeClassName);

		this._startTime = Date.now();
		this._current = 0;
		this._transition();
	};

	return Prez;

});
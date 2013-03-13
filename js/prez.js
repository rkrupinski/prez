define(['lodash'], function( _ ) {
    "use strict";

    var defaults = {

        activeClassName        : "prez-active",
        currentClassName       : "prez-current",
        transitioningClassName : "prez-transitioning",
        transitionEvent        : "webkitTransitionEnd"

    };

    function Prez(config) {

        this._config    = _.extend({}, defaults, config);

        this._prez1     = document.querySelector(".-prez1");
        this._prez2     = document.querySelector(".-prez2");
        this._prez3     = document.querySelector(".-prez3");
        this._slides    = document.querySelectorAll(".-slide");
        this._current   = 0;
        this._startTime = null;

        this._prepareSlides();
        this._bindHandlers();

    }

    Prez.prototype._prepareSlides = function() {

        var transform, data;

        _.forEach(this._slides, function(slide) {

            data = slide.dataset,
            transform = [
                            "translate(-50%, -50%) ",
                            "translate3d(" + data.posx + "px, " + data.posy + "px, " + data.posz + "px) ",
                            "rotateX(" + data.rotatex + "deg) ",
                            "rotateY(" + data.rotatey + "deg) ",
                            "rotateZ(" + data.rotatez + "deg)"
                        ].join('');

            this._setTransform(slide, transform);

        }.bind(this));

    };

    Prez.prototype._bindHandlers = function() {

        this._prez2.addEventListener(

            this._config.transitionEvent, 

            function(e) {
                if (e.target !== this._prez2) {
                    return;
                }
                e.target.classList.remove(this._config.transitioningClassName);
            }.bind(this),

            false
        );

        this._prez3.addEventListener(

            this._config.transitionEvent,

            this._switch.bind(this),

            false

        );

    };

    Prez.prototype._setTransform = function(el, transform) {

        el.style.WebkitTransform = transform;
        el.style.transform       = transform;

    };

    Prez.prototype._switch = function(e) {
        var data;

        if (e.target !== this._prez3) {
            return;
        }

        data = this._slides[this._current].dataset;

        setTimeout(

            this[this._current === this._slides.length - 1 ? '_end' : '_next'].bind(this),

            data.duration

        );

    };

    Prez.prototype._next = function() {

        this._slides[this._current].classList.remove(this._config.currentClassName);

        this._current += 1;

        this._prez2.classList.add(this._config.transitioningClassName);

        this._transition(this._slides[this._current].dataset);

    };

    Prez.prototype._transition = function(data) {

        var transform = [
                            "rotateZ(" + -data.rotatez + "deg) ",
                            "rotateY(" + -data.rotatey + "deg) ", 
                            "rotateX(" + -data.rotatex + "deg) ",
                            "translate3d(" + -data.posx + "px, " + -data.posy + "px, " + -data.posz + "px)"
                        ].join('');

        this._slides[this._current].classList.add(this._config.currentClassName);

        this._setTransform(this._prez3, transform);

    };

    Prez.prototype._end = function() {

        if (typeof this._config.callback === "function") {

            this._config.callback.call(null, Date.now() - this._startTime);

        }

    };

    Prez.prototype.start = function() {

        this._startTime = Date.now();

        this._prez1.classList.add(this._config.activeClassName);

        this._transition(this._slides[this._current].dataset);

    };

    return Prez;

});
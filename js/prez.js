define(['jquery'], function( $ ) {
    "use strict";

    var defaults = {

        activeClassName  : "prez-active",
        currentClassName : "prez-current",
        transitionEvent  : "webkitTransitionEnd",
        basePerspective  : 1000

    };

    function Prez(config) {

        this._config    = $.extend({}, defaults, config);

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

            this._setTransform(

                slide,

                [
                    "translate(-50%, -50%) ",
                    "translate3d(" + data.posx + "px, " + data.posy + "px, " + data.posz + "px) ",
                    "rotateX(" + data.rotatex + "deg) ",
                    "rotateY(" + data.rotatey + "deg) ",
                    "rotateZ(" + data.rotatez + "deg) ",
                    "scale(" + data.scale + ")"
                ].join('')
            );

        }.bind(this));

    };

    Prez.prototype._bindHandlers = function() {

        this._prez2.addEventListener(

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

        if (e.target !== this._prez2) {
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

        this._transition(this._slides[this._current].dataset);

    };

    Prez.prototype._transition = function(data) {

        this._slides[this._current].classList.add(this._config.currentClassName);

        this._setTransform(

            this._prez1,

            [
                "perspective(" + this._config.basePerspective + "px) ",
                "scale(" + (1 / data.scale) + ")"
            ].join('')

        );


        this._setTransform(

            this._prez2,

            [
                "rotateZ(" + -data.rotatez + "deg) ",
                "rotateY(" + -data.rotatey + "deg) ", 
                "rotateX(" + -data.rotatex + "deg) ",
                "translate3d(" + -data.posx + "px, " + -data.posy + "px, " + -data.posz + "px)"
            ].join('')

        );

    };

    Prez.prototype._end = function() {

        if (typeof this._config.callback === "function") {

            this._config.callback.call(null, Date.now() - this._startTime);

        }

    };

    Prez.prototype.start = function() {

        this._startTime = Date.now();

        this._prez1.classList.add(this._config.activeClassName);

        setTimeout(
        
            this._transition.bind(this, this._slides[this._current].dataset),

            0

        );

    };

    return Prez;

});
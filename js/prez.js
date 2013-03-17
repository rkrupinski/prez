define(["utils"], function(utils) {
    "use strict";

    var defaults = {
        basePerspective     : 1000,
        activeClassName     : "prez-active",
        currentClassName    : "prez-current",
        eventNamespace      : "prez",
        transitionEndEvents : ["webkitTransitionEnd", "transitionend"]
    };

    function Prez(config) {
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

            this._setTransform(
                slide,
                [
                    "translate(-50%, -50%) ",
                    "translate3d(" + data.posx + "px, " + data.posy + "px, " + data.posz + "px) ",
                    "rotateX(" + data.rotatex + "deg) ",
                    "rotateY(" + data.rotatey + "deg) ",
                    "rotateZ(" + data.rotatez + "deg) ",
                    "scale(" + data.scale + ")"
                ].join("")
            );
        }.bind(this));
    };

    Prez.prototype._bindHandlers = function() {
        this._config.transitionEndEvents.forEach(function(event) {
            this._prez2.addEventListener(event, this._switch.bind(this), false);
        }.bind(this));
    };

    Prez.prototype._getCurrentSlide = function() {
        return this._slides[this._current];
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

        data = this._getCurrentSlide().dataset;

        setTimeout(this[this._current === this._slides.length - 1 ? '_end' : '_next'].bind(this), data.duration);

    };

    Prez.prototype._next = function() {
        this._getCurrentSlide().classList.remove(this._config.currentClassName);
        this._current += 1;
        this._transition();
    };

    Prez.prototype._transition = function() {
        var slide = this._getCurrentSlide(),
            data = slide.dataset;

        slide.classList.add(this._config.currentClassName);

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
            ].join("")
        );
    };

    Prez.prototype._end = function() {
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
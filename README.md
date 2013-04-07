prez
====

A simple slide-based animation tool originally designed to work with screen capture software.

###few things to know

* it does not come with wide browser support out of the box (assumes webkit, can be easily configured though)
* it does not come with any controls, it just runs and notifies when it's done
* it's public API is limited to the `start` method

###usage

Slides behaviour is controlled via `data-*` attributes:

* `data-pos-x`, `data-pos-y`, `data-pos-z` - positions slide in three-dimensional space (default: `0`)
* `data-rotate-x`, `data-rotate-y`, `data-rotate-z` - rotates slide around x / y / z axis (default: `0`)
* `data-scale` - scales slide up / down (default: `1`)
* `data-duration` - sets slide's life time (default: `2000`)
* `data-transition` - sets slide's transition duration (default: `750`)
* `data-easing` - sets slide's transition timing function (default: `ease`)

Each slide has 4 states which can be addressed using SASS mixins:

* `prez-before` - addresses all unseen slides
* `prez-next` - addresses slide being shown
* `prez-current` - addresses currently viewed slide
* `prez-after` - addresses all seen slides

Two callbacks can be passed to the `Prez` constructor:

* `onComplete(timeElapsed)` invoked when last slide ends it's life
* `onProgress(index, slide)` invoked when a slide is shown

###configuration

For "variety" of available configuration options check [here](https://github.com/rkrupinski/prez/blob/master/js/config.js).

###example

http://rkrupinski.github.io/prez/

###changelog

* "0.0.4" - `onComplete` & `onProgress` added
* "0.0.3" - default attribute values
* stuff...

define({

	// classes:
	activeClassName        : "prez-active",
	beforeClassName        : "prez-unseen",
	nextClassName          : "prez-transitioning",
	currentClassName       : "prez-viewed",
	afterClassName         : "prez-seen",

	// events:
	transitionEndEvent     : "webkitTransitionEnd",
	transitionDurationProp : "WebkitTransitionDuration",
	transitionTimingProp   : "WebkitTransitionTimingFunction",
	transformProp          : "WebkitTransform",

	// default values:
	defaults: {
		perspective        : 1000,
		lifetime           : 2000,
		transition         : 750,
		easing             : "ease"
	}

});
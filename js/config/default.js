define({

	// classes:
	activeClassName        : "prez-active",
	beforeClassName        : "prez-unseen",
	nextClassName          : "prez-transitioning",
	currentClassName       : "prez-viewed",
	afterClassName         : "prez-seen",

	// events:
	transitionEndEvent     : "transitionend",
	transitionDurationProp : "transitionDuration",
	transitionTimingProp   : "transitionTimingFunction",
	transformProp          : "transform",

	// default values:
	defaults: {
		perspective        : 1000,
		lifetime           : 2000,
		transition         : 750,
		easing             : "ease"
	}

});
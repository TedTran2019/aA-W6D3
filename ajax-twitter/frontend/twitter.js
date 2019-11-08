const FollowToggle = require('./follow_toggle.js');

$(() => {
	const buttons = $('button.follow-toggle');
	$.each(buttons, (_i, button) => {
		new FollowToggle($(button));
	});
});

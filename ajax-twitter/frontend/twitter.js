const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
$(() => {
	const buttons = $('button.follow-toggle');
	const searches = $('nav.users-search');
	$.each(buttons, (_i, button) => {
		new FollowToggle($(button));
	});
	$.each(searches, (_i, search) => {
		new UsersSearch($(search));
	});
});

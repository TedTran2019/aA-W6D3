const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(() => {
	const buttons = $('button.follow-toggle');
	const searches = $('nav.users-search');
	const tweetForms = $('form.tweet-compose');

	$.each(buttons, (_i, button) => {
		new FollowToggle($(button));
	});
	$.each(searches, (_i, search) => {
		new UsersSearch($(search));
	});
	$.each(tweetForms, (_i, form) => {
		new TweetCompose($(form));
	});
});

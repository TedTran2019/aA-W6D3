const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');
$(() => {
	const buttons = $('button.follow-toggle');
	const searches = $('nav.users-search');
	const tweetForms = $('form.tweet-compose');
	const infiniteTweets = $('.infinite-tweets');

	$.each(buttons, (_i, button) => {
		new FollowToggle($(button));
	});
	$.each(searches, (_i, search) => {
		new UsersSearch($(search));
	});
	$.each(tweetForms, (_i, form) => {
		new TweetCompose($(form));
	});
	$.each(infiniteTweets, (_i, tweet) => {
		new InfiniteTweets($(tweet));
	});
});

const Util = require('./api_utils.js');

class InfiniteTweets {
	constructor($el) {
		this.infinite = $el;
		this.maxCreatedAt = null;
		this.fetch_link = this.infinite.find('.fetch-more');
		this.fetch_link.on('click', event => this.fetchTweets(event));
		// this.fetch_link.on('click', this.fetchTweets.bind(this));
		this.infinite.on('insert-tweet', this.insertTweet.bind(this));
	}

	fetchTweets(event) {
		event.preventDefault();
		if (this.maxCreatedAt) {
			Util.grabFeed(this.maxCreatedAt).then(tweets => this.insertTweets(tweets));
		} else {
			Util.grabFeed().then(tweets => this.insertTweets(tweets));
		}
	}

	insertTweets(tweets) {
		let ul = this.infinite.find('#feed');
		tweets.forEach(tweet => {
			let li = $('<li>').text(JSON.stringify(tweet));
			ul.append(li);
		});
		// 20 is the limit in feeds_controller.rb
		if (tweets.length < 20) {
			this.fetch_link.remove();
			this.infinite.append('No more tweets to fetch!');
		} else if (tweets.length > 0) {
			this.maxCreatedAt = tweets[tweets.length - 1].created_at;
		}
	}

	insertTweet(event, tweet) {
		let li = $('<li>').append(JSON.stringify(tweet));
		$(event.target).prepend(li);
		if (!this.maxCreatedAt) {
			this.maxCreatedAt = tweet.created_at;
		}
	}
}
module.exports = InfiniteTweets;

const Util = require('./api_utils.js');

class FollowToggle {
	constructor($el, options) {
		this.button = $el;
		this.userId = this.button.data('user-id') || options.userId;
		console.log(this.followState);
		this.followState = this.button.data('initial-follow-state');
		if (typeof this.followState === 'undefined') {
			this.followState = options.followState;
		}
		// followState in dataBase starts out as true/false
		this.followState = (this.followState === true ? 'followed' : 'unfollowed');
		this.render();
		this.button.on('click', this.handleClick.bind(this));
	}

	render() {
		this.button.prop('disabled', false);
		if (this.followState === 'followed') {
			this.button.text('Unfollow!');
		} else if (this.followState === 'unfollowed') {
			this.button.text('Follow!');
		} else {
			this.button.prop('disabled', true);
		}
	}

	// Notice only a onFulfilled func is passed into then
	handleClick(event) {
		event.preventDefault();
		if (this.followState === 'followed') {
			this.followState = 'unfollowing';
			Util.unfollowUser(this.userId).then(() => {
				this.followState = 'unfollowed';
				this.render();
			});
		} else {
			this.followState = 'following';
			Util.followUser(this.userId).then(() => {
				this.followState = 'followed';
				this.render();
			});
		}
		this.render();
	}
}

module.exports = FollowToggle;

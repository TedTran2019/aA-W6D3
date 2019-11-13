const Util = require('./api_utils.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
	constructor($search) {
		this.search = $search;
		this.ul = this.search.find('.users');
		this.input = this.search.find('input');
		this.handleInput();
	}

	handleInput() {
		this.input.on('input', event => {
			Util.searchUsers(this.input.val()).then(users => {
				console.log(users);
				this.renderResults(users);
			});
		});
	}

	renderResults(users) {
		this.ul.empty();
		users.forEach(user => {
			let a = $('<a>')
			.attr('href', user.id)
			.text(`${user.username}`);
			let button = $('<button>').addClass('follow-toggle');
			let options = {
				userId: user.id,
				followState: user.followed
			};

			let li = $('<li>').append(a, button);
			this.ul.append(li);
			new FollowToggle(button, options);
		});
	}
}

module.exports = UsersSearch;

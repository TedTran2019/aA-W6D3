const Util = require('./api_utils.js');

class UsersSearch {
	constructor($search) {
		this.search = $search;
		this.ul = this.search.find('.users');
		this.input = this.search.find('input');
		this.handleInput();
	}

	handleInput() {
		this.input.on('input', event => {
			Util.searchUsers(this.input.val()).then(() => {
				console.log('Success!');
			});
		});
	}

	renderResults() {

	}
}

module.exports = UsersSearch;

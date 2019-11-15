const Util = require('./api_utils.js');

class TweetCompose {
	constructor($form) {
		this.form = $form;
		this.countRemaining();
		this.submit();
	}

	submit() {
		this.form.on('submit', (event) => {
			event.preventDefault();
			// Can also do $(event.currentTarget).serializeJSON()
			let data = this.form.serializeJSON();
			this.form.find(':input').prop('disabled', true);
			Util.createTweet(data).then(tweet => this.handleSuccess(tweet));
		});
	}

	clearInput() {
		this.form.find('textarea').val('');
	}

	handleSuccess(tweet) {
		this.clearInput.bind(this)();
		this.form.find(':input').prop('disabled', false);
		let ul_name = this.form.data('tweets-ul');
		let ul = $(ul_name);
		let li = $('<li>').append(JSON.stringify(tweet));
		ul.prepend(li);
		this.form.find('.chars-left').empty();
	}

	countRemaining() {
		let textarea = this.form.find('textarea');
		let strong = this.form.find('.chars-left');
		textarea.on('input', event => {
			let input = textarea.val();
			strong.text(`${140 - input.length}`);
		});
	}
}

module.exports = TweetCompose;

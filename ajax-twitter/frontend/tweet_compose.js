const Util = require('./api_utils.js');

class TweetCompose {
	constructor($form) {
		this.form = $form;
		this.form.find('select').remove();
		this.addMention();
		this.form.on('click', 'a.remove-mentioned-user', event => this.removeMentionedUser(event));
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
		$('.tweet-compose .mention').remove();
		this.form.find(':input').prop('disabled', false);
		this.form.find('.chars-left').empty();
	}

	handleSuccess(tweet) {
		this.clearInput.bind(this)();
		let ul_name = this.form.data('tweets-ul');
		$(ul_name).trigger('insert-tweet', tweet);
	}

	countRemaining() {
		let textarea = this.form.find('textarea');
		let strong = this.form.find('.chars-left');
		textarea.on('input', event => {
			let input = textarea.val();
			strong.text(`${140 - input.length}`);
		});
	}

	newUserSelect() {
		let div = $('<div>').addClass('mention');
		let select = $('<select>').attr('name', "tweet[mentioned_user_ids][]");
		div.append(select);
		div.insertAfter('.tweet-compose textarea');
		window.users.forEach(user => {
			let option = $('<option>').val(user.id).text(user.username);
			select.append(option);
		});
		let remove = $('<a>').addClass('remove-mentioned-user').text('remove');
		div.append(remove);
	}

	addMention() {
		let link = $('<a>')
		.addClass('add-mention')
		.text('Add mention');
		link.insertAfter('.tweet-compose textarea');
		link.on('click', this.newUserSelect.bind(this));
	}

	removeMentionedUser(event) {
		$(event.currentTarget).parent().remove();
	}
}

module.exports = TweetCompose;

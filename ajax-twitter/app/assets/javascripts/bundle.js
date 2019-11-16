/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_utils.js":
/*!*******************************!*\
  !*** ./frontend/api_utils.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
	followUser: (id) => {
		return $.ajax({
			url: `/users/${id}/follow`,
			type: 'post',
			dataType: 'json',
			error: (error) => console.log(error)
		});
	},

	unfollowUser: id => {
		return $.ajax({
			url: `/users/${id}/follow`,
			type: 'delete',
			dataType: 'json',
			error: (error) => console.log(error)
		});
	},

	searchUsers: (query) => {
		return $.ajax({
			url: `/users/search`,
			type: 'get',
			dataType: 'json',
			data: { query },
			error: (error) => console.log(error)
		});
	},

	createTweet: (data) => {
		return $.ajax({
			url: `/tweets`,
			type: 'post',
			dataType: 'json',
			data: data,
			error: (error) => console.log(error)
		});
	},

	grabFeed: (max_created_at) => {
		return $.ajax({
			url: `/feed`,
			type: 'get',
			dataType: 'json',
			data: { max_created_at },
			error: (error) => console.log(error)
		});
	}
};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");

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


/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");

class InfiniteTweets {
	constructor($el) {
		this.infinite = $el;
		this.fetch_link = this.infinite.find('.fetch-more');
		this.fetch_link.on('click', event => this.fetchTweets(event));
		this.maxCreatedAt = null;
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
		} else {
			this.maxCreatedAt = tweets[tweets.length - 1].created_at;
		}
	}
}
module.exports = InfiniteTweets;


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");

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
	}

	handleSuccess(tweet) {
		console.log(tweet);
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


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets.js */ "./frontend/infinite_tweets.js");
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


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
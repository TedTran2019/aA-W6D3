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

	searchUsers: (queryVal) => {
		return $.ajax({
			url: `search`,
			type: 'get',
			dataType: 'json',
			data: queryVal,
			error: (error) => console.log(error)
		});
	}
};

module.exports = APIUtil;

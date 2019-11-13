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
		console.log(query)
		return $.ajax({
			url: `/users/search`,
			type: 'get',
			dataType: 'json',
			data: { query },
			error: (error) => console.log(error)
		});
	}
};

module.exports = APIUtil;

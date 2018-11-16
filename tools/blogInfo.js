const tumblrJs = require('tumblr.js');

module.exports = async (params) => {
	const { blog } = params;

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const response = await tumblr.userInfo();
		let result;
		if (!response || !response.user || !response.user.blogs) {
			result = {
				error: 'Failed to get user blogs info',
			};
		} else {
			const info = response.user.blogs.find(({ name }) => name === blog);
			if (!info) {
				result = {
					error: `Blog ${blog} not found`,
				};
			}
			result = ['title', 'name', 'url', 'admin', 'drafts', 'followers', 'posts', 'primary', 'queue', 'total_posts']
				.reduce((res, field) => Object.assign(res, {[field]: info[field]}), {});
		}
		params.isCli && console.log(result);
		return result;
	} catch (error) {
		console.error(error);
		return error;
	}
}

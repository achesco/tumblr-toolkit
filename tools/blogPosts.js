const tumblrJs = require('tumblr.js');

module.exports = async (params) => {
	const { limit } = params;

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const { posts } = await tumblr.blogPosts(params.blog, limit ? { limit } : {});
		params.isCli && console.log(posts);
		return posts;
	} catch (error) {
		console.error(error);
		return error;
	}
}

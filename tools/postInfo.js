const tumblrJs = require('tumblr.js');

module.exports = async (params) => {
	const { id } = params;

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const { posts } = await tumblr.blogPosts(params.blog, { id });
		const post = (posts || [])[0];
		params.isCli && console.log(post);
		return post;
	} catch (error) {
		console.error(error);
		return error;
	}
}

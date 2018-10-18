const tumblrJs = require('tumblr.js');

module.exports = async (params) => {
	const { id } = params;

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const { posts } = await tumblr.blogPosts(params.blog, { id });
		console.log(posts);
		return (posts || [])[0];
	} catch (error) {
		console.error(error);
		return error;
	}
}

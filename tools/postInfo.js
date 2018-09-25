const tumblrJs = require('tumblr.js');

module.exports = async (params) => {
	const { id } = params;

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const result = await tumblr.blogPosts(params.blog, { id });
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
		return error;
	}
}

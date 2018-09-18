const fs = require('fs');
const tumblrJs = require('tumblr.js');

const methods = {
	photo: 'createPhotoPost',
	video: 'createVideoPost',
};

module.exports = async (params) => {
	const post = {
		state: params.state,
	};

	try {
		post.data64 = fs.readFileSync(params.file, 'base64');
	} catch (error) {
		console.error('Was unable to load file data...');
	}

	if (params.tags) {
		post.tags = params.tags;
	}
	if (params.caption) {
		post.caption = params.caption;
	}

	const tumblr = tumblrJs.createClient({
		credentials: params.credentials,
		returnPromises: true,
	});

	try {
		const result = await tumblr[methods[params.media]](params.blog, post);
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
		return error;
	}
}

module.exports = yargs => {

	yargs
		.describe('b', 'Blog name from where the post')
		.usage('Usage: $0 postInfo -c [file] -b [blog]');
}

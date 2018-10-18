module.exports = yargs => {

	yargs
		.describe('b', 'Blog name to list posts from')
		.usage('Usage: $0 blogPosts -c [file] -b [blog] -l [count]');
}

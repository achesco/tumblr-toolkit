module.exports = yargs => {

	yargs
		.describe('b', 'Blog name to list draft posts from')
		.usage('Usage: $0 blogDrafts -c [file] -b [blog] -l [count]');
}

module.exports = yargs => {

	yargs
		.describe('b', 'Blog name to list queued posts from')
		.usage('Usage: $0 blogQueue -c [file] -b [blog] -l [count]');
}

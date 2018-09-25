module.exports = yargs => {

	yargs
		.describe('b', 'Blog name from where the post')
		.usage('Usage: $0 postInfo -c [file] -b [blog] --id <post-id>')
		.option('id', {
			describe: 'Tumblr post id',
			demandOption: true,
			type: 'string',
		});
}

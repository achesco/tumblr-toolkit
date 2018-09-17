const assert = require('assert');
const cli = require('../lib/cli').cli;

describe('CLI', () => {

	cli
		.command('test')
		.fail(error => { throw error })

	function parse(command, args = []) {
		return cli.parse([
			command,
			'-c', './test/cred.json',
			'-b', 'blogName'
		].concat(args));
	}

	describe('Common params', () => {

		it('should fail on unknown command', () => {
			assert.throws(() => parse('unknown_command'));
		});

		it('parse known command', () => {
			const argv = parse('test');
			assert.equal('test', argv._[0]);
		});

		it('parse blog param', () => {
			const argv = parse('test');
			assert.equal('blogName', argv.blog, argv.b);
		});

		it('parse credentials json', () => {
			const argv = parse('test');
			assert.deepEqual(
				require('./cred.json'),
				argv.credentials,
				argv.c,
			);
		});

		it('set default limit param', () => {
			const argv = parse('test');
			assert.deepEqual(argv.l, argv.limit);
			assert.equal(typeof argv.l, 'number');
			assert.ok(argv.l > 0);
		});

		it('parse limit param', () => {
			const argv = parse('test', ['-l', 999]);
			assert.deepEqual(argv.l, argv.limit, 999);
		});
	});

	describe('Command remove', () => {
		it('shouldn\'t accept non-existent post-type', () => {
			assert.throws(() => { parse('remove', ['--post-type', 'foo']) });
		});
	});

	describe('Command tag-type', () => {
		it('shouldn\'t accept non-existent source', () => {
			assert.throws(() => { parse('tag-type', ['-s', 'foo']) });
		});
		it('shouldn\'t accept non-existent post-type', () => {
			assert.throws(() => { parse('tag-type', ['--post-type', 'foo']) });
		});
	});

});

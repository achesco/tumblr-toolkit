const assert = require('assert');
const cli = require('../lib/cli').cli;

describe('CLI', function() {

    cli
         .fail(function () {
            throw Error;
        })

    function parse(command, args = []) {
        return cli.parse([
                command,
                '-c', './test/cred.json',
                '-b', 'blogName'
            ].concat(args));
    }

    describe('Common params', function () {
        const argv = parse('cmd');
        const argvAll = parse('cmd', ['-s', 'queue', '-l', 66]);

        it('command passed', function () {
            assert.equal('cmd', argv._[0]);
        });
        it('credentials parsed', function () {
            assert.equal('credentilas_object_here', argv.c);
        });
        it('params passed', function () {
            assert.ok(
                argvAll.b === 'blogName' &&
                argvAll.l === 66 &&
                true
            );
        });
        it('aliases should work', function () {
            assert.ok(
                argvAll.c === argvAll.credentilas &&
                argvAll.b === argvAll.blog &&
                argvAll.l === argvAll.limit &&
                true
            );
        });
    });

    describe('Command remove', function () {
        it('shouldn\'t accept non-existent post-type', function () {
            assert.throws(() => { parse('remove', ['--post-type', 'foo']) });
        });
    });

    describe('Command tag-type', function () {
        it('shouldn\'t accept non-existent source', function () {
            assert.throws(() => { parse('tag-type', ['-s', 'foo']) });
        });
        it('shouldn\'t accept non-existent post-type', function () {
            assert.throws(() => { parse('tag-type', ['--post-type', 'foo']) });
        });
    });
    
});

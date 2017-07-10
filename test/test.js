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

        it('command passed', function () {
            assert.equal('cmd', argv._[0]);
        });
        it('blog param passed', function () {
            assert.equal('blogName', argv.b);
        });
        it('credentials parsed', function () {
            assert.equal('credentilas_object_here', argv.c);
        });
    });

    describe('Command clean', function () {
        it('should accept video post-type', function () {
            assert.equal('video', parse('clean', ['--post-type', 'video']).postType);
        });
        it('shouldn\'t accept other then video post-type', function () {
            assert.throws(() => { parse('clean', ['--post-type', 'audio']) });
        });
    });

    describe('Command remove', function () {
        it('shouldn\'t accept non-existent post-type', function () {
            assert.throws(() => { parse('remove', ['--post-type', 'foo']) });
        });
    });

    describe('Command tag-type', function () {
        it('shouldn\'t accept non-existent post-type', function () {
            assert.throws(() => { parse('tag-type', ['--post-type', 'foo']) });
        });
    });

});

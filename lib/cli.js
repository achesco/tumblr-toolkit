const options = {

    c: {
        alias: 'credentilas',
        describe: 'Tumblr credentilas JSON-file path',
        demandOption: true,
        coerce: path => require(require('path').resolve(path)),
    },

    b: {
        alias: 'blog',
        demandOption: true,
        type: 'string',
        describe: 'Blog name'
    },

    l: {
        alias: 'limit',
        default: Number.POSITIVE_INFINITY,
        describe: 'Limit queried posts count',
        type: 'number'
    },

    s: {
        alias: 'source',
        describe: 'Source to process (use blog posts if not present)',
        default: 'blog',
        choices: ['blog', 'queue']
    },

    postTag: {
        describe: 'Filter posts by tag',
        type: 'string'
    },

    postId: {
        describe: 'Get post with ID',
        type: 'string'
    },

    postTypes: {
        describe: 'Filter by post type',
        choices: ['text', 'quote', 'link', 'answer', 'video', 'audio', 'photo', 'chat'],
    },

    cleanCode: {
        default: 403,
        describe: 'HTTP response code to clean',
        type: 'number'
    },

    cleanInvert: {
        default: false,
        describe: 'Invert clean logic - keep only with code',
        type: 'boolean'
    },

    removeDryRun: {
        default: true,
        describe: 'Dry-run: only print, don\'t remove',
        type: 'boolean'
    },

    tagTypeGif: {
        describe: 'How to treat GIFs',
        default: 'same',
        choices: ['same', 'add', 'replace']
    }
};

module.exports = {

    cli: require('yargs')

        .command('clean', 'Clean unavailable videos', yargs => {
            yargs
                .describe('b', 'Blog name to clean-up')

                .group(['clean-code', 'clean-invert'], 'Cleanup options:')
                .option('clean-code', options.cleanCode)
                .option('clean-invert', options.cleanInvert)

                .group(['post-tag', 'post-id'], 'Filter options:')
                .option('post-tag', options.postTag)
                .option('post-id', options.postId)

                .usage('Usage: $0 clean -c [file] -b [blog] [options]');
        })

        .command('remove', 'Remove found videos (be careful!)', yargs => {
            yargs
                .describe('b', 'Blog name to remove through')

                .group(['s', 'remove-dry-run'], 'Remove options:')
                .option('s', options.s)
                .option('remove-dry-run', options.removeDryRun)

                .group(
                    ['post-type', 'post-tag', 'post-id'],
                    'Filter options (unavailable for queue source):'
                )
                .option('post-type', options.postTypes)
                .option('post-tag', options.postTag)
                .option('post-id', options.postId)

                .usage('Usage: $0 remove [-s [blog|queue]] -c [file] -b [blog] [options]');
        })

        .command('tag-type', 'Set tag based on post type', yargs => {
            yargs
                .describe('b', 'Blog name to tag posts by type')

                .group(['s', 'tag-type-gif'], 'Tag-type options:')
                .option('s', options.s)
                .option('tag-type-gif', options.tagTypeGif)

                .group(
                    ['post-type', 'post-tag', 'post-id'],
                    'Filter options (unavailable for queue source):'
                )
                .option('post-type', options.postTypes)
                .option('post-tag', options.postTag)
                .option('post-id', options.postId)

                .usage('Usage: $0 tag-type [-s [blog|queue]] -c [file] -b [blog] [options]');
        })

        .demandCommand()

        .option('c', options.c)
        .option('b', options.b)
        .option('l', options.l)

        .version(() => {
            return require('../package.json').version
        })
        .alias('v', 'version')

        .usage('Usage: $0 <command> -c [file] -b [blog] [options]')
}

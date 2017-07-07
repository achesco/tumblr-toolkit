const postTypes = [
    'text', 'quote', 'link', 'answer', 'video', 'audio', 'photo', 'chat'
];

module.exports = require('yargs')
    .command('clean', 'Clean unavailable videos', yargs => {
        yargs
            .option('clean-code', {
                default: 403,
                describe: 'HTTP response code to clean',
                type: 'number'
            })
            .option('clean-invert', {
                default: false,
                describe: 'Invert clean logic - keep only with code',
                type: 'boolean'
            })
            .option('post-type', {
                describe: 'Media type to clean',
                default: 'video',
                choices: ['video']
            })
            .describe('b', 'Blog name to clean-up');
    })
    .command('remove', 'Remove found videos (be careful!)', yargs => {
        yargs
            .option('remove-dry-run', {
                default: true,
                describe: 'Dry-run: only print, don\'t remove',
                type: 'boolean'
            })
            .option('post-type', {
                describe: 'Filter by post type',
                choices: postTypes.concat(undefined)
            })
            .describe('b', 'Blog name to remove through');
    })
    .option('b', {
        alias: 'blog',
        demandOption: true,
        type: 'string',
        describe: 'Blog name'
    })
    .option('c', {
        alias: 'credentilas',
        describe: 'Tumblr credentilas JSON-file path',
        demandOption: true,
        coerce: path => require(require('path').resolve(path)),
    })
    .option('l', {
        alias: 'limit',
        default: Number.POSITIVE_INFINITY,
        describe: 'Limit posts count',
        type: 'number'
    })
    .option('post-tag', {
        describe: 'Filter posts by tag',
        type: 'string'
    })
    .option('post-id', {
        describe: 'Get post with ID',
        type: 'string'
    })
    // .option('post-type', {
    //     describe: 'Filter by post type'
    // })

    .version(() => {
        return require('../package.json').version
    })
    .usage('Usage: $0 <command> -b [blog] -c [file] [-l [num]] [options]')
    .argv;

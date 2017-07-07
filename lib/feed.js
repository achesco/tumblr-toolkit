const tumblrJs = require('tumblr.js');
const sliceSize = 4;
const requiredOptions = [
    'credentials', 'blog'
];
const supportedParams = [
    'type', 'tag', 'id', 'reblog_info', 'notes_info', 'filter'
];

function getInitialParams(options) {
    return supportedParams.reduce((params, param) => {
        if (options[param] !== undefined && options.hasOwnProperty(param)) {
            params[param] = options[param];
        }
        return params;
    }, {});
}

module.exports = async function(cli, processor) {

    const options = {
        blog: cli.b,
        credentials: cli.c,
        limit: cli.l,
        type: cli.postType,
        tag: cli.postTag,
        id: cli.postId
    }

    requiredOptions.forEach(option => {
        if (!options[option]) {
            throw `Option '${option}' required.`
        }
    })

    if (typeof processor !== 'function') {
        throw 'Processor function param required.';
    }

    const tumblr = tumblrJs.createClient({
        credentials: options.credentials,
        returnPromises: true
    });

    let params = getInitialParams(options);
    let offset = 0;
    let countLeft = options.limit;
    let n = 0;
    // Tumblr may provide duplicates handling offset
    // especially with 'tag' filter option
    let dedupHash = {};
    // need to accumulate posts first, because processor func could
    // remove posts cause broken listing
    let postsQueue = [];

    while (true) {
        let limit = Math.min(sliceSize, countLeft);
        let slice = await tumblr.blogPosts(
            options.blog,
            Object.assign(params, {offset, limit})
        );
        let sliceLength = slice.posts.length;
        console.log(`Requested ${limit} posts starting from ${offset}`);
        let dedupCount = 0;
        if (sliceLength) {
            let posts = slice.posts.forEach(post => {
                if (!dedupHash[post.id]) {
                    dedupHash[post.id] = true;
                    postsQueue.push(post);
                    dedupCount++;
                }
            });
        }
        countLeft -= sliceLength;
        offset += sliceLength;
        if (isFinite(countLeft) ? countLeft <= 0 || !dedupCount : !dedupCount) {
            break;
        }
    }
    console.log('Total post queued for processing: ' + postsQueue.length);
    if (postsQueue.length) {
        let n = 0;
        for (let post of postsQueue) {
            await processor.call({tumblr}, post, n++);
        }
    }
}

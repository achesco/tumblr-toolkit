
const feed = require('../lib/feed');

module.exports = function (cli) {
    const blogName = cli.b;

    feed(cli, process);

    async function process (post, n) {
        const id = post.id,
            type = post.type,
            postTags = post.tags,
            postTagsCount = postTags.length,
            tags = [];

        if (type === 'photo' && cli.tagTypeGif !== 'same') {
            let hasGif = post.photos.some(photo => {
                return String(photo.original_size.url)
                    .toLowerCase().endsWith('.gif');
            });

            if (hasGif) {
                if (cli.tagTypeGif === 'replace') {
                    let idx = postTags.indexOf('photo');
                    if (idx >= 0) {
                        postTags.splice(idx, 1);
                    }
                } else {
                    tags.push(type);
                }
                tags.push('gif');
            } else {
                tags.push(type);
            }
        } else {
            tags.push(type);
        }

        let hasNewTags = postTags.length === 0 || postTagsCount !== postTags.length
            || tags.some(tag => {
                return postTags.indexOf(tag) === -1;
            });

        if (hasNewTags) {
            Array.prototype.push.apply(postTags, tags);
            console.log('Updating post tags', id);
            await this.tumblr.editPost(blogName, {
                id: id,
                tags: postTags.join(',')
            });
        } else {
            console.log('Post already has type tag', id);
        }
    }
}

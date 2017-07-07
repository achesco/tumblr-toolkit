
const feed = require('../lib/feed');

module.exports = function (cli) {
    const blogName = cli.b;

    feed(cli, process);

    async function process (post, n) {
        let id = post.id;

        if (cli.removeDryRun) {
            console.log('Would remove ' + id);
        } else {
            console.log('Removing ' + id);
            await this.tumblr.deletePost(blogName, id);
        }
    }
}

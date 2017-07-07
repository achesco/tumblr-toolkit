
const feed = require('./lib/feed');
const fetch = require('node-fetch');

module.exports = function (cli) {
    const blogName = cli.b;

    feed(cli, process);

    async function process (post, n) {
        let resp = await fetch(post.video_url, {method: 'HEAD'}),
            id = post.id;

        if (checkShuldDelete(resp.status)) {
            console.log('Cleaning ' + id);
            await this.tumblr.deletePost(blogName, id);
        } else {
            console.log('Status is ' + resp.status);
        }
    }

    function checkShuldDelete (status) {
        return cli.cleanInvert ?
            status !== cli.cleanCode :
            status === cli.cleanCode;
    }
}

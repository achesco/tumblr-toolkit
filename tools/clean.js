const fetch = require('node-fetch');

module.exports = function (cli) {

    cli.postType = 'video';
    cli.s = cli.source = 'blog';

    function checkShouldDelete (status) {
        return cli.cleanInvert ?
            status !== cli.cleanCode :
            status === cli.cleanCode;
    }

    return {
        cli,
        async processor (post, n) {
            let resp = await fetch(post.video_url, {method: 'HEAD'}),
                id = post.id;

            if (checkShouldDelete(resp.status)) {
                console.log('Cleaning ' + id);
                await this.tumblr.deletePost(cli.b, id);
            } else {
                console.log('Status is ' + resp.status);
            }
        }
    }
}

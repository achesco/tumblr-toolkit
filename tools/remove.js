module.exports = function (cli) {
    return {
        cli,
        async processor (post, n) {
            let id = post.id;
            if (cli.removeDryRun) {
                console.log('Would remove ' + id);
            } else {
                console.log('Removing ' + id);
                await this.tumblr.deletePost(cli.b, id);
            }
        }
    }
}

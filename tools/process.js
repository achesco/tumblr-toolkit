module.exports = function (cli) {
    const userProcessor = new Function('post', 'codes', cli.processCode);
    const codes = {
        DO_NOTHING: undefined,
        UPDATE_POST: 1,
        REMOVE_POST: 2
    };
    Object.freeze(codes);

    return {
        cli,
        async processor (post, n) {
            const id = post.id;
            const code = await userProcessor(post, codes);

            if (code === codes.UPDATE_POST) {
                console.log('Updating post', post.id);
                await this.tumblr.editPost(cli.b, post);
            } else if (code === codes.REMOVE_POST) {
                console.log('Remvoing post', post.id);
                await this.tumblr.deletePost(cli.b, id);
            } else {
                console.log('Do nothing for', post.id);
            }
        }
    }
}

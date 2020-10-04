const Post = require('../../models/post');

module.exports = async function (obj, { }, context, info) {
    req = context.req;
    req.isAuth = true;
    req.userId = "5f6c9d362d6631017c08d9ad";
    if (!req.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
    }
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate('creator');
    return {
        posts: posts.map(p => {
            return {
                ...p._doc,
                _id: p._id.toString(),
                createdAt: p.createdAt.toISOString(),
                updatedAt: p.updatedAt.toISOString()
            };
        })
    };
};

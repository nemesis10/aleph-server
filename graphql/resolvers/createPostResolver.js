const validator = require('validator');

const io = require('../../socket');
const User = require('../../models/User/User');
const Post = require('../../models/post');

module.exports = async function (obj, { postInput }, context, info) {
    req = context.req;
    req.isAuth = true;
    req.userId = "5f6c9d362d6631017c08d9ad";
    if (!req.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
    }
    const errors = [];
    if (
        validator.isEmpty(postInput.title) ||
        !validator.isLength(postInput.title, { min: 5 })
    ) {
        errors.push({ message: 'Title is invalid.' });
    }
    if (
        validator.isEmpty(postInput.content) ||
        !validator.isLength(postInput.content, { min: 5 })
    ) {
        errors.push({ message: 'Content is invalid.' });
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.code = 422;
        throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
        const error = new Error('Invalid user.');
        error.code = 401;
        throw error;
    }
    const post = new Post({
        title: postInput.title,
        content: postInput.content,
        imageUrl: postInput.imageUrl,
        creator: user
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    await user.save();
    io.getIO().emit('posts', {
        action: 'create',
        post: { ...post._doc, creator: { _id: req.userId, name: user.name } }
    });
    return {
        ...createdPost._doc,
        _id: createdPost._id.toString(),
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString()
    };
}
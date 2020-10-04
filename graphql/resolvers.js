
const loginUser = require('./resolvers/loginUserResolver');
const createUser = require('./resolvers/createUserResolver');
const sendOtp = require('./resolvers/sendOtpResolver');
const resendOtp = require('./resolvers/resendOtpResolver');
const verifyOtp = require('./resolvers/verifyOtpResolver');
const createPost = require('./resolvers/createPostResolver');
const getPosts = require('./resolvers/getPostsResolver');

module.exports = {
    Query: {
        loginUser: loginUser,
        sendOtp: sendOtp,
        resendOtp: resendOtp,
        verifyOtp: verifyOtp,
        getPosts: getPosts,
        //hello: () => { return "ss"; }
    },
    Mutation: {
        createUser: createUser,
        createPost: createPost,
    }
};


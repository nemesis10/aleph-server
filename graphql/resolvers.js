const loginUser = require("./resolvers/loginUserResolver");
const createUser = require("./resolvers/createUserResolver");
const sendOtp = require("./resolvers/sendOtpResolver");
const resendOtp = require("./resolvers/resendOtpResolver");
const verifyOtp = require("./resolvers/verifyOtpResolver");
const createPost = require("./resolvers/createPostResolver");
const getPosts = require("./resolvers/getPostsResolver");
const groupResolver = require("./resolvers/Group");

module.exports = {
  Query: {
    loginUser: loginUser,
    sendOtp: sendOtp,
    resendOtp: resendOtp,
    verifyOtp: verifyOtp,
    getPosts: getPosts,
    //hello: () => { return "ss"; }
    getGroups: groupResolver.get.all,
    getGroup: groupResolver.get.one,
  },
  Mutation: {
    createUser: createUser,
    createPost: createPost,

    createGroup: groupResolver.create,
    updateGroup: groupResolver.update.group,
    addUserToGroup: groupResolver.update.addUser,
    removeUserFromGroup: groupResolver.update.deleteUser,
    changeGroupAdmin: groupResolver.update.changeAdmin,
    deleteGroup: groupResolver.delete,
  },
};

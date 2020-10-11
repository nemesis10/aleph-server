const loginUser = require("./resolvers/loginUserResolver");
const createUser = require("./resolvers/createUserResolver");
const sendOtp = require("./resolvers/sendOtpResolver");
const resendOtp = require("./resolvers/resendOtpResolver");
const verifyOtp = require("./resolvers/verifyOtpResolver");
const createPost = require("./resolvers/createPostResolver");
const getPosts = require("./resolvers/getPostsResolver");
const addCreationBucket = require("./resolvers/profile/creationBucket/addCreationBucketResolver");
const getCreationBucket = require("./resolvers/profile/creationBucket/getCreationBucketResolver");
const addProfile = require("./resolvers/profile/addProfileResolver");
const getProfile = require("./resolvers/profile/getProfileResolver");
const addAchievements = require("./resolvers/profile/achievement/addAchievementResolver");
const deleteProfile = require("./resolvers/profile/deleteProfileResolver");
const addFavPeople = require("./resolvers/profile/favPeople/addFavPeopleResolver");
const addFavQuotes = require("./resolvers/profile/favQuotes/addFavQuotesResolver");
const addGoodAt = require("./resolvers/profile/goodAt/addGoodAtResolver");
const updateCreationBucket = require("./resolvers/profile/creationBucket/updateCreationBucketResolver");
const getAchievement = require("./resolvers/profile/achievement/getAchievementResolver");
const updateAchievement = require("./resolvers/profile/achievement/updateAchievementResolver");
const groupResolver = require("./resolvers/Group");
const classroomResolver = require("./resolvers/Classroom");

module.exports = {
  Query: {
    loginUser: loginUser,
    sendOtp: sendOtp,
    resendOtp: resendOtp,
    verifyOtp: verifyOtp,
    getPosts: getPosts,

    getCreationBucket: getCreationBucket,
    getProfile: getProfile,
    getAchievement: getAchievement,
    //hello: () => { return "ss"; }
    ...groupResolver.Query,
    ...classroomResolver.Query,
  },
  Mutation: {
    createUser: createUser,
    createPost: createPost,

    addCreationBucket: addCreationBucket,
    addProfile: addProfile,
    addAchievements: addAchievements,
    deleteProfile: deleteProfile,
    addFavPeople: addFavPeople,
    addFavQuotes: addFavQuotes,
    addGoodAt: addGoodAt,
    updateCreationBucket: updateCreationBucket,
    updateAchievement: updateAchievement,

    ...groupResolver.Mutation,
    ...classroomResolver.Mutation,
  },
};

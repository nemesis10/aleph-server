const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const resolvers = require("./resolvers");

const loginUserSchema = require("./schema/loginUserSchema");
const createUserSchema = require("./schema/createUserSchema");
const createPostSchema = require("./schema/createPostSchema");
const getPostsSchema = require("./schema/getPostsSchema");

const groupSchema = require("./schema/groupSchema");

const classroomSchema = require("./schema/classroomSchema");

const sendOtp = require("./schema/sendOtpSchema");
const resendOtp = require("./schema/resendOtpSchema");
const verifyOtp = require("./schema/verifyOtpSchema");

const addCreationBucketSchema = require("./schema/profile/creationBucket/addCreationBucketSchema");
const getCreationBucketSchema = require("./schema/profile/creationBucket/getCreationBucketSchema");
const addProfile = require("./schema/profile/addProfileSchema");
const getProfile = require("./schema/profile/getProfileSchema");
const addAchievements = require("./schema/profile/achievement/addAchievementsSchema");
const deleteProfile = require("./schema/profile/deleteProfileSchema");
const addFavPeople = require("./schema/profile/favPeople/addFavPeopleSchema");
const addFavQuotes = require("./schema/profile/favQuotes/addFavQuotesSchema");
const addGoodAt = require("./schema/profile/goodAt/addGoodAtSchema");
const updateCreationBucket = require("./schema/profile/creationBucket/updateCreationBucketSchema");
const getAchievement = require("./schema/profile/achievement/getAchievementSchema");
const updateAchievement = require("./schema/profile/achievement/updateAchievementSchema");

const types = [
  loginUserSchema,
  createUserSchema,
  createPostSchema,
  getPostsSchema,
  sendOtp,
  verifyOtp,
  resendOtp,
  groupSchema,
  classroomSchema,
  addCreationBucketSchema,
  getCreationBucketSchema,
  addProfile,
  getProfile,
  addAchievements,
  deleteProfile,
  addFavPeople,
  addFavQuotes,
  addGoodAt,
  updateCreationBucket,
  getAchievement,
  updateAchievement,
];

const typeDefs = mergeTypeDefs(types, { all: true });

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

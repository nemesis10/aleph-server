const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const resolvers = require('./resolvers');

const loginUserSchema = require('./schema/loginUserSchema');
const createUserSchema = require('./schema/createUserSchema');
const createPostSchema = require('./schema/createPostSchema');
const getPostsSchema = require('./schema/getPostsSchema');

const sendOtp = require('./schema/sendOtpSchema');
const resendOtp = require('./schema/resendOtpSchema');
const verifyOtp = require('./schema/verifyOtpSchema');

const types = [
    loginUserSchema,
    createUserSchema,
    createPostSchema,
    getPostsSchema,
    sendOtp,
    verifyOtp,
    resendOtp,
];

const typeDefs = mergeTypeDefs(types, { all: true });

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});




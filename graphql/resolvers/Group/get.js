const { default: validator } = require("validator");
const Group = require("./../../../models/Group");

exports.one = (root, { groupId }) => {
  return Group.findById(groupId).populate("users.user");
};

exports.all = (root, {}, context) => {
  let { req } = context;
  req.isAuth = true;
  if (process.env.DEV) req.userId = "5f6c9d362d6631017c08d9ad";

  if (!req.isAuth && !process.env.DEV) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const userId = req.userId;

  return Group.find({
    users: { $elemMatch: { user: userId } },
  }).populate("users.user");
};

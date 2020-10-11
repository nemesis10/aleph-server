const { default: validator } = require("validator");
const Group = require("./../../../models/Group");

exports.one = (root, { groupId }) => {
  return Group.findById(groupId).populate("users.user");
};

exports.all = (root, {}, context) => {
  let { req } = context;
  req.isAuth = true;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const userId = req.userId;

  return Group.find({
    users: { $elemMatch: { user: userId } },
  }).populate("users.user");
};

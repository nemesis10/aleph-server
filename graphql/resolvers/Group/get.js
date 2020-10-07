const Group = require("./../../../models/Group");

exports.one = (root, { groupId }) => {
  return Group.findById(groupId).populate({
    path: "users.user",
    model: "User",
  });
};

exports.all = (root, { userId }) => {
  return Group.find({
    users: { $elemMatch: { user: userId } },
  }).populate({
    path: "users.user",
    model: "User",
  });
};

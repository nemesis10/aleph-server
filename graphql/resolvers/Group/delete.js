const Group = require("./../../../models/Group");
const { invalidString } = require("../../../util/validate");

module.exports = async (root, { groupId }, context) => {
  let { req } = context;
  req.isAuth = true;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(groupId)) {
    errors.push({ message: "Group ID is invalid." });
  }

  const adminId = req.userId;
  const groupUsers = await Group.find({ _id: groupId });
  const isUserAdmin = groupUsers[0].users.some(({ user, isAdmin }) => {
    return isAdmin && user.toString() === adminId.toString();
  });
  if (!isUserAdmin) {
    errors.push({ message: "User is not admin" });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  return Group.findByIdAndDelete(groupId);
};

const Group = require("./../../../../models/Group");
const { invalidString } = require("../../../../util/validate");

//---------------------------------------------------------
exports.byCode = (root, { code }, context) => {
  let { req } = context;
  if (process.env.DEV) req.userId = "5f6c9d362d6631017c08d9ad";

  if (!req.isAuth && !process.env.DEV) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(code)) {
    errors.push({ message: "Invite Code is invalid." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  const userId = req.userId;

  return Group.updateOne(
    { inviteCode: code },
    { $push: { users: { user: userId } } }
  ).exec();
};

//---------------------------------------------------------

exports.byAdmin = async (root, { groupId, userId }, context) => {
  let { req } = context;

  if (process.env.DEV) req.userId = "5f6c9d362d6631017c08d9ad";

  if (!req.isAuth && !process.env.DEV) {
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
  const users =
    typeof userId === "object"
      ? userId.map((id) => ({ user: id }))
      : { user: userId };
  return Group.findByIdAndUpdate(groupId, { $push: { users } }).exec();
};

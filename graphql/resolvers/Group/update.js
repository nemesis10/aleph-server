const Group = require("./../../../models/Group");

exports.group = (root, { groupId, userInput }) => {
  return Group.findByIdAndUpdate(groupId, userInput).exec();
};

exports.addUser = (root, { groupId, userId }) => {
  const users =
    typeof userId === "object"
      ? userId.map((id) => ({ user: id }))
      : { user: userId };
  return Group.findByIdAndUpdate(groupId, { $push: { users } }).exec();
};

exports.deleteUser = (root, { groupId, userId }) => {
  return Group.findByIdAndUpdate(groupId, {
    $pull: { users: { $elemMatch: { user: userId } } },
  }).exec();
};

exports.changeAdmin = (root, { groupId, userId, remove }) => {
  return Group.updateOne(
    { _id: groupId, users: { $elemMatch: { user: userId } } },
    {
      $set: { "users.$.isAdmin": Boolean(!remove) },
    }
  ).exec();
};

const Group = require("./../../../models/Group");

module.exports = async (root, { userInput, userId }) => {
  Object.assign(userInput, {
    users: [
      {
        user: userId,
        isAdmin: true,
      },
    ],
    inviteCode: (
      new Date().getTime() - -Math.floor(Math.random() * 10e4)
    ).toString(36),
  });
  const newGroup = new Group(userInput);
  return newGroup.save();
};

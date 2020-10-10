const Group = require("./../../../models/Group");
const { invalidString } = require("../../../util/validate");

module.exports = async (root, { userInput }, context) => {
  let { req } = context;
  req.isAuth = true;
  req.userId = "5f6c9d362d6631017c08d9ad";
  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(userInput.name)) {
    errors.push({ message: "Group Name is invalid." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  const userId = req.userId;

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

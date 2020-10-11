const Classroom = require("./../../../models/Classroom");
const User = require("./../../../models/User/User");
const { invalidString } = require("../../../util/validate");
const newInviteCode = require("../../../util/newInviteCode");

module.exports = async (root, { userInput }, context) => {
  let { req } = context;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(userInput.name)) {
    errors.push({ message: "Classroom Name is invalid." });
  }

  const userId = req.userId;
  const user = await User.findById(userId).exec();
  // Check creator type
  if (!["teacher", "institute"].includes(user.userType)) {
    errors.push({ message: "User is not teacher or institute." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  Object.assign(userInput, {
    participants: {
      teachers: [userId],
    },
    inviteCode: newInviteCode(),
  });
  const newClassroom = new Classroom(userInput);
  return newClassroom.save();
};

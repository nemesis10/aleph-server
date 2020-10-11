const Classroom = require("../../../../models/Classroom");
const User = require("../../../../models/User/User");
const { invalidString } = require("../../../../util/validate");

module.exports = async (root, { code }, context) => {
  let { req } = context;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(code)) {
    errors.push({ message: "Invite Code is invalid." });
  }
  let classRoom = await Classroom.find({ inviteCode: code });

  if (classRoom.length !== 1) {
    errors.push({ message: "Invite Code doesnot exists" });
  }
  const userId = req.userId;
  const user = await User.findById(userId);
  switch (user.userType) {
    case "student":
      classRoom[0].participants.students.push({ user: userId });
      break;
    case "teacher":
      classRoom[0].participants.teachers.push(userId);
      break;
    default:
      errors.push({ message: "User Type is invalid" });
      break;
  }
  if (errors.length > 0) {
    const error = new Error(JSON.stringify(errors));
    error.data = errors;
    error.code = 422;
    throw error;
  } else {
    return classRoom[0].save();
  }
};

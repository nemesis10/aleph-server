const Classroom = require("./../../../../models/Classroom");

const { invalidString } = require("../../../../util/validate");
const newInviteCode = require("../../../../util/newInviteCode");

module.exports = async (root, { classroomId }, context) => {
  let { req } = context;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const errors = [];
  if (invalidString(classroomId)) {
    errors.push({ message: "Classroom ID is invalid." });
  }

  const userId = req.userId;
  const classroomUsers = await Classroom.find({
    _id: classroomId,
    $or: [
      {
        "participants.students": {
          $elemMatch: { user: userId, isAdmin: true },
        },
      },
      { "participants.teachers": userId },
    ],
  });
  if (!classroomUsers.length) {
    errors.push({ message: "User is not admin or not a teacher" });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  let inviteCode = newInviteCode();
  Classroom.findByIdAndUpdate(classroomId, { inviteCode });
  return inviteCode;
};

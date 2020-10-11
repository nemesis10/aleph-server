const Classroom = require("../../../../models/Classroom");
const { invalidString } = require("../../../../util/validate");

module.exports = async (root, { classroomId, userId }, context) => {
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

  const currentUserId = req.userId;
  const classroomUsers = await Classroom.find({
    _id: classroomId,
    $or: [
      {
        "participants.students": {
          $elemMatch: { user: currentUserId, isAdmin: true },
        },
      },
      { "participants.teachers": currentUserId },
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
  const users =
    typeof userId === "object"
      ? userId.map((id) => ({ user: id }))
      : { user: userId };
  return Classroom.findByIdAndUpdate(classroomId, { $push: { users } }).exec();
};

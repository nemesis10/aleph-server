const Classroom = require("../../../models/Classroom");

exports.one = (root, { classroomId }) => {
  const errors = [];
  if (invalidString(classroomId)) {
    errors.push({ message: "Classroom ID is invalid." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  return Classroom.findById(classroomId)
    .populate("participants.teachers")
    .populate("participants.students");
};

exports.all = (root, {}, context) => {
  let { req } = context;

  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.code = 401;
    throw error;
  }
  const userId = req.userId;
  return Classroom.find({
    $or: [
      { "participants.students": { $elemMatch: { user: userId } } },
      { "participants.teachers": userId },
    ],
  })
    .populate("participants.teachers")
    .populate("participants.students");
};

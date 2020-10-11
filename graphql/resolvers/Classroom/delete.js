const Classroom = require("./../../../models/Classroom");
const { invalidString } = require("../../../util/validate");

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

  // const adminId = req.userId;
  // const classroomUsers = await Classroom.find({ _id: classroomId });
  // const isUserAdmin = classroomUsers[0].users.some(({ user, isAdmin }) => {
  //   return isAdmin && user.toString() === adminId.toString();
  // });
  // if (!isUserAdmin) {
  //   errors.push({ message: "User is not admin" });
  // }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }
  return Classroom.findByIdAndDelete(classroomId);
};

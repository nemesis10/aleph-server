const Classroom = require("./../../../../models/Classroom");

module.exports = (root, { classroomId, userInput }) => {
  return Classroom.findByIdAndUpdate(classroomId, userInput).exec();
};

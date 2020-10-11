let Query = {
  getClassrooms: require("./get").all,
  getClassroom: require("./get").one,
};
let Mutation = {
  // unenrollFromClassroom
  createClassroom: require("./create"),
  updateClassroom: require("./update/update"),
  changeClassroomAdmin: require("./update/editAdmin"),
  revokeClassroomCode: require("./update/revokeCode"),
  addUserToClassroom: require("./update/addByAdmin"),
  addUserToClassroomViaCode: require("./update/addByCode"),
  removeUserFromClassroom: require("./update/removeUser"),
  deleteClassroom: require("./delete"),
};
module.exports = {
  Query,
  Mutation,
};

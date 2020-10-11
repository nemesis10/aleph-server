let groupResolver = {
  create: require("./create"),
  delete: require("./delete"),
  get: require("./get"),
  editAdmin: require("./update/editAdmin"),
  addUser: require("./update/addUser"),
  removeUser: require("./update/removeUser"),
  revokeCode: require("./update/revokeCode"),
  update: require("./update/update"),
};
let Query = {
  getGroups: groupResolver.get.all,
  getGroup: groupResolver.get.one,
};
let Mutation = {
  createGroup: groupResolver.create,
  updateGroup: groupResolver.update,
  changeGroupAdmin: groupResolver.editAdmin,
  revokeGroupCode: groupResolver.revokeCode,
  addUserToGroup: groupResolver.addUser.byAdmin,
  addUserViaCode: groupResolver.addUser.byCode,
  removeUserFromGroup: groupResolver.removeUser,
  deleteGroup: groupResolver.delete,
};
module.exports = {
  Query,
  Mutation,
};

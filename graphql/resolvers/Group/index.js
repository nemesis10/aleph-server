module.exports = {
  create: require("./create"),
  delete: require("./delete"),
  get: require("./get"),
  editAdmin: require("./update/editAdmin"),
  addUser: require("./update/addUser"),
  removeUser: require("./update/removeUser"),
  revokeCode: require("./update/revokeCode"),
  update: require("./update/update"),
};

const Group = require("./../../../../models/Group");

module.exports = (root, { groupId, userInput }) => {
  return Group.findByIdAndUpdate(groupId, userInput).exec();
};

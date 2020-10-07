const Group = require("./../../../models/Group");

module.exports = (root, { groupId }) => {
  return Group.findByIdAndDelete(groupId);
};

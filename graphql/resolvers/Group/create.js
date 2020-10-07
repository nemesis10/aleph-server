const Group = require("./../../../models/Group");

module.exports = async (root, { userInput, userId }) => {
  Object.assign(userInput, { users: [{ user: userId, isAdmin: true }] });
  const newGroup = new Group(userInput);
  return newGroup.save();
};
// let a = new User({
//   name: "asf",
//   userType: "student",
//   mobileno: 98765432,
//   username: "demo",
//   password: "hehhe",
//   email: "test@test.in",
//   schoolusername: "nitkkr",
// }).save();
// a.then((v) => {
//   console.log(a);
// });

// 5f7d4311c16c922df08f086c

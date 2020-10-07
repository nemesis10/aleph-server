const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  users: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      isAdmin: { type: Boolean, default: false },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date,
  },

  //   posts: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "posts",
  //     },
  //   ],
});

module.exports = mongoose.model("Group", userSchema);

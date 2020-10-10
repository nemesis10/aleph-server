const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
      isAdmin: { type: Boolean, default: false },
    },
  ],
  groupType: {
    type: String,
    enum: ["open", "closed", "secret"],
    required: true,
  },
  inviteCode: {
    type: String,
    required: true,
  },
  mute: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    // required: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date,
  },
});

module.exports = mongoose.model("Group", groupSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const classroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      // required: true,
    },
    subject: {
      type: String,
      // required: true,
    },
    icon: {
      type: String,
    },
    participants: {
      teachers: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true,
        },
      ],
      students: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
          },
          isAdmin: {
            type: Boolean,
            default: false,
          },
          addedAt: { type: Date, default: new Date().getTime().toString() },
        },
      ],
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);

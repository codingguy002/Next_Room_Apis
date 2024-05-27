const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    latestMessage: {
      type: {},
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);

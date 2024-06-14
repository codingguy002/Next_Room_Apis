const mongoose = require("mongoose");

const TransectionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Transection", TransectionSchema);

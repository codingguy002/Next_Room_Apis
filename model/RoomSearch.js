const mongoose = require("mongoose");

const RoomSearchSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    preferable_location: {
      type: String,
      required: [true, "preferable_location is required"],
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
    },
    budget_type: {
      type: String,
      enum: ["weekly", "monthly"],
      required: [true, "budget_type is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    accomodation_for: {
      type: String,
      enum: ["Myself", "Kids", "Couple"],
      required: [true, "select myself, kids, couple"],
    },
    ready_to_move: {
      type: Date,
      required: [true, "date is required"],
    },
    minimum_stay: {
      type: Number,
      required: [true, "Number of Stay is required"],
    },
    stay_time: {
      type: String,
      enum: ["days", "week", "month"],
      required: [true, "Please select stay time"],
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
    },
    pets: {
      type: String,
      enum: ["Yes", "No"],
    },
    noOfDog: {
      type: Number,
    },
    noOfCat: {
      type: Number,
    },
    smoke: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "smoke entity is required"],
    },
    drink: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "drink entity is required"],
    },
    preferred_aminities: {
      type: String,
      enum: ["Furnished Room", "Unfurnished Room"],
    },
    bathroom_type: {
      type: [String],
      enum: ["Private Bathroom", "In-Unit Laundry"],
    },
    about_you: {
      type: String,
      required: [true, "about you is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomSearch", RoomSearchSchema);

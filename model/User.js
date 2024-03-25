const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      max: 50,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    mobile: {
      type: String,
      required: [true, "mobile No is required"],
      unique: true,
      match: [/^\d{11}$/, "Mobile number should be exactly 11 digits"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: [8, "Password should be at least 8 characters long"],
    },

    address: {
      type: String,
      max: 50,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["superadmin","admin", "user"], // define the roles available in your system
      required: [true, "role must be admin or user"],
    },
    fcmToken: {
      type: String,
      default: '',
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

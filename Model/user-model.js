const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  profileImage: {
    // Profile Image
    type: String,
    required: false,
  },
  fullname: {
    // Fullname
    type: String,
    required: true,
  },
  contact: {
    // Contact Number
    type: String,
    required: true,
  },
  email: {
    // Email
    type: String,
    required: true,
  },
  carLiscencePlateNum: {
    // Car plate number.
    type: String,
    required: false,
  },
  bikeLiscencePlateNum: {
    // Bike plate number
    type: String,
    required: false,
  },
  username: {
    // Username
    type: String,
    required: true,
    unique: [true, "User name already taken!"],
    minLength: [5, "Usernamr too short."],
    maxLength: [20, "Usernamr too long."],
  },
  password: {
    // Password
    type: String,
    required: true,
  },
  role: {
    // Role admin
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

module.exports = mongoose.model("usermodel", userModel);

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
    required: false,
  },
  username: {
    // Username
    type: String,
    required: true,
    unique: [true, "User name already taken!"],
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

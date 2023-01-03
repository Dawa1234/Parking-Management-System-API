const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "User name already taken!"],
    minLength: [5, "Usernamr too short."],
    maxLength: [20, "Usernamr too long."],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

module.exports = mongoose.model("UserModel", userModel);

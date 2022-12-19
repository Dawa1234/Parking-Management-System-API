const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserModel", userModel);

const express = require("express");
const userRoute = express.Router();
const User = require("../Model/user-model");
// Get all user
userRoute
  .route("/")
  .get(async (req, res) => {
    let allUser;
    try {
      allUser = await User.find();
      res.status(201).json(allUser);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  .post(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    try {
      const newUserCreated = await newUser.save();
      res.status(201).json(newUserCreated);
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  })
  .delete((req, res) => {
    User.deleteMany()
      .then((message) => res.status(201).json({ message: "Users Deleted." }))
      .catch((err) => res.status(500).json({ message: err.message }));
  });

userRoute.route("/:id").get(async (req, res) => {
  let validUser;
  try {
    validUser = await User.findById(req.params.id);
    if (validUser == null) {
      return res.status(404).json({ message: "User does not exists." });
    }
    res.status(201).json(validUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = userRoute;

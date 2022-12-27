const express = require("express");
const userRoute = express.Router();
// Package to encode password.
const bcryptjs = require("bcryptjs");
const User = require("../Model/user-model");
const UserController = require("../Controller/user-Controller");
// Get all user
// userRoute
//   .route("/")
//   .get(async (req, res, next) => {
//     let allUser;
//     try {
//       allUser = await User.find();
//       res.status(201).json(allUser);
//     } catch (e) {
//       next(e.message);
//     }
//   })
//   .post(async (req, res, next) => {
//     const newUser = new User({
//       username: req.body.username,
//       password: req.body.password,
//     });
//     try {
//       const newUserCreated = await newUser.save();
//       res.status(201).json(newUserCreated);
//     } catch (e) {
//       next(e.message);
//     }
//   })
//   .delete((req, res, next) => {
//     User.deleteMany()
//       .then((message) => res.status(201).json({ message: "Users Deleted." }))
//       .catch((err) => next(err.message));
//   });

// Get all the resgistered users.
userRoute.get("/", async (req, res) => {
  let allUser;
  try {
    allUser = await User.find();
    res.status(203).json(allUser);
  } catch (e) {
    next(e.message);
  }
});

// Register User
userRoute.post("/register", UserController.registerController);

// User Login
userRoute.post("/login", UserController.loginController);

// userRoute.route("/:id").get(async (req, res) => {
//   let validUser;
//   try {
//     validUser = await User.findById(req.params.id);
//     if (validUser == null) {
//       return res.status(404).json({ message: "User does not exists." });
//     }
//     res.status(201).json(validUser);
//   } catch (e) {
//     next(e.message);
//   }
// });

module.exports = userRoute;

const express = require("express");
const userRoute = express.Router();
const { verifyUser, verifyAdmin } = require("../Middleware/authentication");
const UserController = require("../Controller/user-Controller");
const uploadImage = require("../Middleware/uploadImage");

// -------------------- See all users ------------------------------
userRoute.get("/", verifyUser, verifyAdmin, UserController.getAllUser);

// -------------------- Add User -------------------------

userRoute.post(
  "/register",
  // uploadImage.single("profileImage"), // uplaod image
  UserController.registerController
);

// -------------------- Login User -------------------------
userRoute.post("/login", UserController.loginController);

// -------------------- Delete User --------------------
userRoute.delete(
  "/deleteAll",
  verifyUser,
  verifyAdmin,
  UserController.deleteAllUser
);
// eporting module.
module.exports = userRoute;

const express = require("express");
const userRoute = express.Router();
const { verifyUser, verifyAdmin } = require("../Middleware/authentication");
const UserController = require("../Controller/user-Controller");

// -------------------- See all users ------------------------------
userRoute.get("/", verifyUser, verifyAdmin, UserController.getAllUser);

// -------------------- Add User -------------------------
userRoute.post("/register", UserController.registerController);

// -------------------- Login User -------------------------
userRoute.post("/login", UserController.loginController);

// -------------------- Delete User --------------------
userRoute.delete(
  "/deleteAll",
  verifyUser,
  verifyAdmin,
  UserController.deleteAllUser
);

module.exports = userRoute;

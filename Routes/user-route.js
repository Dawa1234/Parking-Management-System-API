const express = require("express");
const userRoute = express.Router();
const { verifyUser, verifyAdmin } = require("../Middleware/authentication");
const UserController = require("../Controller/user-Controller");
const uploadImage = require("../Middleware/uploadImage");

// -------------------- See all users ------------------------------
userRoute.get("/", verifyUser, verifyAdmin, UserController.getAllUser);
// -------------------- See user by Id ------------------------------
userRoute.get("/getUser", verifyUser, verifyAdmin, UserController.getUserById);
userRoute.post("/transaction/booking", UserController.paymentAndBooking);
// Get booked slots from the user
userRoute.get("/bookedSlot/:userId", verifyUser, UserController.getBookedSlots);
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
// -------------------- Update User By Id --------------------
userRoute.put(
  "/updateProfile",
  uploadImage.single("image"),
  verifyUser,
  UserController.updateUserById
);

// -------------------- Update Password By Id --------------------
userRoute.put("/updatePassword", verifyUser, UserController.updatePassword);

// Get booked slots from the user (bike)
userRoute.get("/bike", verifyUser, UserController.getSlotsbyBike);

// Get booked slots from the user (car)
userRoute.get("/car", verifyUser, UserController.getSlotsbyCar);

// Check Passwrd
userRoute.post("/checkPassword", verifyUser, UserController.checkPassword);

// -------------------- Delete User By Id --------------------
userRoute.delete(
  "/deleteUser",
  verifyUser,
  verifyAdmin,
  UserController.deleteUserById
);

// -------------------- User transaction --------------------
userRoute
  .route("/transaction")
  .get(UserController.getTransaction)
  .post(UserController.addTransaction)
  .delete(UserController.deleteAllTransaction);

// eporting module.
module.exports = userRoute;

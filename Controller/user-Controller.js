const User = require("../Model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const parkingSlotModel = require("../Model/parkingSlot-model");
const floorModel = require("../Model/floor-model");
const transactionModel = require("../Model/transaction-model");
// --------------- See all user -------------------------
const getAllUser = async (req, res, next) => {
  let allUser;
  try {
    allUser = await User.find();
    res.status(203).json(allUser);
  } catch (err) {
    next(err);
  }
};

// ------------------------- Delete All User except logged in one -------------------------
const deleteAllUser = (req, res, next) => {
  try {
    User.find()
      .then((users) => {
        users.map((user) => {
          if (user._id == req.user.userId) {
            return;
          }
          User.findByIdAndDelete(user._id).then(() => {
            console.log("Delete ");
          });
        });
        res.status(203).json({ status: "All users deleted except yours" });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

// ------------------------- Login -------------------------
const loginController = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // If user doesnot exist.
      if (user == null) {
        let err = new Error("Invalid Credintials");
        res.status(403);
        return next(err);
      }
      // If login through forget Password
      if (req.body.forgetPassword) {
        if (user.forgetPassword != req.body.forgetPassword) {
          let err = new Error("Password does not match");
          res.status(401);
          return next(err);
        }
        if (user.forgetPassword == req.body.forgetPassword) {
          // Actual Data of the user
          let userData = {
            _id: user._id,
            username: user.username,
            password: user.password,
            forgetPassword: user.forgetPassword,
            profileImage: user.profileImage,
            fullname: user.fullname,
            contact: user.contact,
            email: user.email,
            role: user.role,
          };
          // Generating the data into a token.
          jwt.sign(
            userData,
            process.env.SECRET,
            { expiresIn: "1d" },
            (err, encoded) => {
              if (err) return next(err);
              res.status(203).json({
                user: userData,
                token: encoded,
                role: userData.role,
                status: "LOGGED IN Successful.",
              });
            }
          );
        }
      } else {
        // Compare user password and user's hashed password.
        bcryptjs.compare(req.body.password, user.password, (err, success) => {
          if (err) return next(err);
          if (!success) {
            let err = new Error("Password does not match");
            res.status(401);
            return next(err);
          }

          // Actual Data of the user
          let userData = {
            _id: user._id,
            username: user.username,
            password: user.password,
            forgetPassword: user.forgetPassword,
            profileImage: user.profileImage,
            fullname: user.fullname,
            contact: user.contact,
            email: user.email,
            role: user.role,
          };

          // Generating the data into a token.
          jwt.sign(
            userData,
            process.env.SECRET,
            { expiresIn: "1d" },
            (err, encoded) => {
              if (err) return next(err);
              res.status(203).json({
                user: userData,
                token: encoded,
                role: userData.role,
                status: "LOGGED IN Successful.",
              });
            }
          );
        });
      }
    })
    .catch((err) => next(err));
};

// ------------------------- Register -------------------------
const registerController = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // if a user is exists.
      if (user != null) {
        let err = new Error("Username already taken.");
        res.status(403).json({
          error: err.message,
        });
        return;
        // return next(err);
      }

      // Encrypt the password into a hash then
      // send to the data.
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        // Save the data in the user variable.
        user = new User({
          fullname: req.body.fullname,
          contact: req.body.contact,
          email: req.body.email,
          username: req.body.username,
          password: hash,
          forgetPassword: req.body.forgetPassword,
        });
        // Then save to the database.
        user
          .save()
          .then((newUser) => {
            res.status(201).json({
              user: newUser,
              status: "Registered Successfully",
              role: newUser.role,
            });
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
};

// ------------------------------------------------ Delete User by id ------------------------------------------------
const deleteUserById = (req, res, next) => {
  console.log(req.query.userId);
  User.findByIdAndDelete(req.query.userId)
    .then((result) => {
      res.status(200).json({
        message: "Successfully deleted User",
        user: result,
      });
    })
    .catch((err) => next(err));
};

// ------------------------------------------------ Update User by id ------------------------------------------------
const updateUserById = (req, res, next) => {
  const userId = req.query.userId;
  const newUser = req.body;
  const file = req.file;
  User.findById(userId)
    .then((user) => {
      if (user == null) {
        let err = new Error("User does not exist");
        return next(err);
      }
      // if contains image
      if (file) {
        user.profileImage = "Images/" + file.filename;
      } else {
        user.profileImage = "";
      }
      // Update the data
      user.fullname = newUser.fullname;
      user.email = newUser.email;
      user.contact = newUser.contact;
      user.username = newUser.username;
      // user.forgetPassword = newUser.forgetPassword;
      // then save
      user.save().then((updatedUser) => {
        res.status(200).json(updatedUser);
      });
    })
    .catch((err) => next(err));
};

// ------------------------------------------------ Get User by id ------------------------------------------------
const getUserById = (req, res, next) => {
  console.log(req.query.userId);
  User.findById(req.query.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
};

// ------------------------------------------------ Update password ------------------------------------------------
const updatePassword = (req, res, next) => {
  const userId = req.query.userId;
  User.findById(userId)
    .then((user) => {
      // check old password and current password of the user
      bcryptjs.compare(req.body.oldPassword, user.password, (err, matched) => {
        if (err) return next(err);

        if (!matched) {
          let err = new Error("Old password did not match");
          return next(err);
        }
        // convert the new password into hash and save
        bcryptjs.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) return next(err);

          user.password = hash;
          user.save().then((updatedUser) => {
            res.status(200).json(updatedUser);
          });
        });
      });
    })
    .catch((err) => next(err));
};

// Get all the booked slots of bike of specific user by id
const getSlotsbyBike = (req, res, next) => {
  const userId = req.query.userId;
  parkingSlotModel
    .find({ vehicleCategory: "Bike", userId: userId })
    .populate("floorId")
    // .select("-slot -__v")

    .then((bike) => {
      let allBikeSlot = bike.map((allSlots) => {
        return {
          _id: allSlots._id,
          slot: allSlots.slot,
          row: allSlots.row,
          column: allSlots.column,
          booked: allSlots.booked,
          occupied: allSlots.occupied,
          floorId: allSlots.floorId.floorNum,
          userId: allSlots.userId,
          vehicleCategory: allSlots.vehicleCategory,
        };
      });
      res.status(200).json({ parkingSlots: allBikeSlot });
    });
};

// Get all the booked slots of car of specific user by id
const getSlotsbyCar = (req, res, next) => {
  const userId = req.query.userId;
  parkingSlotModel
    .find({ vehicleCategory: "Car", userId: userId })
    .populate("floorId")
    .then((car) => {
      let allCarSlot = car.map((allSlots) => {
        return {
          _id: allSlots._id,
          slot: allSlots.slot,
          row: allSlots.row,
          column: allSlots.column,
          booked: allSlots.booked,
          occupied: allSlots.occupied,
          floorId: allSlots.floorId.floorNum,
          userId: allSlots.userId,
          vehicleCategory: allSlots.vehicleCategory,
        };
      });
      res.status(200).json({ parkingSlots: allCarSlot });
    });
};

const getTransaction = (req, res, next) => {
  // console.log(req.query.userId);
  transactionModel.find({ userId: req.query.userId }).then((allTransaction) => {
    res.status(201).json({ allTransaction: allTransaction });
  });
};

// payment from android device
const addTransaction = (req, res, next) => {
  transactionModel.create(req.body).then((newTransaction) => {
    res.status(201).json(newTransaction);
  });
};
// payment and booking
const paymentAndBooking = (req, res, next) => {
  // slots to be booked
  const selectedSlots = req.body.selectedSlots;
  // transaction
  const transaction = {
    date: req.body.date,
    amount: req.body.amount,
    vehicleCategory: req.body.vehicleCategory,
    userId: req.body.userId,
  };
  const userId = req.body.userId;
  // parking slot of a floor to be sent as a response
  const floorId = req.body.floorId;
  selectedSlots.map((slotId) => {
    parkingSlotModel.findById(slotId).then((slots) => {
      slots.booked = true;
      slots.userId = userId;
      slots.save();
    });
  });
  transactionModel.create(transaction).then(() => {
    floorModel
      .findById(floorId)
      .populate("parkingSlot")
      .then((allParkingSlot) => {
        res.status(200).json({ parkingSlots: allParkingSlot });
      });
  });
};

const deleteAllTransaction = (req, res, next) => {
  // res.status(201).json(req.body);
  transactionModel.deleteMany().then((newTransaction) => {
    res.status(201).json(newTransaction);
  });
};

const checkPassword = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    // If user doesnot exist.
    if (user == null) {
      let err = new Error("Invalid Credintials");
      res.status(403);
      return next(err);
    }

    bcryptjs.compare(req.body.password, user.password, (err, success) => {
      if (err) return next(err);

      if (!success) {
        let err = new Error("Password does not match");
        res.status(401);
        return next(err);
      }

      res.status(200).json({
        success: true,
      });
    });
  });
};

// for web
const getBookedSlots = (req, res, next) => {
  const userId = req.params.userId;
  parkingSlotModel
    .find({ userId: userId })
    .populate("floorId")
    .then((bookedSlot) => {
      let allSlot = bookedSlot.map((allSlots) => {
        return {
          _id: allSlots._id,
          slot: allSlots.slot,
          row: allSlots.row,
          column: allSlots.column,
          booked: allSlots.booked,
          occupied: allSlots.occupied,
          floorId: allSlots.floorId.floorNum,
          userId: allSlots.userId,
          vehicleCategory: allSlots.vehicleCategory,
        };
      });
      res.status(200).json(allSlot);
    });
};

module.exports = {
  loginController,
  registerController,
  getAllUser,
  getUserById,
  deleteAllUser,
  deleteUserById,
  updateUserById,
  updatePassword,
  getSlotsbyBike,
  getSlotsbyCar,
  getTransaction,
  addTransaction,
  deleteAllTransaction,
  checkPassword,
  paymentAndBooking,
  getBookedSlots,
};

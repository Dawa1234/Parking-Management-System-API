const User = require("../Model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
          userId: user._id,
          username: user.username,
          password: user.password,
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
              userId: userData.userId,
              user: userData,
              token: encoded,
              role: userData.role,
              status: "LOGGED IN Successful.",
            });
          }
        );
      });
    })
    .catch((err) => next(err));
};

// ------------------------- Register -------------------------
const registerController = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      //     // if a user is exists.
      if (user != null) {
        let err = new Error("User already taken.");
        res.status(403);
        return next(err);
      }

      //     // Encrypt the password into a hash then
      //     // send to the data.
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        //       //   if (err) return next(err);
        //       //   // Save the data in the user variable.
        user = new User({
          fullname: req.body.fullname,
          contact: req.body.contact,
          email: req.body.email,
          username: req.body.username,
          password: hash,
          role: req.body.role,
        });
        //       //   // Then save to the database.

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

module.exports = {
  loginController,
  registerController,
  getAllUser,
  deleteAllUser,
};

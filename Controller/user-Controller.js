const User = require("../Model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get All the user from the database.
const getAllUser = async (req, res, next) => {
  let allUser;
  try {
    allUser = await User.find();
    res.status(203).json(allUser);
  } catch (err) {
    next(err);
  }
};

// User Login
const loginController = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        let err = new Error("Invalid Credintials");
        res.status(403);
        return next(err);
      }
      // user.username;
      // user.password;

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
          role: user.role,
          message: "Successfully logged in",
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
              token: encoded,
            });
          }
        );
      });
    })
    .catch((err) => next(err));
};

const registerController = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // if a user is exists.
      if (user != null) {
        let err = new Error("User already taken.");
        res.status(403);
        return next(err);
      }
      // Encrypt the password into a hash then
      // send to the data.
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        // Save the data in the user variable.
        user = new User({
          username: req.body.username,
          password: hash,
          role: req.body.role,
        });
        // Then save to the database.
        user
          .save()
          .then((newUser) => {
            res.status(203).json({
              username: newUser.username,
              userId: newUser._id,
              status: "Registered Successfully",
              role: newUser.role,
            });
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
};

module.exports = { loginController, registerController, getAllUser };

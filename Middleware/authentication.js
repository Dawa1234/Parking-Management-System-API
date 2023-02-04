const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // On authorization token fail.
  if (!req.headers.authorization) {
    let err = new Error("Authorization token missing or invalid.");
    res.status(404);
    next(err);
  }

  //   Token recieved as Bearer asd8a7sd987a@&a8sd7a.
  // So split the string by " " and store 1 index value.
  let token = req.headers.authorization.split(" ")[1];

  //   if token and the privateKey is matched.
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return next(err);
    req.user = decoded;
    // console.log(req.user);
    next();
  });
};

// Admin verification
const verifyAdmin = (req, res, next) => {
  // console.log(req.user);
  if (!req.user) {
    let err = new Error("No data from req.user!");
    return next(err);
  }
  if (req.user.role != "Admin") {
    let err = new Error("Not Accessed!");
    res.status(403);
    return next(err);
  }
  next();
};

module.exports = { verifyUser, verifyAdmin };

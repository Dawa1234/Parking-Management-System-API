// ------------------ Private/SECRET key configuration ------------------
require("dotenv").config();
// ------------------ Server ------------------
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();
// ------------------ Mongodb Connection ------------------
const mongoose = require("mongoose");
// ------------------ Import Route ---------------------------
const routeUser = require("./Routes/user-route");
const routeVehicle = require("./Routes/vehicleCategory-route");
const routeParking = require("./Routes/parkingSlot-route");
const routeFloor = require("./Routes/floor-route");
const routeTransaction = require("./Routes/transaction-route");
// ------------------ Authentication Middleware ------------------
const authentication = require("./Middleware/authentication");

// ------------------------ Database connection ------------------------
const databaseURL =
  process.env.NODE_ENV == "test" ? process.env.Test_DB_URL : process.env.DB_URL;
console.log(databaseURL);
mongoose.set("strictQuery", true);
mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => console.log(err));

app.use("/Images", express.static(path.join(__dirname, "/Images")));

// --------------------------- Most Important ---------------------------
// To see request.
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

// ------------------ Routes ------------------------------------
// User Route
app.use("/user", routeUser);
app.use(authentication.verifyUser);
app.use("/vehicle", routeVehicle);
app.use("/parkingSlot", routeParking);
app.use("/floor", routeFloor);

app.use("/transaction", routeTransaction);

// --------------------------- Errors ------------------------------------
app.use((err, req, res, next) => {
  res.status(500).json({ Error: err.message });
});

// --------------------------- Running Port ---------------------------
app.listen(3001, () => {
  console.log("Out port is running at 3001");
});

module.exports = app;

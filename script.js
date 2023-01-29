// ------------------ Private/SECRET key configuration ------------------
require("dotenv").config();
// ------------------ Server ------------------
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
// ------------------ Mongodb Connection ------------------
const mongoose = require("mongoose");
// ------------------ Import Route ---------------------------
const routeUser = require("./Routes/user-route");
const routeVehicle = require("./Routes/vehicleCategory-route");
const routeParking = require("./Routes/parkingSlot-route");
const routeFloor = require("./Routes/floor-route");
// ------------------ Authentication Middleware ------------------
const authentication = require("./Middleware/authentication");

// ------------------------ Database connection ------------------------
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/PR")
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => console.log(err));

// --------------------------- Most Important ---------------------------
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
// --------------------------- Errors ------------------------------------
app.use((err, req, res, next) => {
  res.status(500).json({ Error: err.message });
});

// --------------------------- Running Port ---------------------------
app.listen(3001, () => {
  console.log("Out port is running at 3001");
});

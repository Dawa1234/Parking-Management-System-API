require("dotenv").config();
// Server
const express = require("express");
const app = express();
// Mongodb Connection
const mongoose = require("mongoose");
// Import Route
const routeUser = require("./Routes/user-route");
const routeVehicle = require("./Routes/vehicleCategory-route");
const routeParking = require("./Routes/parkingSlot-route");
// Authentication Middleware.
const authentication = require("./Middleware/authentication");

// Database connection
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/PR")
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => console.log(err));

// Most Important
app.use(express.json());

// User Route
app.use("/user", routeUser);
app.use(authentication.verifyUser);
app.use("/vehicle", routeVehicle);
app.use("/parkingSlot", routeParking);

app.use((err, req, res, next) => {
  res.status(500).json({ Error: err.message });
});

// Testing function
// function login(req, res, next) {
//   res.send("Server is working");
// }

app.listen(3000, () => {
  console.log("Out port is running at 3000");
});

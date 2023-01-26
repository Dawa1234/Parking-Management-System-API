const express = require("express");
const vehicleRoute = express.Router();
const vehicleController = require("../Controller/vehicleCategory-contoller");

vehicleRoute
  .route("/")
  .get(vehicleController.getAllVehicle) // See all vehicles
  .post(vehicleController.newVehicleCategory); // Add new vehicle

module.exports = vehicleRoute;

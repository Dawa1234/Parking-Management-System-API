const express = require("express");
const vehicleRoute = express.Router();
const vehicleController = require("../Controller/vehicleCategory-contoller");

vehicleRoute
  .route("/")
  .get(vehicleController.getAllVehicle) // See all vehicles
  .post(vehicleController.newVehicleCategory); // Add new vehicle

vehicleRoute
  .route("/:vehicleId")
  .post(vehicleController.addFloorInVehicleById) // See vehicle by id
  .delete(vehicleController.deleteFloorFromVehicle); // See vehicle by id

module.exports = vehicleRoute;

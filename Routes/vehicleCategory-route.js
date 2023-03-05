const express = require("express");
const vehicleRoute = express.Router();
const vehicleController = require("../Controller/vehicleCategory-contoller");

vehicleRoute
  .route("/")
  .get(vehicleController.getAllVehicle) // See all vehicles
  .post(vehicleController.newVehicleCategory); // Add new vehicle

vehicleRoute
  .route("/:vehicleId")
  .get(vehicleController.getFloorByCategory)
  .post(vehicleController.addFloorInVehicleById) // Add floor in vehicle by id
  .put(vehicleController.updateFloorInVehicleById); // delete floor in vehicle by id

vehicleRoute.delete(
  "/:vehicleId/:floorId",
  vehicleController.deleteFloorFromVehicle
); // Delete floor;

module.exports = vehicleRoute;

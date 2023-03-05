const express = require("express");
const floorController = require("../Controller/floor-controller");
const floorRoute = express.Router();

floorRoute
  .route("/")
  .get(floorController.allFloors) // All floors
  .post(floorController.newFloor) // Add new floor
  .delete(floorController.deleteAllFloor); // delete all floor

floorRoute
  .route("/:floorId")
  .get(floorController.allFloors) // All floors
  .put(floorController.updateFloor) // Update floor
  .delete(floorController.deleteAllFloor); // Add new floor

floorRoute.route("/:floorId/parkingSlots").get(floorController.getParkingSlots);
floorRoute.put("/:floorId/parkingSlots", floorController.addSlotInFloor);
floorRoute.delete("/:floorId/parkingSlots/:slotId", floorController.deleteSlot);
// All floors
// .put(floorController.updateFloor) // Update floor
// .delete(floorController.deleteAllFloor); // Add new floor

module.exports = floorRoute;

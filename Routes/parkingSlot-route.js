const express = require("express");
const parkingRoute = express.Router();
const parkingController = require("../Controller/parkingSlot-controller");

parkingRoute
  .route("/")
  .get(parkingController.parkingSlots) // Get all parking slot.
  .put(parkingController.bookSelectedSlots) // Book the parking slots
  .post(parkingController.newParkingSlot) // Create parking slot.
  .delete(parkingController.deleteParkingSlots); // delete all slots.

parkingRoute
  .route("/:slotId")
  .get(parkingController.parkingSlotsById) // get parking slot by _id.
  .put(parkingController.cancelBooking); // cancel booking

module.exports = parkingRoute;

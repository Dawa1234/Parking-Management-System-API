const express = require("express");
const parkingRoute = express.Router();
const parkingController = require("../Controller/parkingSlot-controller");

// Create parking slot.
parkingRoute.post("/", parkingController.newParkingSlot);

// Get all parking slot.
parkingRoute.get("/", parkingController.parkingSlots);

// get parking slot by _id.
parkingRoute.get("/:slotId", parkingController.parkingSlotsById);

// book parking slot
parkingRoute.put("/:slotId", parkingController.bookParkingSlot);

module.exports = parkingRoute;

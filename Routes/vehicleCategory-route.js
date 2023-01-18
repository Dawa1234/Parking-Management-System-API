const express = require("express");
const vehicleRoute = express.Router();
const vehicleController = require("../Controller/vehicleCategory-contoller");
vehicleRoute.post("/", vehicleController.newVehicleCategory);

module.exports = vehicleRoute;

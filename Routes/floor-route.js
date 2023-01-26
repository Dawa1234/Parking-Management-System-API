const express = require("express");
const floorController = require("../Controller/floor-controller");
const floorRoute = express.Router();

floorRoute
  .route("/")
  .get(floorController.allFloors) // All floors
  .post(floorController.newFloor); // Add new floor

module.exports = floorRoute;

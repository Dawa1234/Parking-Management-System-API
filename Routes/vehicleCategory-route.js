const express = require("express");
const vehicleRoute = express.Router();
// const vehicleController = require("../Controller/vehicleCategory-contoller");
// const vehicleModel = require("../Model/vehicleCategory-model");
vehicleRoute.post("/", (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

module.exports = vehicleRoute;

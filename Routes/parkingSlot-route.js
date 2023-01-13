const express = require("express");
const parkingRoute = express.Router();
const parkingModel = require("../Model/parkingSlot-model");

// Create parking slot.
parkingRoute.post("/", (req, res, next) => {
  try {
    let parkingData = {
      slot: req.body.slot,
      booked: false,
    };
    parkingModel
      .create(parkingData)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
});

// Get all parking slot.
parkingRoute.get("/", (req, res, next) => {
  parkingModel
    .find()
    .then((slots) => {
      res.status(201).json(slots);
    })
    .catch((err) => next(err));
});

// get parking slot by _id.
parkingRoute.get("/:slotId", (req, res, next) => {
  parkingModel
    .findById(req.params.slotId)
    .then((slots) => {
      res.status(201).json(slots);
    })
    .catch((err) => next(err));
});

// book parking slot
parkingRoute.put("/:slotId", (req, res, next) => {
  parkingModel
    .findByIdAndUpdate(req.params.slotId, { $set: req.body }, { new: true })
    .then((slots) => {
      if (req.body.booked) {
        slots.user = req.user.userId;
        slots.save();
        res.status(201).json(slots);
      } else {
        slots.user = [];
        slots.save();
        res.status(201).json(slots);
      }
      //   console.log(slots.user);
    })
    .catch((err) => next(err));
});

module.exports = parkingRoute;

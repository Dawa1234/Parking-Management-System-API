const parkingModel = require("../Model/parkingSlot-model");

// Create a new parking slot.
const newParkingSlot = (req, res, next) => {
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
};

// Get all parking slots
const parkingSlots = (req, res, next) => {
  parkingModel
    .find({})
    .populate("user")
    .then((slots) => {
      res.status(201).json(slots);
    })
    .catch((err) => next(err));
};
// Get all parking slots by id.
const parkingSlotsById = (req, res, next) => {
  parkingModel
    .findById(req.params.slotId)
    .then((slots) => {
      res.status(201).json(slots);
    })
    .catch((err) => next(err));
};

// Book parking slot
const bookParkingSlot = (req, res, next) => {
  parkingModel
    .findByIdAndUpdate(req.params.slotId, { $set: req.body }, { new: true })
    .then((slots) => {
      //   console.log(req.user);
      if (req.body.booked) {
        slots.user = req.user.userId;
        slots.save();
        res.status(201).json(slots);
        return;
      }
      res.status(201).json(slots);
      //   console.log(slots.user);
    })
    .catch((err) => next(err));
};

module.exports = {
  newParkingSlot,
  parkingSlots,
  parkingSlotsById,
  bookParkingSlot,
};

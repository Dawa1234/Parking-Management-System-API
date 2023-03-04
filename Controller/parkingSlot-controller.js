const parkingModel = require("../Model/parkingSlot-model");

// ------------------------- New Parking slot  -------------------------
const newParkingSlot = (req, res, next) => {
  try {
    parkingModel.findOne({ slot: req.body.slot }).then((newSlot) => {
      if (newSlot != null) {
        let err = new Error(`Slot [${req.body.slot}] already exists`);
        return next(err);
      }
      parkingModel
        .create(req.body)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => next(err));
    });
  } catch (e) {
    next(e);
  }
};

// ------------------------- All Parking slots -------------------------
const parkingSlots = (req, res, next) => {
  parkingModel
    .find({})
    .populate("floorId")
    .populate("userId")
    .then((slots) => {
      let allSlots = slots.map((slot) => {
        return {
          _id: slot._id,
          slot: slot.slot,
          row: slot.row,
          column: slot.column,
          booked: slot.booked,
          occupied: slot.occupied,
          floorId: slot.floorId.floorNum,
          user: slot.userId,
          vehicleCategory: slot.vehicleCategory,
        };
      });
      res.status(201).json({ parkingSlots: allSlots });
    })
    .catch((err) => next(err));
};
// ------------------------- All parking slots by id -------------------------
const parkingSlotsById = (req, res, next) => {
  parkingModel
    .findById(req.params.slotId)
    .then((slots) => {
      res.status(201).json(slots);
    })
    .catch((err) => next(err));
};

// ------------------------- Book parking slot in list -------------------------
const bookSelectedSlots = (req, res, next) => {
  // store in the variable
  let userId = req.body.userId;
  let selectedSlots = req.body.parkingSlots;
  // map and updated each slots.
  selectedSlots.map((slotId) => {
    parkingModel.findById(slotId).then((slot) => {
      console.log(userId);
      slot.userId = userId;
      slot.booked = true;
      slot.save();
      console.log("saved!!");
    });
  });
  res.status(200).json({ status: "successfully booked" });
};

// ------------------------- Occupy parking slot in list [Admin] -------------------------
const occupySlots = (req, res, next) => {
  // store in the variable
  let slotId = req.body.parkingSlots;
  // map and updated each slots.
  parkingModel
    .findById(slotId)
    .populate("floorId")
    .then((slot) => {
      slot.booked = true;
      slot.occupied = true;
      slot.save().then((updatedSlots) => {
        let allSlots = {
          _id: updatedSlots._id,
          slot: updatedSlots.slot,
          row: updatedSlots.row,
          column: updatedSlots.column,
          booked: updatedSlots.booked,
          occupied: updatedSlots.occupied,
          floorId: updatedSlots.floorNum,
          user: updatedSlots.userId,
          vehicleCategory: updatedSlots.vehicleCategory,
        };
        res.status(200).json(allSlots);
      });
    });
};

// ------------------------- Occupy parking slot in list [Admin] -------------------------
const removeOccupiedSlot = (req, res, next) => {
  // store in the variable
  let slotId = req.body.parkingSlots;
  // map and updated each slots.
  parkingModel
    .findById(slotId)
    .populate("floorId")
    .then((slot) => {
      // res.status(200).json({ status: slot });
      slot.userId = null;
      slot.booked = false;
      slot.occupied = false;
      slot.save().then((updatedSlot) => {
        let allSlots = updatedSlot.map((updatedSlots) => {
          return {
            _id: updatedSlots._id,
            slot: updatedSlots.slot,
            row: updatedSlots.row,
            column: updatedSlots.column,
            booked: updatedSlots.booked,
            occupied: updatedSlots.occupied,
            floorId: slot.updatedSlots.floorNum,
            user: updatedSlots.userId,
            vehicleCategory: updatedSlots.vehicleCategory,
          };
        });
        res.status(200).json(updatedSlot);
      });
    });
};

// ------------------------- Cancle Booking slots -------------------------
const cancelBooking = (req, res, next) => {
  // store in the variable
  let slotId = req.params.slotId;
  // map and updated each slots.
  parkingModel.findById(slotId).then((slot) => {
    slot.userId = null;
    slot.booked = false;
    slot.save().then((cancel) => {
      res.status(200).json({ parkingSlots: cancel });
    });
  });
};

// ------------------------------ Delete all slots ------------------------------
const deleteParkingSlots = (req, res, next) => {
  try {
    parkingModel.deleteMany().then(() => {
      res.status(200).json({
        message: "All slots deleted",
      });
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newParkingSlot,
  parkingSlots,
  parkingSlotsById,
  deleteParkingSlots,
  bookSelectedSlots,
  cancelBooking,
  occupySlots,
  removeOccupiedSlot,
};

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
          // bookedBy: slot.user,
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

// ------------------------- Book parking slot -------------------------
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
// ------------------------- Book parking slot -------------------------
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
    });
  });
  res.status(200).json({ parkingSlots: req.body.parkingSlots });
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
  bookParkingSlot,
  deleteParkingSlots,
  bookSelectedSlots,
};

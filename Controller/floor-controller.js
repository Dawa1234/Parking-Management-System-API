const res = require("express/lib/response");
const floorModel = require("../Model/floor-model");
const parkingSlotModel = require("../Model/parkingSlot-model");
const vehicleModel = require("../Model/vehicleCategory-model");

// -------------------------------- New Floor --------------------------------
const newFloor = (req, res, next) => {
  try {
    floorModel.findOne({ floorNum: req.body.floorNum }).then((floorNum) => {
      if (floorNum != null) {
        let err = new Error(`Floor ${req.body.floorNum} already exists`);
        return next(err);
      }
      floorModel.create(req.body).then((newFloor) => {
        res.status(200).json(newFloor);
      });
    });
  } catch (err) {
    return next(err);
  }
};

// -------------------------------- Get All Floor --------------------------------
const allFloors = (req, res, next) => {
  try {
    floorModel.find().then((allFloor) => {
      res.status(200).json(allFloor);
    });
  } catch (err) {
    return next(err);
  }
};

// -------------------------------- Get All Floor --------------------------------
const deleteAllFloor = (req, res, next) => {
  try {
    floorModel.deleteMany().then(() => {
      res.status(201).json({ message: "All floors deleted" });
    });
  } catch (e) {
    next(e);
  }
};

// -------------------------------- Update a Floor --------------------------------
const updateFloor = (req, res, next) => {
  let parkingSlot = req.body.parkingSlot;
  try {
    floorModel
      .findById(req.params.floorId)
      .then((floor) => {
        let currentParkingSlot = floor.parkingSlot;
        let newParkingSlots = req.body.parkingSlot;
        floor.parkingSlot = currentParkingSlot.concat(newParkingSlots);
        floor.save().then((newFloor) => {
          res.status(200).json(newFloor);
        });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

// -------------------------------- Get parkingSlot of a Floor --------------------------------
const getParkingSlots = (req, res, next) => {
  try {
    floorModel
      .findById(req.params.floorId)
      .populate("parkingSlot")
      .then((floor) => {
        res.status(200).json({ parkingSlots: floor.parkingSlot });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

// -------------------------------- add parkingSlot in a Floor [Admin]--------------------------------
const addSlotInFloor = (req, res, next) => {
  try {
    floorModel
      .findById(req.params.floorId)
      .then((floor) => {
        // if slot already exist in the floor
        parkingSlotModel
          .findOne({ slot: req.body.slot, floorId: req.params.floorId })
          .then((slot) => {
            // show error
            if (slot != null) {
              let err = new Error("Slot already exists in this floor");
              return next(err);
            }
            // else add new slot
            parkingSlotModel.create(req.body).then((newSlot) => {
              floor.parkingSlot.push(newSlot._id);
              floor.save().then(() => {
                floorModel
                  .findById(req.params.floorId)
                  .populate("parkingSlot")
                  .then((updatedFloor) => {
                    res
                      .status(200)
                      .json({ parkingSlots: updatedFloor.parkingSlot });
                  });
              });
            });
          });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

const deleteSlot = (req, res, next) => {
  floorModel
    .findById(req.params.floorId)
    .then((floor) => {
      // remote the slot from the floor
      let updatedParkingSlot = floor.parkingSlot.filter((item) => {
        return item != req.params.slotId;
      });
      floor.parkingSlot = updatedParkingSlot;
      floor.save().then(() => {
        // delete the slot itself
        parkingSlotModel.findByIdAndDelete(req.params.slotId).then(() => {});
        // send the updated parkingSlot array
        floorModel
          .findById(req.params.floorId)
          .populate("parkingSlot")
          .then((newFloor) => {
            res.status(200).json(newFloor.parkingSlot);
          });
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  newFloor,
  allFloors,
  deleteAllFloor,
  updateFloor,
  getParkingSlots,
  addSlotInFloor,
  deleteSlot,
};

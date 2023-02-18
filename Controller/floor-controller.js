const floorModel = require("../Model/floor-model");

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
  try {
    floorModel
      .findByIdAndUpdate(req.params.floorId, { $set: req.body }, { new: true })
      .then((floor) => {
        res.status(200).json(req.body);
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
      .then((parkingSlot) => {
        res.status(200).json({ parkingSlots: parkingSlot.parkingSlot });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  newFloor,
  allFloors,
  deleteAllFloor,
  updateFloor,
  getParkingSlots,
};

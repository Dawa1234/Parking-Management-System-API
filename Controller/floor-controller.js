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

module.exports = {
  newFloor,
  allFloors,
};

const vehicleModel = require("../Model/vehicleCategory-model");
const floorModel = require("../Model/floor-model");
// ------------------ New vehicle ------------------------------
const newVehicleCategory = (req, res, next) => {
  try {
    vehicleModel
      .findOne({ vehicleCategory: req.body.vehicleCategory })
      .then((newVehicle) => {
        if (newVehicle != null) {
          let err = new Error("Vehicle already exists.");
          return next(err);
        }

        vehicleModel.create(req.body).then((newVehicle) => {
          res.status(201).json(newVehicle);
        });
      });
  } catch (e) {
    next(e);
  }
};

// ------------------ See all vehicles ------------------------
const getAllVehicle = (req, res, next) => {
  try {
    vehicleModel
      .find()
      .populate("floor")
      .then((allVehicle) => {
        res.status(201).json({ vehicle: allVehicle });
      });
  } catch (err) {
    return next(err);
  }
};

// Add new floor in the vehicle [Admin]
const addFloorInVehicleById = (req, res, next) => {
  try {
    // get the vehilce
    vehicleModel.findById(req.params.vehicleId).then((vehicle) => {
      // if floor already exists
      floorModel.findOne({ floorNum: req.body.floorNum }).then((floor) => {
        // send error
        if (floor != null) {
          let err = new Error("Floor Already taken");
          return next(err);
        }
        // else
        floorModel.create(req.body).then((newFloor) => {
          // push the floor in the vehicle
          vehicle.floor.push(newFloor._id);
          vehicle.save().then(() => {
            // again send the new vehicle
            vehicleModel
              .findById(req.params.vehicleId)
              .populate("floor")
              .then((newVehicle) => {
                res.status(201).json(newVehicle.floor);
              });
          });
        });
      });
    });
  } catch (e) {
    next(err);
  }
};

// Update floors in vehicle [Admin]
const updateFloorInVehicleById = (req, res, next) => {
  try {
    vehicleModel.findById(req.params.vehicleId).then((vehicle) => {
      vehicle.floor.push(req.body.floor);
      vehicle.save().then((newVehicle) => {
        res.status(200).json(newVehicle);
      });
    });
    res.status(200).json({ message: req.params.vehicleId });
  } catch (e) {
    next(err);
  }
};

// [Admin]
const deleteFloorFromVehicle = (req, res, next) => {
  try {
    vehicleModel.findById(req.params.vehicleId).then((vehilce) => {
      // filter the floor from vheicle
      let updatedVehicle = vehilce.floor.filter(
        (floor) => floor != req.params.floorId
      );
      // update the value
      vehilce.floor = updatedVehicle;
      // save the data
      vehilce.save().then(() => {
        // also delete the floor itself
        floorModel.findByIdAndDelete(req.params.floorId).then(() => {});
        // send response with populate('floor')
        vehicleModel
          .findById(req.params.vehicleId)
          .populate("floor")
          .then((updatedVehicle) => {
            res.status(200).json(updatedVehicle.floor);
          });
      });
    });
  } catch (e) {
    next(e);
  }
};

// -------------------------------- Get floor by category [Admin] --------------------------------
const getFloorByCategory = (req, res, next) => {
  try {
    vehicleModel
      .find()
      .find({ vehicleCategory: req.params.vehicleId })
      .populate("floor")
      .then((vehicle) => {
        res.status(200).json(vehicle);
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllVehicle,
  addFloorInVehicleById,
  updateFloorInVehicleById,
  newVehicleCategory,
  deleteFloorFromVehicle,
  getFloorByCategory,
};

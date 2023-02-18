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

// Add new floor in the vehicle
const addFloorInVehicleById = (req, res, next) => {
  try {
    vehicleModel.findById(req.params.vehicleId).then((vehicle) => {
      floorModel.create(req.body).then((newFloor) => {
        vehicle.floor.push(newFloor._id);
        vehicle.save().then(() => {
          res.status(201).json(vehicle.floor);
        });
      });
    });
  } catch (e) {
    next(err);
  }
};

// Update floors in vehicle
const updateFloorInVehicleById = (req, res, next) => {
  try {
    vehicleModel.findById(req.params.vehicleId).then((vehicle) => {
      vehicle.floor.push(req.body.floor);
      vehicle.save().then((newVehicle) => {
        res.status(200).json(newVehicle);
      });
    });
  } catch (e) {
    next(err);
  }
};

const deleteFloorFromVehicle = (req, res, next) => {
  try {
    vehicleModel.findById(req.params.vehicleId).then((vehilce) => {
      vehilce.floor = [];
      vehilce.save().then((updatedVehicle) => {
        res.status(200).json({ message: updatedVehicle });
      });
    });
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
};

const vehicleModel = require("../Model/vehicleCategory-model");

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
    vehicleModel.find().then((allVehicle) => {
      res.status(201).json(allVehicle);
    });
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  getAllVehicle,
  newVehicleCategory,
};

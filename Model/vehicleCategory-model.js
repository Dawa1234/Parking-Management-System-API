const mongoose = require("mongoose");

const vehicleCategorySchema = mongoose.Schema({
  vehicleCategory: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("vehicleCategoryModel", vehicleCategorySchema);

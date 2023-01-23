const mongoose = require("mongoose");

const vehicleCategorySchema = mongoose.Schema({
  vehicleCategory: {
    type: String,
    required: true,
  },
  floor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "floormodel",
    },
  ],
});
module.exports = mongoose.model("vehicleCategoryModel", vehicleCategorySchema);

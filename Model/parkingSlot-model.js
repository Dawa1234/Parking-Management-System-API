const mongoose = require("mongoose");

const parkingSlotSchema = mongoose.Schema({
  // row+column. For eg: R-1C1
  slot: {
    type: String,
    required: true,
  },
  // For e.g: R-1, R-2, etc.
  row: {
    type: String,
    required: true,
  },
  // For e.g: C1, C2, etc.
  column: {
    type: String,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
    default: false,
  },
  occupied: {
    type: Boolean,
    required: true,
    default: false,
  },
  // which floor
  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "floormodel",
    required: true,
  },
  // Booked by
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
  },
  vehicleCategory: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("parkmodel", parkingSlotSchema);

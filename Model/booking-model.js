const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "floormodel",
  },
  parkingSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parkmodel",
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicleCategoryModel",
  },
});

module.exports = mongoose.module("bookingmodel", bookingSchema);

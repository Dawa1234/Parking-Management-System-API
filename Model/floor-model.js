const mongoose = require("mongoose");

const floorSchema = mongoose.Schema({
  floorNum: {
    type: String,
    required: true,
  },
  parkingSlot: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parkmodel",
    },
  ],
});

module.exports = mongoose.model("floormodel", floorSchema);

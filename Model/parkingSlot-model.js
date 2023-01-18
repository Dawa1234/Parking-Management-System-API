const mongoose = require("mongoose");

const parkingSlotSchema = mongoose.Schema({
  slot: {
    type: String,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
});
module.exports = mongoose.model("ParkModel", parkingSlotSchema);

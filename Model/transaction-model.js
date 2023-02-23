const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  vehicleCategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transationModel", transactionSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  addrLine1: String,
  addrLine2: String,
  pincode: Number,
  city: String,
  state: String,
  type: Number,
  verified: Boolean,
});

module.exports = mongoose.model("Address", addressSchema);

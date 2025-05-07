const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addrLine1: String,
  addrLine2: String,
  city: String,
  state: String,
});

module.exports = mongoose.model("Address", addressSchema);

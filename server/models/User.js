const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  contact: { type: Number, unique: true },
  email: String,
  verified: Boolean,
});

module.exports = mongoose.model("User", userSchema);

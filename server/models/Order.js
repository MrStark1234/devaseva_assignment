const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array, // array of seva items
  address: Object,
  orderId: Number,
  paymentId: Number,
  amountToPay: Number,
});

module.exports = mongoose.model("Order", orderSchema);

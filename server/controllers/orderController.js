const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { items, address, userId } = req.body;

  try {
    const orderId = Math.floor(Math.random() * 100000);
    const paymentId = Math.floor(Math.random() * 100000);
    const amountToPay = items.reduce(
      (total, seva) => total + seva.discountedPrice,
      0
    );

    const newOrder = new Order({
      items,
      address,
      orderId,
      paymentId,
      amountToPay,
      userId,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      paymentId,
      amountToPay,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
};

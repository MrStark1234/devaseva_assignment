exports.createOrder = async (req, res) => {
  const { items, address } = req.body;
  try {
    // Basic mock logic
    const orderId = Math.floor(Math.random() * 100000);
    const paymentId = Math.floor(Math.random() * 100000);
    const amountToPay = items.reduce(
      (total, seva) => total + seva.discountedPrice,
      0
    );

    res.json({ orderId, paymentId, amountToPay });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.getAddressByPincode = async (req, res) => {
  const pincode = req.params.pincode;
  try {
    if (pincode === "560001") {
      return res.json({ state: "Karnataka", city: "Bangalore" });
    } else {
      return res.status(404).json({ error: "Invalid Pincode" });
    }
  } catch (err) {
    res.status(500).json({ error: "Address fetch failed" });
  }
};

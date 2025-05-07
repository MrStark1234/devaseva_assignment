const Seva = require("../models/Seva");

const getAllSevas = async (req, res) => {
  try {
    const sevas = await Seva.find({});
    res.json(sevas);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getSevaByCode = async (req, res) => {
  try {
    const seva = await Seva.findOne({ code: req.params.code });
    if (!seva) return res.status(404).json({ message: "Seva not found" }); // Not used
    res.json(seva);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllSevas, getSevaByCode };

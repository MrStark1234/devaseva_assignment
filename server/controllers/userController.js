const User = require("../models/User");
const { sendOtp, verifyOtp } = require("../utils/otp");

exports.identityExist = async (req, res) => {
  try {
    const { contact } = req.query;
    const user = await User.findOne({ contact });
    res.json({ exists: !!user }); // true if user exists
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.sendOtpToUser = async (req, res) => {
  const { contact } = req.body;
  const success = await sendOtp(contact);
  success
    ? res.json({ message: "OTP sent" })
    : res.status(500).json({ message: "Failed to send OTP" });
};

exports.verifyOtp = async (req, res) => {
  const { contact, otp } = req.body;
  const valid = await verifyOtp(contact, otp);
  valid ? res.json({ valid: true }) : res.status(400).json({ valid: false });
};

exports.createUser = async (req, res) => {
  const { name, contact, email } = req.body;
  const user = new User({ name, contact, email, verified: false });
  await user.save();
  res.status(201).json(user);
};

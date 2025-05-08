const User = require("../models/User");
const { sendOtp, verifyOtp } = require("../utils/otp");

exports.identityExist = async (req, res) => {
  try {
    const { contact } = req.query;
    const user = await User.findOne({ contact });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" }); // Not Used
  res.json(user);
};

exports.sendOtpToUser = async (req, res) => {
  const { contact } = req.body;
  const otp = await sendOtp(contact);

  if (otp) {
    res.json({ message: "OTP sent", otp }); // send OTP in response
  } else {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.getUserByContact = async (req, res) => {
  const { contact } = req.query;

  if (!contact) {
    return res.status(400).json({ error: "Contact is required" });
  }

  try {
    const user = await User.findOne({ contact });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { _id, name, email, contact: userContact } = user;
    res.json({ _id, name, email, contact: userContact });
  } catch (error) {
    console.error("Error fetching user by contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { contact, otp } = req.body;
  const valid = await verifyOtp(contact, otp);

  if (valid) {
    try {
      const user = await User.findOne({ contact });
      if (!user) return res.status(404).json({ error: "User not found" });

      user.verified = true;
      await user.save();

      return res.json({
        valid: true,
        id: user._id,
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(400).json({ valid: false });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, contact } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      contact,
      verified: false,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    res.status(201).json({
      message: "User created",
      id: savedUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: "User creation failed" });
  }
};

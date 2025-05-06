const express = require("express");
const router = express.Router();
const {
  identityExist,
  getUserById,
  sendOtpToUser,
  verifyOtp,
  createUser,
} = require("../controllers/userController");

router.get("/identity-exist", identityExist);
router.get("/:id", getUserById);
router.post("/otp", sendOtpToUser);
router.post("/otp-verify", verifyOtp);
router.post("/", createUser);

module.exports = router;

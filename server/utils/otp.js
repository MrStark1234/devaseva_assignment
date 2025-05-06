const otpStore = new Map();

exports.sendOtp = async (contact) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(contact, otp);
  console.log(`OTP for ${contact}: ${otp}`); // simulate SMS send
  return true;
};

exports.verifyOtp = (contact, otp) => {
  const storedOtp = otpStore.get(contact);
  return storedOtp === otp;
};

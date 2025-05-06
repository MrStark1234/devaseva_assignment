// src/components/UserForm/UserForm.jsx
import React, { useState } from "react";
import styles from "./UserForm.module.css";
import axios from "axios";

const UserForm = () => {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile"); // 'mobile' | 'otp' | 'details'
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleMobileSubmit = async () => {
    if (!isValidMobile(contact)) {
      setError("Invalid mobile number");
      return;
    }

    try {
      const res = await axios.get(`/users/identity-exist?contact=${contact}`);
      const userExists = res.data.exists;

      if (userExists) {
        setUserId(res.data.id);
        await axios.post("/otp", { contact });
        setStep("otp");
      } else {
        setStep("details");
      }
      setError("");
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post("/otp-verify", { contact, otp });
      if (res.data.valid) {
        if (userId) {
          const userRes = await axios.get(`/users/${userId}`);
          setUserDetails(userRes.data);
        }
        setStep("done");
      } else {
        setError("Invalid OTP");
      }
    } catch {
      setError("OTP verification failed");
    }
  };

  const handleUserCreate = async () => {
    try {
      const res = await axios.post("/users", {
        name: userDetails.name,
        email: userDetails.email,
        contact,
      });
      await axios.post("/otp", { contact });
      setUserId(res.data.id);
      setStep("otp");
      setError("");
    } catch {
      setError("User creation failed");
    }
  };

  return (
    <div className={styles.userForm}>
      <h3>User Details</h3>

      {step === "mobile" && (
        <>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button onClick={handleMobileSubmit}>Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpSubmit}>Verify OTP</button>
        </>
      )}

      {step === "details" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <button onClick={handleUserCreate}>Register & Send OTP</button>
        </>
      )}

      {step === "done" && (
        <div className={styles.success}>
          ✅ User verified: {userDetails.name} ({userDetails.email})
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UserForm;

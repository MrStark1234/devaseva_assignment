import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";
import React, { useState } from "react";
import styles from "./UserForm.module.css";
import axios from "axios";

const UserForm = ({ user, setUser }) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile"); // 'mobile' | 'otp' | 'details' | 'done'
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleMobileSubmit = async () => {
    if (!isValidMobile(contact)) {
      setError("Invalid mobile number");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/identity-exist?contact=${contact}`
      );
      const userExists = res.data.exists;

      if (userExists) {
        setUserId(res.data.id);
        await axios.post("http://localhost:5000/api/user/otp", { contact });
        setStep("otp");
      } else {
        setUser((prev) => ({ ...prev, contact }));
        setStep("details");
      }
      setError("");
    } catch {
      setError("Server error. Try again.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/otp-verify",
        { contact, otp }
      );

      if (res.data.valid) {
        const userRes = await axios.get(
          `http://localhost:5000/api/user/by-contact?contact=${contact}`
        );
        const { _id, name, email, contact: verifiedContact } = userRes.data;
        const fullUser = { _id, name, email, contact: verifiedContact };

        console.log("Verified User to Save in LocalStorage:", fullUser);

        setUser(fullUser);
        dispatch(setUserDetails(fullUser));
        localStorage.setItem("userDetails", JSON.stringify(fullUser));

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
      const res = await axios.post("http://localhost:5000/api/user", {
        name: user.name,
        email: user.email,
        contact,
      });
      console.log("User Created Response:", res.data);

      await axios.post("http://localhost:5000/api/user/otp", { contact });

      const newUser = {
        name: user.name,
        email: user.email,
        contact,
        _id: res.data.id,
      };

      setUser(newUser);
      dispatch(setUserDetails(newUser));
      localStorage.setItem("userDetails", JSON.stringify(newUser));
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
          <button onClick={handleMobileSubmit} className={styles.udbtn}>
            Send OTP
          </button>
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
          <button onClick={handleOtpSubmit} className={styles.udbtn}>
            Verify OTP
          </button>
        </>
      )}

      {step === "details" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <button onClick={handleUserCreate} className={styles.udbtn}>
            Register & Send OTP
          </button>
        </>
      )}

      {step === "done" && (
        <div className={styles.success}>
          ✅ User verified: {user.name} ({user.email})
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UserForm;

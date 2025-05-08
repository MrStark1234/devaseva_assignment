import React, { useState } from "react";
import styles from "./AddressForm.module.css";
import axios from "axios";

const AddressForm = ({ address, setAddress }) => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [pinValid, setPinValid] = useState(false);
  const [error, setError] = useState("");

  const handlePincodeChange = async (e) => {
    const pin = e.target.value;
    setPincode(pin);
    if (pin.length === 6) {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://devaseva-backend.onrender.com/api/${pin}`
        );
        const { city, state } = res.data;
        setAddress((prev) => ({
          ...prev,
          city,
          state,
        }));
        setPinValid(true);
      } catch (err) {
        setError("Invalid pincode. Try again.");
        setPinValid(false);
      } finally {
        setLoading(false);
      }
    } else {
      setPinValid(false);
    }
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.addressForm}>
      <h3>Address</h3>

      <select
        name="type"
        value={address.type}
        onChange={handleChange}
        disabled={!pinValid}
      >
        <option value="Home">Home</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={handlePincodeChange}
      />

      {loading && <p>🔄 Fetching address...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {pinValid && (
        <>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={address.addressLine1}
            onChange={handleChange}
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={address.addressLine2}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            readOnly
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            readOnly
          />
        </>
      )}
    </div>
  );
};

export default AddressForm;

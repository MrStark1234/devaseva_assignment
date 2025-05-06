// src/pages/PaymentPage/PaymentPage.jsx
import React, { useState } from "react";
import styles from "./PaymentPage.module.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateCard = () => {
    const { number, expiry, cvv } = cardDetails;
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(number)) return "Invalid card number";
    if (!expiryRegex.test(expiry)) return "Invalid expiry date";
    if (!cvvRegex.test(cvv)) return "Invalid CVV";

    return "";
  };

  const validateUpi = () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) return "Invalid UPI ID";
    return "";
  };

  const handlePay = () => {
    const err = paymentMethod === "card" ? validateCard() : validateUpi();

    if (err) {
      setError(err);
    } else {
      setError("");
      alert("Payment Successful (Mock)");
    }
  };

  return (
    <div className={styles.paymentPage}>
      <h2>Payment</h2>
      <div className={styles.paymentContainer}>
        <div className={styles.section}>
          <h3
            onClick={() => setPaymentMethod("card")}
            style={{ cursor: "pointer" }}
          >
            Card
          </h3>
          {paymentMethod === "card" && (
            <>
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={handleCardChange}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                value={cardDetails.expiry}
                onChange={handleCardChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
              />
            </>
          )}
        </div>

        <div className={styles.section}>
          <h3
            onClick={() => setPaymentMethod("upi")}
            style={{ cursor: "pointer" }}
          >
            UPI
          </h3>
          {paymentMethod === "upi" && (
            <input
              type="text"
              placeholder="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default PaymentPage;

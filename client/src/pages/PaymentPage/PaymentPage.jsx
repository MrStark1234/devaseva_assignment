import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./PaymentPage.module.css";
import axios from "axios";

const PaymentPage = () => {
  const address = useSelector((state) => state.checkout.address);
  const cartItems = useSelector((state) => state.cart.items);

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

  const handlePay = async () => {
    const err = paymentMethod === "card" ? validateCard() : validateUpi();
    if (err) return setError(err);

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userId = userDetails?._id; // ✅

    if (!userId) {
      setError("User not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/order", {
        items: cartItems,
        address: address,
        userId,
      });

      console.log("Order Created:", res.data); // { orderId, paymentId, amountToPay }

      alert("Payment Successful");
      localStorage.removeItem("cartItems");
      window.location.href = "/";
    } catch (error) {
      console.error("Payment Error:", error);
      setError("Payment failed. Please try again.");
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
          <p>Just click on UPI to enter your UPI i'd</p>
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
      <button onClick={handlePay} className={styles.paybtn}>
        Pay
      </button>
    </div>
  );
};

export default PaymentPage;

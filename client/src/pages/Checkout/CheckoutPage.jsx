import React, { useState } from "react";
import styles from "./CheckoutPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../../components/UserForm/UserForm";
import AddressForm from "../../components/AddressForm/AddressForm";
import { useNavigate } from "react-router-dom";
import { setCheckoutInfo } from "../../redux/checkoutSlice";
import { removeFromCart } from "../../redux/cartSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ name: "", contact: "", email: "" });
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
  });

  const handleProceedToPayment = () => {
    // Debug logs to inspect what's missing
    console.log("User Info:", user);
    console.log("Address Info:", address);

    if (
      !user.name ||
      !user.contact ||
      !user.email ||
      !address.city ||
      !address.state
    ) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(setCheckoutInfo({ user, address }));
    navigate("/payment");
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice,
    0
  );
  const actualPrice = cartItems.reduce(
    (sum, item) => sum + item.marketPrice,
    0
  );
  const savedAmount = actualPrice - totalAmount;

  return (
    <div className={styles.checkoutContainer}>
      {/* Left: Cart Items */}
      <div className={styles.leftSection}>
        <h2>Checkout Page</h2>
        {cartItems.length === 0 ? (
          <p className={styles.para}>No Sevas selected.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.media} alt={item.title} className={styles.image} />
              <div>
                <p>{item.title}</p>
                <p>₹{item.discountedPrice.toLocaleString()}</p>
                <button onClick={() => dispatch(removeFromCart(item))}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <>
            <p className={styles.saved}>
              Hurray!🥳 You Saved: ₹{savedAmount.toLocaleString()}
            </p>
            <div className={styles.totalSection}>
              <h3>Total Amount to Pay: ₹{totalAmount.toLocaleString()}</h3>
            </div>
          </>
        )}
      </div>

      {/* Right: Forms */}
      {cartItems.length > 0 && (
        <div className={styles.rightSection}>
          <UserForm user={user} setUser={setUser} />
          <hr />
          <AddressForm address={address} setAddress={setAddress} />
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

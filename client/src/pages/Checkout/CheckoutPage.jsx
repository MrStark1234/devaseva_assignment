import React from "react";
import styles from "./CheckoutPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../../components/UserForm/UserForm";
import AddressForm from "../../components/AddressForm/AddressForm";
import { useNavigate } from "react-router-dom";
import { setCheckoutInfo } from "../../redux/checkoutSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProceedToPayment = () => {
    // validate user and address fields first
    if (
      !user.name ||
      !user.contact ||
      !user.email ||
      !address.line1 ||
      !address.pin
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // dispatch to store
    dispatch(setCheckoutInfo({ user, address }));

    // navigate to payment
    navigate("/payment");
  };

  return (
    <div className={styles.checkoutContainer}>
      {/* Left: Cart Items */}
      <div className={styles.leftSection}>
        <h2>Checkout Page</h2>
        {cartItems.length === 0 ? (
          <p>No Sevas selected.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.media} alt={item.title} className={styles.image} />
              <div>
                <p>{item.title}</p>
                <button>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Forms */}
      <div className={styles.rightSection}>
        <UserForm />
        <hr />
        <AddressForm />
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CheckoutPage;

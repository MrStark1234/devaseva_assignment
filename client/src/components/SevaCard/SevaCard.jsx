import React from "react";
import styles from "./SevaCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

const SevaCard = ({ seva }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const isInCart = items.some((item) => item._id === seva._id);

  return (
    <div className={styles.card}>
      <img src={seva.media} alt={seva.title} />
      <h3>{seva.title}</h3>
      <p>₹{seva.discountedPrice.toLocaleString()}</p>
      <button onClick={() => dispatch(addToCart(seva))} disabled={isInCart}>
        {isInCart ? "Added" : "Add to Cart"}
      </button>
      {isInCart && (
        <button onClick={() => dispatch(removeFromCart(seva.id))}>
          Remove from Cart
        </button>
      )}
    </div>
  );
};

export default SevaCard;

import React from "react";
import styles from "./Sidebar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Sidebar = () => {
  const { userDetails, latestOrders, isSidebarOpen } = useSelector(
    (state) => state.user
  );

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (!isSidebarOpen) return null;
  return (
    <div className={styles.sidebar}>
      <p>
        <strong>Name:</strong> {userDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {userDetails.email}
      </p>
      <p>
        <strong>Phone:</strong> {userDetails.contact}
      </p>
      <hr />
      <p>
        <strong>Orders in cart</strong>
      </p>
      <ul>
        {cartItems.slice(-3).map((item) => (
          <li key={item._id}>
            {item.title} ={">"} Seva Code: {item.code}
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Sidebar;

import React from "react";
import styles from "./Sidebar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Sidebar = () => {
  const { userDetails, latestOrders, isSidebarOpen } = useSelector(
    (state) => state.user
  );
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
        <strong>Phone:</strong> {userDetails.phone}
      </p>
      <hr />
      <p>
        <strong>Latest 3 orders</strong>
      </p>
      <ul>
        {latestOrders.map((id) => (
          <li key={id}>Order # {id}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Sidebar;

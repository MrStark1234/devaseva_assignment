import React from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/");
    dispatch(toggleSidebar());
  };
  return (
    <div className={styles.navbar}>
      <h2>Navbar</h2>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/checkout">Cart</Link>
        <button onClick={handleUserClick}>User</button>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
};

export default App;

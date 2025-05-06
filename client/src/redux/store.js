import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

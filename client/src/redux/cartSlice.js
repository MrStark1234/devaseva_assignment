import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // 🔐 save
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // 🔐 update
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

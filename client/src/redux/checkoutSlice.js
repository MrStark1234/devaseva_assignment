import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    user: {},
    address: {},
  },
  reducers: {
    setCheckoutInfo(state, action) {
      state.user = action.payload.user;
      state.address = action.payload.address;
    },
  },
});

export const { setCheckoutInfo } = checkoutSlice.actions;
export default checkoutSlice.reducer;

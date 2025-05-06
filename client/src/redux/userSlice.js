import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    name: "Suraj",
    email: "suraj@example.com",
    phone: "1234567890",
  },
  latestOrders: ["12345", "12344", "12343"],
  isSidebarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logout: (state) => {
      state.userDetails = {};
      state.latestOrders = [];
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const localUser = localStorage.getItem("userDetails");

const initialState = {
  userDetails: localUser ? JSON.parse(localUser) : {},
  latestOrders: JSON.parse(localStorage.getItem("latestOrders")) || [],
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
      localStorage.removeItem("userDetails"); // ✅ clear local storage
    },

    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { toggleSidebar, logout, setUserDetails } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../thunks/admin/fetchAllUsers.js";
import { toggleUserStatus } from "../thunks/admin/toggleUserStatus.js";

const initialState = {
  usersList: [],
  pagination: {
    totalUsers: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
  },
  isLoading: false,
  error: null,
  successMessage: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload.data.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })

      .addCase(toggleUserStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.usersList.findIndex((user) => user._id === action.payload.userId);
        
        if (index !== -1) {
          state.usersList[index].isActive = action.payload.isActive;
        }
        state.successMessage = "User compliance status updated successfully.";
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;
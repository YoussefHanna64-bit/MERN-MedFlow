import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../thunks/admin/fetchAllUsers.js";
import { toggleUserStatus } from "../thunks/admin/toggleUserStatus.js";
import { fetchDashboardStats } from "../thunks/admin/fetchDashboardStats.js";

const initialState = {
  usersList: [],
  pagination: {
    totalUsers: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    totalDoctors: 0,
    totalBanned: 0,
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
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
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
        const index = state.usersList.findIndex(
          (user) => user._id === action.payload.userId
        );
        if (index !== -1) {
          state.usersList[index].isActive = action.payload.isActive;
          if (action.payload.isActive === false) {
            state.pagination.totalBanned += 1;
          } else {
            state.pagination.totalBanned = Math.max(0, state.pagination.totalBanned - 1);
          }
        }
        state.successMessage = "User compliance status updated successfully.";
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardStats.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.pagination.totalDoctors = action.payload.totalDoctors;
        state.pagination.totalBanned = action.payload.totalBanned;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { clearAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;

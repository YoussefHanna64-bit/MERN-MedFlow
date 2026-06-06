import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; 
export const toggleUserStatus = createAsyncThunk(
  "admin/toggleUserStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/${userId}`, {});
    
      return { 
        userId, 
        isActive: response.data.data.isActive 
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to alter target account state.";
      return rejectWithValue(message);
    }
  }
);
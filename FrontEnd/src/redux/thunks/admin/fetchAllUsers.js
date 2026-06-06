import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; 
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user?page=${page}&limit=${limit}`);
      return response.data; 
    } catch (error) {
      const message = error.response?.data?.message || "Failed to retrieve users directory.";
      return rejectWithValue(message);
    }
  }
);

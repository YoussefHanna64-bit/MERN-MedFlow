import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; 

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load dashboard metrics.");
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchDoctorAvailability = createAsyncThunk(
  "doctor/fetchDoctorAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/doctors/me");
      return response.data.data.profile?.availability || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch availability",
      );
    }
  },
);

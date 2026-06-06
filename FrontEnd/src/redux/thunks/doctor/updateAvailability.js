import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import axios from "axios";
export const updateDoctorAvailability = createAsyncThunk(
  "doctor/updateDoctorAvailability",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch("/doctors", payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  },
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import axios from "axios";
export const searchDoctors = createAsyncThunk(
  "doctor/searchDoctors",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const response = await api.get(`/doctors/search?search=${searchQuery}`);
      return response.data.data.doctors;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No doctors found matching your search",
      );
    }
  },
);
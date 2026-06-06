import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import axios from "axios";
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (params = {}, { rejectWithValue }) => {
    const { page, limit } = params;

    try {
      const queryParams = new URLSearchParams();

      if (limit) {
        queryParams.append("limit", limit);
      }

      if (page) {
        queryParams.append("page", page);
      }

      const url = `/doctors?${queryParams.toString()}`;

      const response = await api.get(url);
      return response.data.data.doctors;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors",
      );
    }
  },
);
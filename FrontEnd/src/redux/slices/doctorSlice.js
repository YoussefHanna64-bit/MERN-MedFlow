import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

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

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    availability: [],
    loading: false,
    error: null,
    success: false,
    searchQuery: "",
  },
  reducers: {
    clearDoctorState: (state) => {
      state.error = null;
      state.availabilityError = null;
      state.success = false;
    },
    setDoctorSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
      state.success = true;
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    ////////////////////////////////////////////////
    builder.addCase(searchDoctors.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(searchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
      state.success = true;
    });
    builder.addCase(searchDoctors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.doctors = [];
      state.success = false;
    });
    ////////////////////////////////////////////////
    builder.addCase(updateDoctorAvailability.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateDoctorAvailability.fulfilled, (state, action) => {
      state.loading = false;
      state.availability = action.payload;
      state.success = true;
    });
    builder.addCase(updateDoctorAvailability.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearDoctorState, setDoctorSearchQuery } = doctorSlice.actions;
export default doctorSlice.reducer;

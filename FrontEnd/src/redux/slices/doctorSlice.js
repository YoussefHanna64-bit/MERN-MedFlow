import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { fetchDoctors } from "../thunks/doctor/fetchDoctors";
import { searchDoctors } from "../thunks/doctor/searchDoctors";
import { updateDoctorAvailability } from "../thunks/doctor/updateAvailability";
import { fetchDoctorAvailability } from "../thunks/doctor/fetchDoctorAvailability";

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
    builder.addCase(fetchDoctorAvailability.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchDoctorAvailability.fulfilled, (state, action) => {
      state.loading = false;
      state.availability = action.payload;
      state.success = true;
    });
    builder.addCase(fetchDoctorAvailability.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

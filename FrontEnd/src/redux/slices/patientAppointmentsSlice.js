import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchPatientAppointments = createAsyncThunk(
  "appointments/fetchPatientAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointment/patient/my-bookings");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

const patientAppointmentSlice = createSlice({
  name: "PatientAppointments",
  initialState: {
    patientAppointments: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    updateAppointment: (state, action) => {
      const index = state.patientAppointments.findIndex(
        (app) => app.id === action.payload.id,
      );
      if (index !== -1) {
        state.patientAppointments[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.patientAppointments = action.payload;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { updateAppointment } = patientAppointmentSlice.actions;
export default patientAppointmentSlice.reducer;

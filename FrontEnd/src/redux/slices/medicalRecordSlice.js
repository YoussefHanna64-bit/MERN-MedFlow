import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Thunk to fetch records for a specific patient
export const fetchPatientRecords = createAsyncThunk(
  "medicalRecords/fetchPatientRecords",
  async (patientId, { rejectWithValue }) => {
    try {
const response = await api.get(`/clinical/records/${patientId}`);
      return response.data.data.records;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch medical records"
      );
    }
  }
);

const medicalRecordSlice = createSlice({
  name: "medicalRecords",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearRecords: (state) => {
      state.records = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchPatientRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRecords } = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

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

export const createNewMedicalRecord = createAsyncThunk(
  "medicalRecords/createRecord",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/clinical/record", payload);
      return response.data.data.record; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create medical record"
      );
    }
  }
);

export const fetchDoctorRecords = createAsyncThunk(
  "medicalRecords/fetchDoctorRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/clinical/doctor-records`);
      return response.data.data.records;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor records"
      );
    }
  }
);

export const createPrescription = createAsyncThunk(
  "medicalRecords/createPrescription",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/clinical/prescription", payload);
      return response.data.data.prescription;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create prescription"
      );
    }
  }
);

const medicalRecordSlice = createSlice({
  name: "medicalRecords",
  initialState: {
    records: [],
    loading: false,
    doctorRecords:[],
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
      })
      .addCase(fetchDoctorRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorRecords = action.payload;
      })
      .addCase(fetchDoctorRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRecords } = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;
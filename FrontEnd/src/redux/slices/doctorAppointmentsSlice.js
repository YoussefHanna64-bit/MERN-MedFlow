import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchDoctorAppointments = createAsyncThunk(
    "appointments/fetchDoctorAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/appointment/doctor/my-bookings`)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch appointments"
            );
        }
    }
)

const doctorAppointmentSlice = createSlice({
    name: "DoctorAppointments",
    initialState: {
        doctorAppointments: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        updateAppointment: (state, action) => {
            const index = state.doctorAppointments.findIndex(
                (app) => app.id === action.payload.id
            );
            if (index !== -1) {
                state.doctorAppointments[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDoctorAppointments.pending, (state) => {
            state.loading = true
            state.error = null
        }
        ).addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.doctorAppointments = action.payload
        }
        ).addCase(fetchDoctorAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
    }

})

export const { updateAppointment } = doctorAppointmentSlice.actions
export default doctorAppointmentSlice.reducer;


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
                error.response?.data?.message || "Failed to fetch appointments"
            );
        }
    }
)

export const fetchDoctorAppointments = createAsyncThunk(
    "appointments/fetchDoctorAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/appointment/doctor/my-bookings");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch appointments"
            );
        }
    }
)

export const cancelAppointment = createAsyncThunk(
    "appointments/cancel",
    async (appointmentId, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/appointment/cancel/${appointmentId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to cancel appointment"
            );
        }
    }
);


const userAppointmentSlice = createSlice({
    name: "UserAppointments",
    initialState: {
        userAppointments: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        updateAppointment: (state, action) => {
            const index = state.userAppointments.findIndex(
                (app) => app.id === action.payload.id
            );
            if (index !== -1) {
                state.userAppointments[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPatientAppointments.pending, (state) => {
            state.loading = true
            state.error = null
        }
        ).addCase(fetchPatientAppointments.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.userAppointments = [...action.payload].sort(
                (a, b) => (a.status === "cancelled") - (b.status === "cancelled")
            );
        }
        ).addCase(fetchPatientAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }).addCase(fetchDoctorAppointments.pending, (state) => {
            state.loading = true
            state.error = null
        }
        ).addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.userAppointments = [...action.payload].sort(
                (a, b) => (a.status === "cancelled") - (b.status === "cancelled")
            );
        }
        ).addCase(fetchDoctorAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }).addCase(cancelAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.loading = false;

                const cancelledId = action.meta.arg;
                const index = state.userAppointments.findIndex(
                    (app) => app._id === cancelledId || app.id === cancelledId
                );
                if (index !== -1) {
                    state.userAppointments[index].status = "cancelled";
                }
            })
            .addCase(cancelAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

})

export const { updateAppointment } = userAppointmentSlice.actions
export default userAppointmentSlice.reducer;


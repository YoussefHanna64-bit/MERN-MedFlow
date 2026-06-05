import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../api";

export const bookAppointment = createAsyncThunk(
    "appointments/book",
    async (appointment, { rejectWithValue }) => {
        try {
            const response = await api.post("/appointment/book", appointment);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to book appointment"
            );
        }
    }
)

const appointmentFormSlice = createSlice({
    name: "appointmentFormFields",
    initialState: {
        appointment: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        setAppointment: (state, action) => {
            state.appointment = action.payload
        },
        resetForm: (state) => {
            state.appointment = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(bookAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.appointment = action.payload;
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


export const { setAppointment, resetForm } = appointmentFormSlice.actions;
export default appointmentFormSlice.reducer;
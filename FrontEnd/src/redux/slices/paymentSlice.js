import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const createPaymentIntent = createAsyncThunk("payment/create-intent", async (payload) => { 
    const response = await api.post("http://localhost:5000/api/payment/create-intent",payload)
    return response.data
})

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        amount: 0,
        appointmentId: "noId",
        loading:true,
        errorMessage:null,
        clientSecret:"no secret"
    },
    reducers: {
        setPaymentAmount: (state, action) => {
            state.amount = action.payload
        },
        setPaymentAppoinmentId: (state, action) => {
            state.appointmentId = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.
        addCase(createPaymentIntent.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createPaymentIntent.fulfilled, (state, action)=>{
            state.clientSecret = action.payload.clientSecret
            state.loading = false
        })
        .addCase(createPaymentIntent.rejected, (state, action)=>{
            state.loading = false
            state.errorMessage = action.payload || "Something went wrong"
        })
    }
})

export const { setPaymentAmount, setPaymentAppoinmentId } = paymentSlice.actions;
export default paymentSlice.reducer;
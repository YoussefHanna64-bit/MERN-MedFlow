import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './../slices/doctorSlice';
import userAppointmentsReducer from './../slices/userAppointmentsSlice';
import appointmentFormReducer from './../slices/appointmentFormSlice';
import authReducer from './../slices/authSlice';

export const doctorAppointmentsStore = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        userAppointments: userAppointmentsReducer,
        appointmentForm: appointmentFormReducer,
    },
});

export default doctorAppointmentsStore;
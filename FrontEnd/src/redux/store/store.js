import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './../slices/doctorSlice';
import userAppointmentsReducer from './../slices/userAppointmentsSlice';
import appointmentFormReducer from './../slices/appointmentFormSlice';
import authReducer from './../slices/authSlice';
import medicalRecordReducer from '../slices/medicalRecordSlice';
import adminReducer from './../slices/adminSlice';
import paymentReducer from "./../slices/paymentSlice"

export const doctorAppointmentsStore = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        userAppointments: userAppointmentsReducer,
        appointmentForm: appointmentFormReducer,
        medicalRecords: medicalRecordReducer,
        admin: adminReducer,
        payment: paymentReducer,
    },
});

export default doctorAppointmentsStore;
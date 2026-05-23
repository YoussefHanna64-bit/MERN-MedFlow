import { configureStore } from '@reduxjs/toolkit';
import doctorAppointmentsReducer from './../slices/doctorAppointmentsSlice';
import patientAppointmentsReducer from './../slices/patientAppointmentsSlice';
import authReducer from './../slices/authSlice';

export const doctorAppointmentsStore = configureStore({
    reducer: {
        auth: authReducer,
        doctorAppointments: doctorAppointmentsReducer,
        patientAppointments: patientAppointmentsReducer,
    },
});

export default doctorAppointmentsStore;
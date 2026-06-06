import { configureStore } from '@reduxjs/toolkit';
import doctorAppointmentsReducer from './../slices/doctorAppointmentsSlice';
import doctorReducer from './../slices/doctorSlice';
import patientAppointmentsReducer from './../slices/patientAppointmentsSlice';
import appointmentFormReducer from './../slices/appointmentFormSlice';
import authReducer from './../slices/authSlice';

export const doctorAppointmentsStore = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        doctorAppointments: doctorAppointmentsReducer,
        patientAppointments: patientAppointmentsReducer,
        appointmentForm: appointmentFormReducer,
    },
});

export default doctorAppointmentsStore;
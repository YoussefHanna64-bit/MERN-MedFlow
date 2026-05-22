import { configureStore } from '@reduxjs/toolkit';
import doctorAppointmentsReducer from './../slices/doctorAppointmentsSlice';
import patientAppointmentsReducer from './../slices/patientAppointmentsSlice';

export const doctorAppointmentsStore = configureStore({
    reducer: {
        doctorAppointments: doctorAppointmentsReducer,
        patientAppointments: patientAppointmentsReducer,
    },
});

export default doctorAppointmentsStore;
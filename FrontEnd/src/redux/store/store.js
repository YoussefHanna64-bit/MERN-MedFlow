import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './../slices/doctorSlice';
import userAppointmentsReducer from './../slices/userAppointmentsSlice';
import appointmentFormReducer from './../slices/appointmentFormSlice';
import authReducer from './../slices/authSlice';
import medicalRecordReducer from '../slices/medicalRecordSlice';
import adminReducer from './../slices/adminSlice';
import updateProfileReducer from '../slices/userProfileSlice';

export const clinicalSystemStore = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        userAppointments: userAppointmentsReducer,
        appointmentForm: appointmentFormReducer,
        medicalRecords: medicalRecordReducer,
        admin: adminReducer,
        updateProfile: updateProfileReducer,

    },
});

export default clinicalSystemStore;
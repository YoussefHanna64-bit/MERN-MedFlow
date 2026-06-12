import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./../slices/doctorSlice";
import userAppointmentsReducer from "./../slices/userAppointmentsSlice";
import appointmentFormReducer from "./../slices/appointmentFormSlice";
import authReducer from "./../slices/authSlice";
import medicalRecordReducer from "../slices/medicalRecordSlice";
import chatbotReducer from "../slices/chatbotSlice";
import adminReducer from "./../slices/adminSlice";
import updateProfileReducer from "../slices/userProfileSlice";
import paymentReducer from "./../slices/paymentSlice";
import notificationReducer from "./../slices/notificationSlice";

export const clinicalSystemStore = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    userAppointments: userAppointmentsReducer,
    appointmentForm: appointmentFormReducer,
    medicalRecords: medicalRecordReducer,
    chatbot: chatbotReducer,
    admin: adminReducer,
    updateProfile: updateProfileReducer,
    payment: paymentReducer,
    notifications: notificationReducer,
  },
});

export default clinicalSystemStore;

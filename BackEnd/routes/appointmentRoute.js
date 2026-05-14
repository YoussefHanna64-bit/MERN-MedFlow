import express from 'express';
import {
    bookAppointment,
    getPatientAppointments,
    getDoctorAppointements,
    cancelAppointment
} from '../controllers/appointementController.js'

const router = express.Router();
router.post("/book", bookAppointment)
    .get("/patient/my-bookings", getPatientAppointments)
    .get("/doctor/my-bookings", getDoctorAppointements)
    .patch("/cancel/:id", cancelAppointment)

export default router;
import express from 'express';
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import {
    bookAppointment,
    getPatientAppointments,
    getDoctorAppointements,
    cancelAppointment,
    updateAppointment
} from '../controllers/appointementController.js'

const router = express.Router();

router.post("/book", verifyToken, authorize("patient"), bookAppointment)
    .get("/patient/my-bookings", verifyToken, authorize("patient"), getPatientAppointments)
    .get("/doctor/my-bookings", verifyToken, authorize("doctor"), getDoctorAppointements)
    .patch("/cancel/:id", verifyToken, authorize("patient", "doctor"), cancelAppointment)
    .patch("/update/:id", verifyToken, authorize("patient", "doctor"), updateAppointment)

export default router;
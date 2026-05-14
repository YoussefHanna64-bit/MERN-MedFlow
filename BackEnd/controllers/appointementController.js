import asyncWrapper from "../middlewares/asyncWrapper.js";
import appointmentModel from "../models/appointement.js";
import doctorModel from "../models/Doctor.js";
import appError from '../utils/appError.js';
import httpStatus from "../utils/httpStatus.js";

export const bookAppointment = asyncWrapper(
    async (req, res, next) => {
        const { doctorId, date, timeSlot, reason } = req.body;
        const doctor = await doctorModel.findOne({ _id: doctorId, role: "doctor" })

        if (!doctor) {
            return next(appError.create("Doctor not found!", 404, httpStatus.FAIL))
        }

        const existingAppointement = await appointmentModel.findOne({
            doctor: doctorId,
            date: new Date(date),
            timeSlot,
            status: { $ne: "cancelled" }
        })

        if (existingAppointement) {
            return next(appError.create("This time slot is already taken", 400, httpStatus.FAIL))
        }

        const newAppointement = await appointmentModel.create({
            patient: req.user.id,
            doctor: doctorId,
            date,
            timeSlot,
            reason,
            amount: doctor.fees,
            status: "pending",
        })
        res.status(201).json({
            success: httpStatus.SUCCESS,
            data: {
                appointment: newAppointement,
            }
        })
    }
)

export const getPatientAppointments = asyncWrapper(
    async (req, res, next) => {
        const appointments = await appointmentModel.find({ patient: req.user.id })
            .populate("doctor", "name specialization image").sort("-date")
        res.status(200).json({
            success: httpStatus.SUCCESS,
            data: appointments
        })
    }
)

export const getDoctorAppointements = asyncWrapper(
    async (req, res, next) => {
        const appointments = await appointmentModel.find({
            doctor: req.user.id,
            status: { $in: ["confirmed", "completed"] }
        }).populate("patient", "name email image").sort("date")

        res.status(200).json({
            success: httpStatus.SUCCESS,
            data: appointments
        })
    }

)

export const cancelAppointment = asyncWrapper(async (req, res, next) => {
    const appointment = await appointmentModel.findById(req.params.id);

    if (!appointment) return next(appError.create('Appointment not found', 404, httpStatus.FAIL));

    const isOwner = appointment.patient.toString() === req.user.id ||
        appointment.doctor.toString() === req.user.id;

    if (!isOwner) return next(appError.create('Unauthorized', 403, httpStatus.FAIL));
    if (appointment.status === 'completed') return next(appError.create('Cannot cancel a completed visit', 400, httpStatus.FAIL));

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
        success: true,
        message: 'Appointment cancelled successfully'
    });
});
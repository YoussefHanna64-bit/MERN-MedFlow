import asyncWrapper from "../middlewares/asyncWrapper.js";
import Appointment from "../models/appointement.js";
import DoctorProfile from "../models/Doctor.js";
import appError from '../utils/appError.js';
import httpStatus from "../utils/httpStatus.js";

export const bookAppointment = asyncWrapper(
    async (req, res, next) => {
        const { doctorId, date, timeSlot, reason } = req.body;
        console.log(req.body)
        const doctor = await DoctorProfile.findById(doctorId)
        if (!doctor) {
            return next(appError.create("Doctor not found!", 404, httpStatus.FAIL))
        }
        const dayName = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            timeZone: 'UTC'
        });
        const availableDay = doctor.availability.find(d => d.day === dayName);
        if (!availableDay) {
            return next(appError.create(`Doctor is not available on ${dayName}`, 400, httpStatus.FAIL));
        }
        const normalizedTimeSlot = timeSlot.replace(/\s*-\s*/, '-');

        const slotExists = availableDay.slots.some(
            s => `${s.startTime}-${s.endTime}` === normalizedTimeSlot
        );

        if (!slotExists) {
            return next(appError.create("Invalid time slot for this doctor", 400, httpStatus.FAIL));
        }

        const existingAppointement = await Appointment.findOne({
            doctor: doctorId,
            date: new Date(date),
            timeSlot: normalizedTimeSlot,
            status: { $ne: "cancelled" }
        })

        if (existingAppointement) {
            return next(appError.create("This time slot is already taken", 400, httpStatus.FAIL))
        }

        const newAppointment = await Appointment.create({
            patient: req.user.id,
            doctor: doctorId,
            date: new Date(date),
            timeSlot: normalizedTimeSlot,
            reason,
            amount: doctor.fees,
            status: "pending",
        });

        res.status(201).json({
            success: httpStatus.SUCCESS,
            data: {
                appointment: newAppointment,
            }
        })
    }
)

export const getPatientAppointments = asyncWrapper(
    async (req, res, next) => {
        const appointments = await Appointment.find({ patient: req.user.id })
            .populate({
                path: "doctor",
                select: "specialization fees image",
                populate: { path: "user", select: "name email" }
            }).sort("-date")
        const formatted = appointments.map(appointment => {
            const doc = appointment.doctor;
            return {
                ...appointment.toObject(),
                doctor: {
                    _id: doc._id,
                    name: doc.user.name,
                    specialization: doc.specialization,
                    fees: doc.fees,
                    image: doc.image,
                }
            }
        });
        res.status(200).json({
            success: httpStatus.SUCCESS,
            data: formatted
        })
    }
)

export const getDoctorAppointements = asyncWrapper(
    async (req, res, next) => {
        const doctorProfile = await DoctorProfile.findOne({ user: req.user.id });

        if (!doctorProfile) {
            return next(appError.create("Doctor profile not found", 404, httpStatus.FAIL));
        }

        const appointments = await Appointment.find({
            doctor: doctorProfile._id,
            status: { $in: ["pending", "confirmed", "completed"] }
        }).populate("patient", "name email image").sort("date")

        res.status(200).json({
            success: httpStatus.SUCCESS,
            data: appointments
        })
    }

)

export const cancelAppointment = asyncWrapper(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return next(appError.create('Appointment not found', 404, httpStatus.FAIL));

    const isPatient = appointment.patient.toString() === req.user.id;

    let isDoctor = false;
    if (!isPatient) {
        const doctorProfile = await DoctorProfile.findOne({ user: req.user.id });
        isDoctor = doctorProfile && appointment.doctor.toString() === doctorProfile._id.toString();
    }

    const isOwner = isPatient || isDoctor;

    if (!isOwner) return next(appError.create('Unauthorized', 403, httpStatus.FAIL));

    if (appointment.status === 'completed') return next(appError.create('Cannot cancel a completed visit', 400, httpStatus.FAIL));

    if (appointment.paymentStatus === 'paid') {
        return next(appError.create('Paid appointments require a refund process', 400, httpStatus.FAIL))
    }

    appointment.status = 'cancelled';

    await appointment.save();

    res.status(200).json({
        success: true,
        message: 'Appointment cancelled successfully'
    });
});
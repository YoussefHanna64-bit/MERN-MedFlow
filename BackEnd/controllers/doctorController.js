import userModel from "../models/User.js";
import doctorModel from "../models/Doctor.js";
import httpStatus from "../utils/httpStatus.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import Appointment from "../models/appointement.js";
import { createNotification } from "../utils/createNotification.js";


export const searchDoctors = asyncWrapper(async (req, res, next) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    const matchingUsers = await userModel
      .find({ role: "doctor", name: { $regex: search, $options: "i" } })
      .select("_id");

    const matchedUsersIds = matchingUsers.map((user) => user.id);

    query = {
      $or: [
        { specialization: { $regex: search, $options: "i" } },
        { user: { $in: matchedUsersIds } },
      ],
    };
  }

  const doctors = await doctorModel.find(query).populate({ path: "user" });

  if (!doctors || doctors.length === 0) {
    return next(appError.create("No doctors found!", 404, httpStatus.FAIL));
  }

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: doctors.length,
    data: { doctors },
    message: "Doctors retrieved successfully",
  });
});

export const getAllDoctors = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const doctors = await doctorModel
    .find()
    .populate("user", "name email phone role")
    .select("-__v")
    .skip(skip)
    .limit(limit);

  const totalDoctors = await doctorModel.countDocuments();

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: doctors.length,
    pagination: {
      totalDoctors,
      currentPage: page,
      totalPages: Math.ceil(totalDoctors / limit),
      hasNextPage: page * limit < totalDoctors,
    },
    data: { doctors },
    message: "Doctors retrieved successfully",
  });
});

export const manageAvailability = asyncWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const { action, date, day, location, slots, startTime } = req.body;
  if (!date) {
    return next(appError.create("Date is required.", 400, httpStatus.FAIL));
  }
  if (!["update", "cancel"].includes(action)) {
    return next(
      appError.create(
        "Invalid action. Use 'update' or 'cancel'.",
        400,
        httpStatus.FAIL,
      ),
    );
  }
  const targetDate = new Date(date);
  const doctor = await doctorModel.findOne({ user: userId });
  if (!doctor) {
    return next(
      appError.create("Doctor profile not found.", 404, httpStatus.FAIL),
    );
  }
  const dayIndex = doctor.availability.findIndex(
    (item) =>
      item.date.toISOString().split("T")[0] ===
      targetDate.toISOString().split("T")[0],
  );

  const prevSlots =
    dayIndex !== -1 ? [...doctor.availability[dayIndex].slots] : [];
  let startTimesToCancel = [];
  if (action === "update") {
    if (!slots || !Array.isArray(slots)) {
      return next(
        appError.create(
          "Slots array required for update.",
          400,
          httpStatus.FAIL,
        ),
      );
    }

    if (dayIndex !== -1) {
      doctor.availability[dayIndex].day =
        day || doctor.availability[dayIndex].day;
      doctor.availability[dayIndex].location =
        location || doctor.availability[dayIndex].location;
      doctor.availability[dayIndex].slots = slots;
    } else {
      doctor.availability.push({
        date: targetDate,
        day,
        location: location || doctor.mainClinic,
        slots,
      });
    }
    if (dayIndex !== -1) {
      const newStartTimes = slots.map((s) => s.startTime);
      const removed = prevSlots.filter(
        (s) => !newStartTimes.includes(s.startTime),
      );
      if (removed.length > 0) {
        startTimesToCancel = removed.map((s) => s.startTime);
      }
    }
  } else if (action === "cancel") {
    if (!startTime) {
      return next(
        appError.create(
          "StartTime is required to cancel a slot.",
          400,
          httpStatus.FAIL,
        ),
      );
    }

    if (dayIndex === -1) {
      return next(
        appError.create(
          "No schedule found for this date.",
          404,
          httpStatus.FAIL,
        ),
      );
    }

    const originalLength = doctor.availability[dayIndex].slots.length;
    doctor.availability[dayIndex].slots = doctor.availability[
      dayIndex
    ].slots.filter((slot) => slot.startTime !== startTime);

    if (doctor.availability[dayIndex].slots.length === originalLength) {
      return res.status(204).json({
        success: httpStatus.SUCCESS,
        message: "Slot already removed.",
      });
    }
    startTimesToCancel.push(startTime);
    if (doctor.availability[dayIndex].slots.length === 0) {
      doctor.availability.splice(dayIndex, 1);
    }
  }
  if (startTimesToCancel.length > 0) {
    const regexPatterns = startTimesToCancel.map((st) => new RegExp(`^${st}-`));
    const affectedAppointments = await Appointment.find({
      doctor: doctor._id,
      date: targetDate,
      timeSlot: { $in: regexPatterns },
      status: { $ne: "cancelled" },
    });
    await Appointment.updateMany(
      {
        doctor: doctor._id,
        date: targetDate,
        timeSlot: { $in: regexPatterns },
        status: { $ne: "cancelled" },
      },
      { $set: { status: "cancelled" } },
    );
    const formattedDate = targetDate.toLocaleDateString("en-US", { dateStyle: "medium" });
    for (const appointment of affectedAppointments) {
      await createNotification(
        appointment.patient,
        userId,              
        "Appointment Cancelled by Provider ⚠️",
        `Your appointment on ${formattedDate} during the slot (${appointment.timeSlot}) was cancelled due to a schedule adjustment by the doctor.`,
        next
      );
    }
  }
  await doctor.save();
  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: `Availability successfully modified via action: ${action}`,
    data: doctor.availability,
  });
});

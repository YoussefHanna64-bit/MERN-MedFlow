import MedicalRecord from "../models/MedicalRecord.js";
import Prescription from "../models/Prescription.js";
import httpStatus from "../utils/httpStatus.js";

//Doctor only
export const createMedicalRecord = async (req, res, next) => {
  const doctorId = req.user ? req.user._id : req.body.doctorId; //////////for test

  const { patientId, appointmentId, diagnosis, symptoms, notes } = req.body;

  const newRecord = await MedicalRecord.create({
    patient: patientId,
    doctor: doctorId,
    appointment: appointmentId,
    diagnosis,
    symptoms,
    notes,
  });

  res.status(201).json({
    success: httpStatus.SUCCESS,
    data: { record: newRecord },
    message: "Medical record created successfully",
  });
};

//Patient & Doctor
export const getPatientRecords = async (req, res, next) => {
  const { patientId } = req.params;

  const records = await MedicalRecord.find({ patient: patientId })
    .populate({
      path: "doctor",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: records.length,
    data: { records },
    message: "Patient records retrieved successfully",
  });
};

export const generatePrescription = async (req, res, next) => {
  const doctorId = req.user ? req.user._id : req.body.doctorId; ////////for test

  const { recordId, patientId, medications, instructions } = req.body;

  const newPrescription = await Prescription.create({
    record: recordId,
    patient: patientId,
    doctor: doctorId,
    medications,
    instructions,
  });

  res.status(201).json({
    success: httpStatus.SUCCESS,
    data: { prescription: newPrescription },
    message: "prescription generated successfully",
  });
};

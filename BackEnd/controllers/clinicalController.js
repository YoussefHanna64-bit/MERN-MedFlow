import MedicalRecord from "../models/MedicalRecord.js";
import Prescription from "../models/Prescription.js";
import httpStatus from "../utils/httpStatus.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import {createNotification} from "../utils/createNotification.js";

//Doctor
export const createMedicalRecord = asyncWrapper(async (req, res, next) => {
  const doctorId = req.user.id;

  const { patientId, appointmentId, diagnosis, symptoms, notes } = req.body;

  const newRecord = await MedicalRecord.create({
    patient: patientId,
    doctor: doctorId,
    appointment: appointmentId,
    diagnosis,
    symptoms,
    notes,
  });
  await createNotification(
    patientId,
    doctorId,
    "New Medical Record Added 📄",
    `Your consultation summary for your recent visit has been published. Diagnosis: ${diagnosis}.`,
    next,
  );

  res.status(201).json({
    success: httpStatus.SUCCESS,
    data: { record: newRecord },
    message: "Medical record created successfully",
  });
});

//Docotor
export const generatePrescription = asyncWrapper(async (req, res, next) => {
  const doctorId = req.user.id;

  const { recordId, patientId, medications, instructions } = req.body;

  const newPrescription = await Prescription.create({
    record: recordId,
    patient: patientId,
    doctor: doctorId,
    medications,
    instructions,
  });
  const medCount = Array.isArray(medications) ? medications.length : 1;
  await createNotification(
    patientId,
    doctorId,
    "Digital Prescription Issued 💊",
    `Your doctor has generated a digital prescription containing ${medCount} item(s).`,
    next,
  );

  res.status(201).json({
    success: httpStatus.SUCCESS,
    data: { prescription: newPrescription },
    message: "prescription generated successfully",
  });
});

//Docotor
export const getDoctorRecords = asyncWrapper(async (req, res, next) => {
  const doctorId = req.user.id;

  const records = await MedicalRecord.find({ doctor: doctorId })
    .populate({
      path: "patient",
      select: "name email phone", 
    })
    .sort({ createdAt: -1 })
    .lean();

  const prescriptions = await Prescription.find({ doctor: doctorId }).lean();

  const recordsWithPrescriptions = records.map((record) => {
    const matchingPrescription = prescriptions.find(
      (p) => p.record.toString() === record._id.toString()
    );
    
    return {
      ...record,
      prescription: matchingPrescription || null,
    };
  });

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: recordsWithPrescriptions.length,
    data: { records: recordsWithPrescriptions },
    message: "Doctor records retrieved successfully",
  });
});

//Patient
export const getPatientRecords = asyncWrapper(async (req, res, next) => {
  const { patientId } = req.params;

  const records = await MedicalRecord.find({ patient: patientId })
    .populate({
      path: "doctor",
    })
    .sort({ createdAt: -1 })
    .lean(); 

  const prescriptions = await Prescription.find({ patient: patientId }).lean();

  const recordsWithPrescriptions = records.map((record) => {
    const matchingPrescription = prescriptions.find(
      (p) => p.record.toString() === record._id.toString()
    );
    
    return {
      ...record,
      prescription: matchingPrescription || null, 
    };
  });

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: recordsWithPrescriptions.length,
    data: { records: recordsWithPrescriptions },
    message: "Patient records retrieved successfully",
  });
});




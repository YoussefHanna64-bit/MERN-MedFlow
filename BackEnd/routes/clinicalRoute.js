import express from "express";
import {
  createMedicalRecord,
  getPatientRecords,
  generatePrescription,
  getDoctorRecords,
} from "../controllers/clinicalController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/record", verifyToken, authorize("doctor"), createMedicalRecord);

router.get(
  "/records/:patientId",
  verifyToken,
  authorize("doctor", "patient"),
  getPatientRecords,
);

router.get(
  "/doctor-records",
  verifyToken,
  authorize("doctor"),
  getDoctorRecords
);

router.post(
  "/prescription",
  verifyToken,
  authorize("doctor"),
  generatePrescription,
);
export default router;

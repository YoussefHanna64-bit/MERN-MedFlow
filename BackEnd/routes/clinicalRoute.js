import express from "express";
import {
  createMedicalRecord,
  getPatientRecords,
  generatePrescription,
} from "../controllers/clinicalController.js";

const router = express.Router();

router.post("/record", createMedicalRecord);
router.get("/records/:patientId", getPatientRecords);
router.post("/prescription", generatePrescription);

export default router;

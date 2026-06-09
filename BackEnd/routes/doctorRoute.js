import express from "express";
import {
  searchDoctors,
  manageAvailability,
  getAllDoctors,
  getDoctorProfile,
} from "../controllers/doctorController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/search", verifyToken, searchDoctors);
router.get("/me", verifyToken, authorize("doctor"), getDoctorProfile);
router.patch("/", verifyToken, authorize("doctor"), manageAvailability);
export default router;

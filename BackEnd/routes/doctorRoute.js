import express from "express";
import {
  searchDoctors,
  manageAvailability,
  getAllDoctors,
} from "../controllers/doctorController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/search", verifyToken, searchDoctors);
router.patch("/", verifyToken, authorize("doctor"), manageAvailability);
router.get("/", verifyToken,authorize("admin"), getAllDoctors);
export default router;

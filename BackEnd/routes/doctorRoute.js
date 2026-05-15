import express from "express";
import { searchDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", searchDoctors);

export default router;

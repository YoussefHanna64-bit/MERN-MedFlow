import express from "express";
import { getUserbyId, updateProfile } from "../controllers/userController.js";

const router = express.Router();
router.get("/:id", getUserbyId);
router.patch("/:id", updateProfile);

export default router;
import express from "express";
import {
  toggleUserStatus,
  getDashboardStats,
  createStaff,
} from "../controllers/adminController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/", verifyToken, authorize("admin"), createStaff);
router.patch("/:id", verifyToken, authorize("admin"), toggleUserStatus);
router.get("/", verifyToken, authorize("admin"), getDashboardStats);

export default router;

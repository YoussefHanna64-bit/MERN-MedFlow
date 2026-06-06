import express from "express";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead
} from "../controllers/notificationController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getMyNotifications);
router.patch("/allread", markAllAsRead);
router.patch("/:id/read", markAsRead);

export default router;
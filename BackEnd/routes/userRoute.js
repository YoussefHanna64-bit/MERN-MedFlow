import express from "express";
import {
  getUserById,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();
router.get("/:id", verifyToken, getUserById);
router.patch("/:id", verifyToken, updateProfile);
router.get("/", verifyToken, authorize("admin"), getAllUsers);

export default router;

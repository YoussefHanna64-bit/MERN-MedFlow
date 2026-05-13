import express from 'express';
import { getAllUsers, toggleUserStatus } from "../controllers/adminController.js";

const router = express.Router();
router.get("/", getAllUsers);
router.patch("/:id", toggleUserStatus);

export default router;
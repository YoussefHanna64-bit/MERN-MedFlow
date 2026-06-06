import express from 'express';
import { toggleUserStatus } from "../controllers/adminController.js";
import verifyToken from '../middlewares/verifyToken.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();
router.patch("/:id", verifyToken, authorize("admin"), toggleUserStatus);

export default router;
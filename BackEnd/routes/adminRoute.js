import express from 'express';
import { getAllUsers, toggleUserStatus } from "../controllers/adminController.js";
import verifyToken from '../middlewares/verifyToken.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();
router.get("/",verifyToken,authorize("admin"), getAllUsers);
router.patch("/:id", verifyToken, authorize("admin"), toggleUserStatus);

export default router;
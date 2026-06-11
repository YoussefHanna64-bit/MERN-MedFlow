import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import { chatWithAI } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", verifyToken, authorize("patient"), chatWithAI);

export default router;

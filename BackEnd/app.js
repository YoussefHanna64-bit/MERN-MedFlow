import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
  });
});


app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import authRoute from "./routes/authRoute.js";
import httpStatus from "./utils/httpStatus.js";
import { connectDB } from "./config/dbconfig.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);
connectDB();
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use((req, res, next) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    message: "Route not found",
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || httpStatus.ERROR,
    message: err.message || "Internal Server Error",
    code: err.statusCode,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

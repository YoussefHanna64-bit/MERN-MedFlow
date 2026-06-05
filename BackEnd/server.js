import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import authRoute from "./routes/authRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import httpStatus from "./utils/httpStatus.js";
import clinicalRoute from "./routes/clinicalRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import paymentRouter from "./routes/payment.route.js";
import { connectDB } from "./config/dbconfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
app.use(
  cors({
    // origin: "http://localhost:4200",
    origin: "http://localhost:5173",
  }),
);
connectDB();
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/clinical", clinicalRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/payment", paymentRouter)
app.use((req, res, next) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || httpStatus.ERROR,
    message: err.message || "Internal Server Error",
    code: err.statusCode,
  });
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

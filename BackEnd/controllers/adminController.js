import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";
import { createNotification } from "../utils/createNotification.js";

export const createStaff = asyncWrapper(async (req, res, next) => {
  const { name, email, password, phone, role, ...profileData } = req.body;

  if (role !== "doctor" && role !== "admin") {
    return next(
      appError.create(
        "This endpoint is for creating doctors or admins",
        400,
        httpStatus.FAIL,
      ),
    );
  }

  if (role === "doctor") {
    const { specialization, addresses, fees, mainClinic } = profileData;
    if (!specialization || !addresses || !fees || !mainClinic) {
      return next(
        appError.create(
          "Specialization, addresses, fees, and main clinic are required for doctors",
          400,
          httpStatus.FAIL,
        ),
      );
    }
  }

  const isDuplicate = await User.findOne({ email });
  if (isDuplicate) {
    return next(appError.create("User already exists", 409, httpStatus.FAIL));
  }

  const user = await User.create({ name, email, password, phone, role });

  if (role === "doctor") {
    const newDoctor = await Doctor.create({ user: user._id, ...profileData });
  }

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(201).json({
    success: httpStatus.SUCCESS,
    data: { user: userWithoutPassword },
  });
});

export const toggleUserStatus = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(appError.create("No Id Provided", 404, httpStatus.FAIL));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(appError.create("User not found", 404, httpStatus.FAIL));
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { isActive: !user.isActive } },
    { returnDocument: "after", runValidators: false },
  );

  if (!updatedUser) {
    return next(appError.create("Something went wrong", 500, httpStatus.ERROR));
  }
  let notificationTitle = "";
  let notificationMessage = "";

  if (updatedUser.isActive) {
    notificationTitle = "Account Re-activated Clear ✅";
    notificationMessage =
      "Your MedFlow AI account restriction has been lifted by the administration. Full access is restored.";
  } else {
    notificationTitle = "Account Suspension Notice ⚠️";
    notificationMessage =
      "Your account has been temporarily suspended due to a compliance review. Please contact MedFlow support.";
  }

  await createNotification(
    updatedUser._id,
    req.user.id,
    notificationTitle,
    notificationMessage,
    next,
  );
  return res.status(200).json({
    success: httpStatus.SUCCESS,
    message: `User status changed to: ${updatedUser.isActive ? "Active" : "Suspended"}`,
    data: { isActive: updatedUser.isActive },
  });
});

export const getDashboardStats = asyncWrapper(async (req, res, next) => {
  const [totalUsers, totalDoctors, totalBanned] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: "doctor" }),
    User.countDocuments({ isActive: false }),
  ]);

  return res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "Dashboard analytics compiled successfully.",
    data: {
      totalUsers,
      totalDoctors,
      totalBanned,
    },
  });
});

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";
import {createNotification} from "../utils/createNotification.js";

//All the admin can do for now is banning the users instead of deleting them.
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
    notificationMessage = "Your MedFlow AI account restriction has been lifted by the administration. Full access is restored.";
  } else {
    notificationTitle = "Account Suspension Notice ⚠️";
    notificationMessage = "Your account has been temporarily suspended due to a compliance review. Please contact MedFlow support.";
  }

  await createNotification(
    updatedUser._id,    
    req.user.id,       
    notificationTitle,
    notificationMessage,
    next              
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
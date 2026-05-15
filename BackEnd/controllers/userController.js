import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";

export const getUserbyId = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(appError.create("User not found!", 404, httpStatus.FAIL));
  }
  let profile;
  if (user.role === "doctor") {
    profile = await Doctor.findOne({ user: user._id });
  } else {
    profile = await Patient.findOne({ user: user._id });
  }
  res.status(200).json({
    success: true,
    data: { user, profile },
  });
});
export const updateProfile = asyncWrapper(
  ///ADD NULLABILITY CHECK
  async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, role, password, ...profileData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, email, phone } },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return next(appError.create("User not found!", 404, httpStatus.FAIL));
    }

    if (updatedUser.role === "doctor") {
      await Doctor.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: "after", runValidators: true },
      );
    } else if (updatedUser.role === "patient") {
      await Patient.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: "after", runValidators: true },
      );
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  },
);

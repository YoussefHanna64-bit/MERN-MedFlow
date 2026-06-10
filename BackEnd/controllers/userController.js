import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";
import { updateDoctorEmbedding } from "../utils/ragService.js";

export const getUserById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -__v");

  if (!user) {
    return next(appError.create("User not found!", 404, httpStatus.FAIL));
  }

  let profile = null;
  if (user.role === "doctor") {
    profile = await Doctor.findOne({ user: user._id }).select("-__v");
  } else if (user.role === "patient") {
    profile = await Patient.findOne({ user: user._id }).select("-__v");
  }

  res.status(200).json({
    success: httpStatus.SUCCESS,
    data: {
      user,
      profile,
    },
    message: "User profile details retrieved successfully",
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
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: "after", runValidators: true },
      );

      if (updatedDoctor) {
        updateDoctorEmbedding(updatedUser, updatedDoctor);
      }
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
export const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const users = await User.find()
    .select("-password -__v")
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");
  const totalUsers = await User.countDocuments();

  res.status(200).json({
    sucess: true,
    count: users.length,
    pagination: {
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      hasNextPage: page * limit < totalUsers,
    },
    data: { users },
    message: "Users retrieved successfully",
  });
});

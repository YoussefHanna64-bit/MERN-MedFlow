import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from '../utils/appError.js';

export const getUserbyId = asyncWrapper(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(appError.create("User not found!", 404, httpStatus.FAIL))
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
  }
)
export const updateProfile = asyncWrapper(
  ///ADD NULLABILITY CHECK
  async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, role, password, ...profileData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, email, phone } },
      { returnDocument: 'after', runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return next(appError.create("User not found!", 404, httpStatus.FAIL))
    }

    if (updatedUser.role === "doctor") {
      await Doctor.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: 'after', runValidators: true }
      );
    } else if (updatedUser.role === "patient") {
      await Patient.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: 'after', runValidators: true }
      );
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  }
)
export const register = asyncWrapper(
  ///ADD NULLABILITY CHECK
  async (req, res) => {
    //// WHYY ROLE FROM URL???
    const role = req.query.role;
    const { name, email, password, phone, ...profileData } = req.body;
    const user = await User.create({ name, email, password, role, phone });
    if (role === "doctor") {
      await Doctor.create({ user: user._id, ...profileData });
    } else {
      await Patient.create({ user: user._id, ...profileData });
    }
    return res.status(200).json({ success: true, data: { user } });
  }
)

export const login = asyncWrapper(
  async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appError.create("Email and Password are required", 404, httpStatus.FAIL));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(appError.create("User not found!", 404, httpStatus.FAIL))
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(appError.create("Invalid Password!", 400, httpStatus.FAIL))
    }
    return res.status(200).json({ success: true, data: { user } });
  }
)

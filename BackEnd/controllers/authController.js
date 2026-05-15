import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";

export const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password, phone, role, ...profileData } = req.body;

  if (!name || !email || !password || !phone || !role) {
    return next(
      appError.create(
        "Name, email, password, phone, and role are required",
        400,
        httpStatus.FAIL,
      ),
    );
  }

  const isDuplicate = await User.findOne({ email });

  if (isDuplicate) {
    return next(appError.create("User already exists", 409, httpStatus.FAIL));
  }

  const user = await User.create({ name, email, password, phone, role });

  if (role === "doctor") {
    await Doctor.create({ user: user._id, ...profileData });
  } else if (role === "patient") {
    await Patient.create({ user: user._id, ...profileData });
  }

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { user: userWithoutPassword },
  });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      appError.create("Email and password are required", 400, httpStatus.FAIL),
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      appError.create("Invalid email or password", 401, httpStatus.FAIL),
    );
  }

  const isPassR = await user.comparePassword(password);

  if (!isPassR) {
    return next(
      appError.create("Invalid email or password", 401, httpStatus.FAIL),
    );
  }

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { user: userWithoutPassword },
  });
});

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";

//All the admin can do for now is banning the users instead of deleting them.
export const getAllUsers = asyncWrapper(
  async (req, res, next) => {
    const users = await User.find().select("-password");
    if (!users) {
      return next(appError.create("Something went wrong", 500, httpStatus.ERROR))
    }
    return res.status(200)
      .json({ success: httpStatus.SUCCESS, count: users.length, data: { users } });
  }
)
export const toggleUserStatus = asyncWrapper(
  async (req, res, next) => {

    const { id } = req.params;
    if (!id) {
      return next(appError.create("No Id Provided", 404, httpStatus.FAIL))
    }
    const user = await User.findById(id);
    if (!user) {
      return next(appError.create("User not found", 404, httpStatus.FAIL))
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isActive: !user.isActive } },
      { returnDocument: 'after', runValidators: false }
    );
    if (!updatedUser) {
      return next(appError.create("Something went wrong", 500, httpStatus.ERROR))
    }
    return res.status(200).json({
      success: httpStatus.SUCCESS,
      message: `User status changed to: ${updatedUser.isActive ? "Active" : "Suspended"}`,
      data: { isActive: updatedUser.isActive }
    });
  }
)

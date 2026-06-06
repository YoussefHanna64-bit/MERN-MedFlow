import Notification from "../models/Notification.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";

export const getMyNotifications = asyncWrapper(async (req, res, next) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ recipient: userId })
    .populate("sender", "name role")
    .select("-__v")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  const totalNotifications = await Notification.countDocuments({
    recipient: userId,
  });
  const unreadCount = await Notification.countDocuments({
    recipient: userId,
    isRead: false,
  });

  res.status(200).json({
    success: httpStatus.SUCCESS,
    count: notifications.length,
    unreadCount,
    pagination: {
      totalNotifications,
      currentPage: page,
      totalPages: Math.ceil(totalNotifications / limit),
    },
    data: { notifications },
  });
});

export const markAsRead = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const notification = await Notification.findById(id);

  if (!notification) {
    return next(
      appError.create("Notification not found!", 404, httpStatus.FAIL),
    );
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "Notification marked as read successfully",
    data: { notification },
  });
});

export const markAllAsRead = asyncWrapper(async (req, res, next) => {
  const userId = req.user.id;

  await Notification.updateMany(
    { recipient: userId, isRead: false },
    { $set: { isRead: true } },
  );

  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "All notifications marked as read successfully",
  });
});

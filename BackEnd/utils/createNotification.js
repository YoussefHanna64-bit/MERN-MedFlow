import Notification from "../models/Notification.js";
import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";

/**
 * Background Utility to dispatch system notifications.
 * We do NOT wrap this in asyncWrapper because it's a utility, not an Express route handler.
 */
export const createNotification = async (
  recipient,
  sender,
  title,
  message,
  next,
) => {
  try {
    // 1. Collect all missing parameters dynamically
    const missingFields = [];
    if (!recipient) missingFields.push("recipient (User ID)");
    if (!sender) missingFields.push("sender (User ID)");
    if (!title) missingFields.push("title");
    if (!message) missingFields.push("message");
    if (missingFields.length > 0) {
      const errorDescription = `Notification dispatch failed. Missing required field(s): ${missingFields.join(", ")}.`;

      return next(appError.create(errorDescription, 400, httpStatus.FAIL));
    }

    // 3. Save to database if validation passes
    const notification = await Notification.create({
      recipient,
      sender,
      title,
      message,
    });

    return notification;
  } catch (error) {
    return next(error);
  }
};

import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        appError.create("User not authenticated", 401, httpStatus.ERROR),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        appError.create(
          `You do not have permission to access this resource`,
          403,
          httpStatus.ERROR,
        ),
      );
    }

    next();
  };
};

export default authorize;

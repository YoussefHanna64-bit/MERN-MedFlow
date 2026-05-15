import appError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import httpStatus from "../utils/httpStatus.js";

const verifyToken = (req, res, next) => {
  try {
    const authHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
      return next(
        appError.create(
          "No Authorization Headers Provided",
          401,
          httpStatus.ERROR,
        ),
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(
        appError.create(
          "Invalid token format. Missing Bearer",
          401,
          httpStatus.ERROR,
        ),
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(
        appError.create("Invalid token format", 401, httpStatus.ERROR),
      );
    }

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;
    next();
  } catch (err) {
    return next(
      appError.create("Invalid or expired token", 401, httpStatus.ERROR),
    );
  }
};

export default verifyToken;

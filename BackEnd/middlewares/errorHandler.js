import httpStatus from "../utils/httpStatus.js";

const handleDuplicateFields = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];

  return {
    statusCode: 409,
    statusText: httpStatus.FAIL,
    message: field
      ? `Duplicate ${field}: '${value}'. Please use another value!`
      : "Duplicate value already exists",
  };
};

const handleValidationError = (err) => {
  return {
    statusCode: 400,
    statusText: httpStatus.FAIL,
    message: Object.values(err.errors)
      .map((validationError) => validationError.message)
      .join(", "),
  };
};

const handleCastError = (err) => {
  return {
    statusCode: 400,
    statusText: httpStatus.FAIL,
    message: `Invalid ${err.path}: ${err.value}.`,
  };
};

export const errorHandler = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode,
    statusText: err.statusText,
    message: err.message,
  };

  if (err.code === 11000) {
    error = handleDuplicateFields(err);
  }

  if (err.name === "ValidationError") {
    error = handleValidationError(err);
  }

  if (err.name === "CastError") {
    error = handleCastError(err);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    status: error.statusText || httpStatus.ERROR,
    message: error.message || "Internal Server Error",
  });
};

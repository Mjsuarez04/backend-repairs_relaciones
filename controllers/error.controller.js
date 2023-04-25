const AppError = require("../utils/appError");

const handleCatchError22p02 = () =>
  new AppError("some type of data sende doesnot match as expected", 400);
const handleJWTExpiredError = () =>
  new AppError("your token has expired, please login again", 401);

const handleJWTError = () =>
  new AppError("invalid token, please login again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error", err);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.parent) error = handleCatchError22p02();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "JsonWebTokenError") error = handleJWTError();

    /* valid errors */

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;

const AppError = require("../util/AppErrorHanding");

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const handleDuplicateMessage = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. The User has been signup. PLease try use another phone or email`;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  let error;
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  error = { ...err, name: err.__proto__.name, message: err.message };

  if (error.name === "CastError") {
    error = handleCastError(error);
    return sendError(error, res);
  }

  if (error.code === 11000) {
    error = handleDuplicateMessage(error);
    return sendError(error, res);
  }

  if (error.statusCode === 500) {
    error = new AppError(err.message, 400);
    return sendError(error, res);
  }
  if (error.statusCode === 401) {
    error = new AppError(err.message, 400);
    return sendError(error, res);
  }

  sendError(err, res);
};

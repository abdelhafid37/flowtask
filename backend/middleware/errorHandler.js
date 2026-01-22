function errorHandler(error, req, res, next) {
  console.log("Error:", {
    message: error.message,
    stack: error.stack,
    method: req.method,
    path: req.path,
  });

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error" : error.message,
  });
}

module.exports = errorHandler;

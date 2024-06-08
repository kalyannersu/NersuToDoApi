const logger = require("./logger");

const handleError = (res, err, statusCode = 500) => {
  logger.error(err.message || "Server Error");
  res.status(statusCode).json({ message: err.message || "Server Error" });
};

module.exports = handleError;

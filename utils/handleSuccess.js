const logger = require("./logger");

const handleSuccess = (res, data, statusCode = 200) => {
  const defaultMessage = "successfully";
  const message = data.message || defaultMessage;
  const response = { ...data, message };

  logger.info(message);
  res.status(statusCode).json(response);
};

module.exports = handleSuccess;

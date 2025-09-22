exports.sendSuccessResponse = (res, status, data, message) => {
  res.status(status).send({
    success: true,
    data: data,
    err: {},
    message: message,
  });
};

exports.sendErrorResponse = (res, status, error, message) => {
  res.status(status).send({
    success: false,
    data: {},
    err: error,
    message: message,
  });
};

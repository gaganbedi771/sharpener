function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message: message });
}

function sendResponse(res, statusCode, data) {
  res.status(statusCode).json({ success: true, data: data });
}

module.exports = {
  sendResponse,
  sendErrorResponse,
};

const { User } = require("../models/index");
const { sendResponse, sendErrorResponse } = require("../utils/response");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return sendErrorResponse(res, 400, "Bad request. Check inputs");
    }
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return sendErrorResponse(
        res,
        409,
        "Email already exists. Continue to signin page"
      );
    }
    const user = await User.create({ username, email, password });
    return sendResponse(res, 201, "user successfully created");
  } catch (error) {
    console.error(error.message);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return sendErrorResponse(res, 404, "User Not Found");
    }

    if (user.password !== password) {
      return sendErrorResponse(res, 401, "Wrong Password");
    }

    return sendResponse(res, 200, "SignIn Successful");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

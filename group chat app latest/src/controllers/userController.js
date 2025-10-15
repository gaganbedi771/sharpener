const { response } = require("../utils/index");
const userService = require("../services/userService");

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return response.sendErrorResponse(
        res,
        400,
        {},
        "All fields {name,email,phone,password} are required"
      );
    }

    const newUser = await userService.signup({ name, email, phone, password });

    return response.sendSuccessResponse(
      res,
      201,
      newUser,
      "User created successfully"
    );
  } catch (error) {
    console.log("err at controller", error);
    return response.sendErrorResponse(
      res,
      500,
      error,
      "User cannot be created"
    );
  }
};

exports.signin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return response.sendErrorResponse(
        res,
        400,
        {},
        "All fields {email or phone and password} are required"
      );
    }

    const token = await userService.signin({ emailOrPhone, password });

    return response.sendSuccessResponse(res, 200, token, "Signin successfully");
  } catch (error) {
    console.log("err at controller", error);
    return response.sendErrorResponse(res, 500, error, "User cannot signin");
  }
};

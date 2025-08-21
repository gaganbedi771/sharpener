const { User,Expense } = require("../models/index");
const { sendResponse, sendErrorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 401, "Wrong Password");
    }
    const token = jwt.sign({ id: user.id, username: user.username }, "secret");
    
    return sendResponse(res, 200, {
      token: token,
      message: "SignIn Successful",
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

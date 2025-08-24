const {
  User,
  Expense,
  Payment,
  ForgotPasswordRequest,
} = require("../models/index");
const { sendResponse, sendErrorResponse } = require("../utils/response");
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const { Sequelize } = require("sequelize");
const db = require("../utils/db_connection");
const path = require("path");
const transaction = db.transaction();
const sendPasswordResetEmail = require("../utils/sendEmail");
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.TEST_ID,
  process.env.TEST_KEY
);
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

exports.buyPremium = async (req, res) => {
  try {
    const userId = String(req.user.id);
    const payment = await req.user.createPayment({ status: "Pending" });
    const orderId = String(payment.id);
    var request = {
      order_amount: 999,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: userId,
        customer_phone: "9999999999",
      },
      order_meta: {
        return_url:
          "http://localhost:3000/user/updatePremium?order_id={order_id}",
      },
    };

    const response = await cashfree.PGCreateOrder(request);

    console.log("Order created successfully:", response.data);
    return sendResponse(res, 201, response.data);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.updatePremium = async (req, res) => {
  try {
    const id = req.query.order_id;

    console.log("langed in update", id);
    const response = await cashfree.PGOrderFetchPayments(id);
    console.log("Order fetched successfully:", response.data[0].payment_status);
    const payment = await Payment.findByPk(id);
    console.log(payment, "before update");
    payment.status = response.data[0].payment_status;
    await payment.save();
    console.log(payment, "after update");
    return res.redirect(303, "/index.html");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.isPremium = async (req, res) => {
  try {
    const isPremium = await req.user.getPayments({
      where: { status: "Success" },
    });
    // console.log(req.user.id,"here is user id");

    // console.log(isPremium,"aray");
    if (isPremium.length > 0) {
      return sendResponse(res, 200, { isPremium: true });
    }
    return sendResponse(res, 200, { isPremium: false });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.leaderboard = async (req, res) => {
  try {
    // const allExpense=await Expense.findAll({
    //   attributes:[
    //     "userId",
    //     [Sequelize.fn("SUM",Sequelize.col("amount")),"totalExpense"]
    //   ],
    //   include:[
    //     {
    //       model:User,
    //       attributes:["username"]
    //     }
    //   ],
    //   group:["userId"],
    //   order:[[Sequelize.fn("SUM",Sequelize.col("amount")),"DESC"]]

    // });
    const allExpense = await User.findAll({
      attributes: ["username", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });

    return sendResponse(res, 201, allExpense);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return sendErrorResponse(res, 404, "User Not Found");
    }
    const passwordRequest = await ForgotPasswordRequest.create({
      userId: user.id,
    });
    // console.log(passwordRequest.id);
    const response = await sendPasswordResetEmail(
      user.email,
      `http://localhost:3000/user/resetPasswordPage/${passwordRequest.id}`
    );
    // console.log(response, "heeree");
    return sendResponse(res, 200, {
      message: "Kindly check email. Passowrd reset link sent.",
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.resetPasswordPage = async (req, res) => {
  try {
    const { uuid } = req.params;
    res.sendFile(path.join(__dirname, "..", "views", "reset.html"));
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.resetPassword = async (req, res) => {
  const t = await db.transaction();

  try {
    const { uuid } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const passwordRequest = await ForgotPasswordRequest.findByPk(uuid, {
      transaction: t,
    });
    if (!passwordRequest.isActive) {
      throw new Error("Password Request Expired");
    }

    const user = await User.findByPk(passwordRequest.userId, {
      transaction: t,
    });
    console.log(user, passwordRequest);
    user.password = hashedPassword;

    passwordRequest.isActive = false;

    await user.save({ transaction: t });
    await passwordRequest.save({ transaction: t });

    await t.commit();
    sendResponse(res, 200, {
      message: "Password reset successful. Redirecting to SignIn Page",
      redirectTo: "http://localhost:3000/signin.html",
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return sendErrorResponse(res, 500, error.message);
  }
};

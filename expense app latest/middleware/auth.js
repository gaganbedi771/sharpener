const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const tokenData = jwt.verify(token, "secret");
    const id = tokenData.id;
    const user = await User.findByPk(id);
    req.user = user;
    console.log(req.user.id);
    next();
  } catch (error) {
    console.log(error);
    res.send("somethignwent wrong in jwt")
  }
};

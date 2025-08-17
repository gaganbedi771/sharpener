const db = require("../utils/db_connection");
const { User } = require("../models/index");

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    if (!user) {
      return res.send("Error at server end");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.send("No user found");
    }
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

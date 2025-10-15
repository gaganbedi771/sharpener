const { Op } = require("sequelize");
const {User} = require("../models/index");

exports.findByEmailorPhone = async (email, phone) => {
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    return user;
  } catch (error) {
    console.log("error in repository layer", error.message);
    throw error;
  }
};

exports.findByIdAndName = async (id, name) => {
  try {
    const user = await User.findOne({
      where: { id,name},
    });

    return user;
  } catch (error) {
    console.log("error in repository layer", error.message);
    throw error;
  }
};

exports.addUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log("error in repository layer", error.message);
    throw error;
  }
};

const { DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalExpense: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Payment = db.define("payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amountPaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
});

module.exports = Payment;


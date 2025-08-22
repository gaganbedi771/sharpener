const { DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Payment = db.define("payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("Pending","Success","Failure"),
    allowNull: false,
    
  }
});

module.exports = Payment;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Booking = db.define("booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Booking;

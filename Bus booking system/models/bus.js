const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Bus = db.define("bus", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  busNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bus;


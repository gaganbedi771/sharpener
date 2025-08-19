const { DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Player = db.define("player", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthplace: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  career: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  matches: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fifties: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  centuries: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  wickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  average: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = Player;

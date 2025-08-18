const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Courses = db.define("courses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Courses;

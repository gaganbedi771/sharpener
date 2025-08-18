const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const StudentCourses = db.define("studentCourses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = StudentCourses;

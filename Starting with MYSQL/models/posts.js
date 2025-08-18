const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const Post = db.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Post;

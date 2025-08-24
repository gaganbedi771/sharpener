const { DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const ForgotPasswordRequest = db.define("forgotPasswordRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForgotPasswordRequest;

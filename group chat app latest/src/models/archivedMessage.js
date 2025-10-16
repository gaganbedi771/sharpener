"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ArchivedMessage extends Model {}

  ArchivedMessage.init(
    {
      message: DataTypes.TEXT,
      groupId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      fileUrl: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ArchivedMessage",
      timestamps: false,
    }
  );

  return ArchivedMessage;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Group, { foreignKey: "groupId" });
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      fileUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};

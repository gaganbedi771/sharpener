const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db_connection");

const User = db.define("user", {
  id: { type: DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  }
});


module.exports=User;
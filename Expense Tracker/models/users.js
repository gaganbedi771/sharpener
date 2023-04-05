const Sequelize=require("sequelize");
const sequelize=require("../util/database");

const User=sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    premium:{
        type:Sequelize.STRING,
        defaultValue:"no"
    }
})

module.exports=User;
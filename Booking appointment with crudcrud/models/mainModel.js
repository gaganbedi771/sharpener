const Sequelize=require('sequelize');
const sequelize=require("../util/database");

const dbConnection=sequelize.define("details",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.CHAR,
        allowNull:false
    },
    email:{
        type:Sequelize.CHAR,
        unique:true,
        allowNull:false
    }
})

module.exports=dbConnection;
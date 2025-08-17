const {Sequelize,DataTypes}=require('sequelize');
const db=require("../utils/db_connection");

const Appointment=db.define("appointment",{
    id:{
        type:DataTypes.INTEGER,
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
        unique:true,
        allowNull:false
    }
})

module.exports=Appointment;
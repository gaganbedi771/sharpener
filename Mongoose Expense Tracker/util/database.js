//defines how and to which database/schema we are connecting (username,pass,host address)

const {Sequelize}=require("sequelize");

const sequelize=new Sequelize("expense-tracker","root","toor",{dialect:"mysql", host:"localhost"});

module.exports=sequelize;
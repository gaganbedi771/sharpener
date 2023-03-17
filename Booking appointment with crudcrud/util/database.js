const {Sequelize}=require('sequelize');
const sequelize=new Sequelize("booking-appointment","root","toor",{dialect:"mysql",host:"localhost"});

module.exports=sequelize;
const {Sequelize}=require("sequelize");
const sequelize=new Sequelize("sellers-admin-page","root","toor",{
    host:"localhost",
    dialect:"mysql"
})

module.exports=sequelize;
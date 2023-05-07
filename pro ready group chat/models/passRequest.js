const Sequelize = require("sequelize")

const sequelize = require("../util/database");

const passReset=sequelize.define("ForgotPasswordRequests",{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isactive:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=passReset;
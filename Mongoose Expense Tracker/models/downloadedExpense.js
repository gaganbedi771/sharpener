const Sequelize= require("sequelize");
const sequelize=require("../util/database");

const DownloadedExpense=sequelize.define("downloadedExpenses",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    link:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE,
        allowNull:false
    }

})

module.exports=DownloadedExpense;
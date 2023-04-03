const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const Expense=sequelize.define("expenses",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    amount:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
})

module.exports=Expense;
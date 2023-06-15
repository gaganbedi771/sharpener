const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    expense: [{
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
    }]
})

// const Sequelize=require("sequelize");

// const sequelize=require("../util/database");

// const Expense=sequelize.define("expenses",{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         unique:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     amount:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     }
// })

module.exports = mongoose.model("Expense", expenseSchema);
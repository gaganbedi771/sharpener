const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../util/database");


const Archive = sequelize.define("archives", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    groupGroupid:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Archive;
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const StoredFile = sequelize.define('files', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = StoredFile;
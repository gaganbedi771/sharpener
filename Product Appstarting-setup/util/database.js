// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'toor', { dialect: 'mysql', host: 'localhost' });

// module.exports = sequelize;



// const mysql = require("mysql2");

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     database:"node-complete",
//     password:"toor"
// })

// module.exports=pool.promise();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let db;
require("dotenv").config();

const mongoConnect = callback => {
    MongoClient.connect(process.env.MONGO_Connect)
        .then(client => {
            console.log("connected")
            db = client.db("shop");
            callback(client);
        })
        .catch(err => {
            console.log(err);
        })
}

const getDb = () => {
    if (db) {
        return db;
    }
    else {
        throw "No Database Connected";
    }
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

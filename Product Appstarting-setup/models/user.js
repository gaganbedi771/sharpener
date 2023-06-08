// const Sequelize =require("sequelize");
// const sequelize= require("../util/database");

// const User=sequelize.define("user",{

//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//         allowNull:false
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     }
// })

// module.exports =User;

const getdb=require("../util/database").getDb;
const ObjectId=require("mongodb").ObjectId;

class User{
    constructor(username,email){
        this.name=username;
        this.email=email;
}
    save(){
        const db=getdb();
        return db.collection("users").insertOne(this)
    }

    static findById(userId){
        const db=getdb();
        return db.collection("users").findOne({_id: new ObjectId(userId) })
    }

}

module.exports=User;
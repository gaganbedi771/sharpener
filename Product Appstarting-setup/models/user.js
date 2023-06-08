// const Sequelize =require("sequelize");
// const sequelize= require("../util/database");

const { get } = require("../routes/admin");

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

const getdb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save() {
        const db = getdb();
        return db.collection("users").insertOne(this)
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        })
        let newQunatity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQunatity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQunatity;
        }
        else{
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQunatity });
        }


        const updatedCart = {items:updatedCartItems};
        const db = getdb();
        return db.collection("users").updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } })

    }

    static findById(userId) {
        const db = getdb();
        return db.collection("users").findOne({ _id: new ObjectId(userId) })
    }

}

module.exports = User;
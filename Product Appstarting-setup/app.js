const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
require("dotenv").config();
const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// const sequelize = require("./util/database");
// const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("648359ad5bbb659ecbb6e43b")
        .then(user => {
            // req.user = new User(user.name, user.email, user.cart, user._id);
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });


// sequelize.sync()
//     //sequelize.sync({force:true}) //to drop tables if already existed

//     .then((result) => {
//         return User.findByPk(1);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({ name: "max", email: "test@testmail.com" });
//         }
//         return user;

//     })
//     .then(user => {
//         //console.log(user),
//         return user.createCart();


//     })
//     .then(cart => {
//         app.listen(3000)
//     })
//     .catch(err => console.log(err))

// mongoConnect(()=>{

//     app.listen(3000)
//     // console.log(client)
// })

mongoose.connect(process.env.MONGO_Connect)
    .then(result => {
        console.log("connected")
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: "xyz",
                        email: "xyz@gmail.com",
                        cart: {
                            items: []
                        }
                    })
                    user.save();
                }
            })


        app.listen(3000)
    })
    .catch(err => console.log(err));
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const User = require("./models/users");
const Expense = require("./models/expense");
const passRequest = require("./models/ForgotPasswordRequests");

const path = require("path");
const fs = require("fs");

const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const userRoutes = require("./routes/users");
const premiumRoutes = require("./routes/premiumUser");
const resetPassRoutes = require("./routes/resetPass");
const Order = require("./models/order");
const DownloadedExpense = require("./models/downloadedExpense");
const findAll = require("./controllers/controllers");
const error404 = require("./controllers/error");

require("dotenv").config();
const mongoose=require("mongoose");


const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use(userRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);
app.use(resetPassRoutes);
// app.use(error404.error);

app.use((req,res)=>{
    const url=req.url;
    // console.log(url)
    // res.sendFile(path.join(__dirname,`views/signIn.html`));
    res.sendFile(path.join(__dirname,`views/${req.url}`));
    
})

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// passRequest.belongsTo(User);
// User.hasMany(passRequest);

// DownloadedExpense.belongsTo(User);
// User.hasMany(DownloadedExpense);

// findAll.showLeaderBoard();

// sequelize.sync()
//     // sequelize.sync({force:true})
//     .then(result => {
//         app.listen(2000);
//     })
//     .catch(err => {
//         console.log(err);
//     })

mongoose.connect(process.env.MONGO_DB_API)
.then(()=>{
    // app.listen(process.env.portConnect);
    console.log("listening");
    app.listen(2000);
})
.catch(err=>{
    console.log(err);
})
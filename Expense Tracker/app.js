const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const User = require("./models/users");
const Expense = require("./models/expense");

const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const userRoutes = require("./routes/users");

const error404 = require("./controllers/error")

const app = express();

app.use(cors());
app.use(bodyparser.json())

// app.use((req, res, next) => {
//     User.findByPk(1)
//         .then(user => {
//             req.user = user;
//             next();
//         })
//         .catch(err=>console.log(err));
// })

app.use(userRoutes);
app.use(expenseRoutes);
app.use(error404.error);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
    // sequelize.sync({force:true})
    .then(result => {
        app.listen(1000);
    })
    .catch(err => {
        console.log(err);
    })


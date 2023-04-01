const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const userRoutes = require("./routes/users");

const error404=require("./controllers/error")

const app = express();

app.use(cors());
app.use(bodyparser.json())

app.use(userRoutes);
app.use(expenseRoutes);
app.use(error404.error);

sequelize.sync()
// sequelize.sync({force:true})
    .then(result => {
        app.listen(1000);
    })
    .catch(err => {
        console.log(err);
    })


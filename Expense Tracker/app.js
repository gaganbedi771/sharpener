const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const Expense=require("./models/expenseModel");
const sequelize=require("./util/database");
const allRoutes=require("./routes/routes");
const app = express();

app.use(cors());
//app.use(bodyparser.urlencoded({extended:false}));

app.use(bodyparser.json())

app.use(allRoutes);

sequelize.sync()
.then(result=>{
    app.listen(1000);
})
.catch(err=>{
    console.log(err);
})


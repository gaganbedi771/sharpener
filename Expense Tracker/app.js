const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const sequelize = require("./util/database");
const display = require("./routes/displayData");
const add = require("./routes/addData");
const edit = require("./routes/editData");
const del = require("./routes/deleteData");
const signUp = require("./routes/users");

const error404=require("./controllers/error")

const app = express();

app.use(cors());
app.use(bodyparser.json())

app.use(signUp);
app.use(display);
app.use(add);
app.use(edit);
app.use(del);
app.use(error404.error);

sequelize.sync()
// sequelize.sync({force:true})
    .then(result => {
        app.listen(1000);
    })
    .catch(err => {
        console.log(err);
    })


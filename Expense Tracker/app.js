const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const sequelize = require("./util/database");
const allRoutes = require("./routes/routes");
const error404=require("./controllers/error")

const app = express();

app.use(cors());
app.use(bodyparser.json())

app.use(allRoutes);
app.use(error404.error);

sequelize.sync()
    .then(result => {
        app.listen(1000);
    })
    .catch(err => {
        console.log(err);
    })


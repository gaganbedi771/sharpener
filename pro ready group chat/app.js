require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login");
const path = require("path");
const sequelize = require("./util/database");
const User = require("./models/users");

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(loginRoute);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `views/${req.url}`))
})



sequelize.sync()
// sequelize.sync({ force: true })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
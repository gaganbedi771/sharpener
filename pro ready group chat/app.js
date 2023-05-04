require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login");
const chatRoute = require("./routes/chat");
const tokenRoute = require("./routes/token");
const path = require("path");
const sequelize = require("./util/database");
const User = require("./models/users");
const Chat = require("./models/chats");
const Group = require("./models/groups");
const GroupMember = require("./models/groupmembers");

const app = express();
app.use(cors({
    origin:"*"
}));
app.use(bodyparser.json());

app.use(loginRoute);
app.use(chatRoute);
app.use(tokenRoute);


app.use((req, res) => {
    res.sendFile(path.join(__dirname, `views/${req.url}`))
})

Chat.belongsTo(User);
User.hasMany(Chat);

Group.belongsToMany(User,{through:GroupMember});
User.belongsToMany(Group,{through:GroupMember});

Chat.belongsTo(Group);
Group.hasMany(Chat);



sequelize.sync() 
// sequelize.sync({ force: true })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const loginRoute = require("./routes/login");
const chatRoute = require("./routes/chat");
const tokenRoute = require("./routes/token");
const path = require("path");
const sequelize = require("./util/database");
const User = require("./models/user");
const Chat = require("./models/chat");
const Group = require("./models/group");
const GroupMember = require("./models/groupmember");
const PassRequest = require("./models/passRequest");
const StoredFile = require("./models/files");
const Archive = require("./models/archived");

const multer = require("multer");
const handleMultiparts = multer();

const app = express();
app.use(cors({
    origin: "*"
}));

const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});


io.on("connection", socket => {

    socket.on("chat message", (msg, groupId, name) => {
        socket.to(groupId).emit("received message", msg, groupId, name)
    })
    socket.on("join-group", gId => {
        socket.join(gId);
    })
})

io.on("connection", socket => {
    console.log(socket.id, "disconnected");
})

app.use(bodyparser.json());

app.use(loginRoute);
app.use(chatRoute);
app.use(tokenRoute);


app.use((req, res) => {
    res.sendFile(path.join(__dirname, `views/${req.url}`))
})


var CronJob = require('cron').CronJob;
var job = new CronJob(
    '@daily',
    async function () {
        await sequelize.query("INSERT INTO archives SELECT * FROM chats")
        await sequelize.query("DELETE FROM chats")
    },
    null,
    true
);

Chat.belongsTo(User);
User.hasMany(Chat);

Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });

Chat.belongsTo(Group);
Group.hasMany(Chat);

PassRequest.belongsTo(User);
User.hasMany(PassRequest);

Group.hasMany(StoredFile);
StoredFile.belongsTo(Group);


sequelize.sync()
    // sequelize.sync({ force: true })
    .then(async () => {

        User.findAndCountAll()
            .then(async (result) => {
                if (result.count == 0) {
                    await User.create({ name: "Public", email: "null", phone: "public", password: "public" })
                    await Group.create({ groupname: "Public", creator: 1 })
                    await GroupMember.create({ groupGroupid: 1, userId: 1 })
                }
                http.listen(3000);


            })
    })
    .catch(err => console.log(err));
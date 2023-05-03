const Chat = require("../models/chats");
const User = require("../models/users");
const { Sequelize, Op } = require("sequelize");


exports.send_msg = async (req, res, next) => {
    try {
        await req.user.createChat({
            message: req.body.msg
        })

        res.status(200).json({ message: "Msg Sent" });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

exports.getChat = async (req, res, next) => {

    try {
        const allChat = await Chat.findAll({
            attributes: ["id", "message", "userId"],
            include: [{
                model: User,
                attributes: ["name"]
            }],
            group: ["id"]
        });
        res.status(200).json({ message: "Success", allChat: allChat });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.getUpdate = async (req, res, next) => {
    try {
        const lastMsgId = req.params.lastMsgId;
        console.log(lastMsgId,"lastmsgid");

        const updatedChat = await Chat.findAll({
            where: { id: { [Op.gt]: Number(lastMsgId) } },
            attributes: ["id", "message", "userId"],
            include: [{
                model: User,
                attributes: ["name"]
            }],
            group: ["id"]
        });
        res.status(200).json({ message: "Success", updatedChat: updatedChat });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}
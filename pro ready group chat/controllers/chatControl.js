const Chat = require("../models/chat");
const User = require("../models/user");
const Group = require("../models/group");
const GroupMember = require("../models/groupmember");
const Admin = require("../models/admin");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const userServices = require("../services/userServices");
const sequelize = require("../util/database");
const S3Services = require("../services/s3service");
const StoredFile = require("../models/files");
// const cron = require("cron");




exports.send_msg = async (req, res, next) => {

    const groupid = req.user.dataValues.groupId;
    try {
        await req.user.createChat({
            message: req.body.msg,
            groupGroupid: groupid
        })

        res.status(200).json({ message: "Msg Sent", groupId: groupid, name: req.user.name });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

exports.getAllChats = async (req, res, next) => {

    try {
        const allChat = await Chat.findAll({
            attributes: ["id", "message", "userId"],
            where: { groupGroupid: req.user.dataValues.groupId },
            include: [{
                model: User,
                attributes: ["name"]
            }],
            group: ["id"]
        });
        res.status(200).json({ message: "Success", allChat: allChat, myId:req.user.id });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.getUpdate = async (req, res, next) => {
    try {
        const lastMsgId = req.params.lastMsgId;

        const updatedChat = await Chat.findAll({
            where: { id: { [Op.gt]: Number(lastMsgId) }, groupGroupid: req.user.dataValues.groupId },
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

exports.createGroup = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const groupName = req.body.groupName;
        if (!groupName) {
            return res.status(400).json({ message: "Bad parameters" });
        }

        const result = await req.user.createGroup({ groupname: groupName, creator: req.user.id }, { transaction: t })

        await Admin.create({ userId: req.user.id, groupId: result.dataValues.groupid }, { transaction: t })

        t.commit();
        res.status(200).json({ message: "Success", result: result });
    }
    catch (err) {
        t.rollback();
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.getAllGroups = async (req, res, next) => {

    const allGroups = await req.user.getGroups();

    res.status(200).json({ message: "success", allGroups: allGroups });
}

exports.getGroupToken = async (req, res, next) => {
    try {
        const { id, name } = req.user;
        const groupId = req.params.groupId || 1;
        let boolAdmin = false;
        if (groupId != 1) {

            const p1 = new Promise((resolve, reject) => {
                resolve(
                    GroupMember.findOne({ where: { groupGroupid: groupId, userId: id } })
                )
            })
            const p2 = new Promise((resolve, reject) => {
                resolve(
                    Admin.findOne({ where: { userId: id, groupId: groupId } })
                )
            })

            const result = await Promise.all([p1, p2])

            const [isMember, isAdmin] = result;

            if (!isMember) {
                res.status(400).json({ message: "Unauthorised" })
            }


            if (isAdmin) {
                boolAdmin = true;
            }

        }
        res.status(200).json({ message: "success", token: userServices.generateWebToken(id, name, groupId), isAdmin: boolAdmin });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.addmember = async (req, res, next) => {
    const member = req.body.member;

    if (!member) {
        res.status(400).json({ message: "Bad Parameters" });
        return
    }
    try {
        const foundUser = await User.findOne({ where: Sequelize.or({ email: member }, { phone: member }) });

        if (!foundUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        else if (foundUser.id == req.user.id) {
            return res.status(400).json({ message: "You cannot add yourself" });
        }

        const ifexists = await GroupMember.findOne({ where: { groupGroupid: req.user.dataValues.groupId, userId: foundUser.id } });

        if (ifexists) {
            return res.status(400).json({ message: "User already in group" });
        }

        await GroupMember.create({ groupGroupid: req.user.dataValues.groupId, userId: foundUser.id });

        res.status(200).json({ messgae: "Success" })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.viewAllMembers = (async (req, res, next) => {

    try {
        const groupid = req.user.dataValues.groupId;

        const p1 = new Promise((resolve, reject) => {
            resolve(
                req.user.getGroups({
                    where: { groupid: groupid },
                    include: [{
                        model: User,
                        attributes: ["id", "name"]
                    }],
                    group: ["id"]
                })
            )
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(Admin.findAll({ where: { groupId: groupid } }))
        })

        const result = await Promise.all([p1, p2]);

        res.status(200).json({ messgae: "Success", members: result, myId: req.user.id })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

})

exports.addAdmin = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const groupid = req.user.dataValues.groupId;

        await Admin.create({ userId: userid, groupId: groupid });
        res.status(200).json({ message: "Success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.removeMember = async (req, res, next) => {
    const userid = req.params.userid;
    const groupid = req.user.dataValues.groupId;
    const t = await sequelize.transaction();
    try {

        let ifIamAdmin = new Promise((resolve, reject) => {
            resolve(
                Admin.findOne({ where: { groupId: groupid, userId: req.user.id } })
            )
        })

        let ifMemberIsAdmin = new Promise((resolve, reject) => {
            resolve(
                Admin.findOne({ where: { groupId: groupid, userId: userid } })
            )
        })

        const result = await Promise.all([ifIamAdmin, ifMemberIsAdmin]);
        [ifIamAdmin, ifMemberIsAdmin] = result;

        if (req.user.id != userid && !ifIamAdmin) {
            return res.status(401).json({ message: "Unauthorised" })
        }

        await GroupMember.destroy({ where: { groupGroupid: groupid, userId: userid } }, { transaction: t });

        if (ifMemberIsAdmin) {
            await ifAdmin[0].destroy({ transaction: t })
        }
        await t.commit();
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({ message: err });
    }
}



exports.sendFile = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        const file = req.file.buffer;

        const filename = `${req.file.originalname}`;
        const fileUrl = await S3Services.uploadToS3(file, filename);

        const p1 = new Promise((resolve, reject) => {
            resolve(
                StoredFile.create({ userid: req.user.id, url: fileUrl, groupGroupid: req.user.dataValues.groupId },
                    { transaction: t })
            );
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(
                req.user.createChat({ message: fileUrl, groupGroupid: req.user.dataValues.groupId }, { transaction: t })
            )
        })

        const result = await Promise.all([p1, p2])
        await t.commit();
        res.status(200).json({ fileUrl: fileUrl, groupId: req.user.dataValues.groupId, name: req.user.name });
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }
}


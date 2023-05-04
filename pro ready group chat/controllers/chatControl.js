const Chat = require("../models/chats");
const User = require("../models/users");
const Group = require("../models/groups");
const GroupMember = require("../models/groupmembers");
const { Sequelize, Op } = require("sequelize");
const userServices = require("../services/userServices");

exports.send_msg = async (req, res, next) => {
    try {
        await req.user.createChat({
            message: req.body.msg,
            groupid: req.user.dataValues.groupId
        })

        res.status(200).json({ message: "Msg Sent" });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

exports.getAllChats = async (req, res, next) => {
    console.log(req.user.dataValues.groupId,"findchats gid");
    try {
        const allChat = await Chat.findAll({
            attributes: ["id", "message", "userId"],
            where: { groupid: req.user.dataValues.groupId },
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
        console.log(lastMsgId, "lastmsgid");

        const updatedChat = await Chat.findAll({
            where: { id: { [Op.gt]: Number(lastMsgId) }, groupid: req.user.dataValues.groupId },
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
    try {
        const groupName = req.body.groupName;
        if (!groupName) {
            return res.status(400).json({ message: "Bad parameters" });
        }

        const result = await req.user.createGroup({ groupname: groupName, creator: req.user.id });
        res.status(200).json({ message: "Success", result: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.getAllGroups = async (req, res, next) => {

    const allGroups = await req.user.getGroups();

    // const updatedChat = await Group.findAll({
    //     where: { id: { [Op.gt]: Number(lastMsgId) }, groupid:0 },
    //     attributes: ["id", "message", "userId"],
    //     include: [{
    //         model: User,
    //         attributes: ["name"]
    //     }],
    //     group: ["id"]
    // });

    res.status(200).json({ message: "success", allGroups: allGroups });
}

exports.getPublicToken = (req, res, next) => {
    const { id, name } = req.user;
    const groupId = req.params.groupId || 0;
    console.log(groupId);
    res.status(200).json({ message: "success", token: userServices.generateWebToken(id, name, groupId) });
}

exports.addmember = async (req, res, next) => {
    const member=req.body.member;
    if(!member){
        res.status(400).json({message:"Bad Parameters"});
        return
    }
    try{
        const foundUser=await User.findOne({where:Sequelize.or({email:member},{phone:member})});
        
        if(!foundUser){
            return res.status(404).json({message:"User Not Found"});
        }
        else if(foundUser.id==req.user.id){
            return res.status(400).json({message:"You cannot add yourself"});
        }
        const ifexists=await GroupMember.findOne({where:{groupGroupid:req.user.dataValues.groupId, userId: foundUser.id }});

        if(ifexists){
            return res.status(400).json({message:"User already in group"});
        }
        // console.log(req.user.dataValues.groupId,"thisssssss");
        // console.log(foundUser.id);
        await GroupMember.create({groupGroupid:req.user.dataValues.groupId, userId: foundUser.id });
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: err });
    }
}
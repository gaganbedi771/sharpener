// const Chat=require("../models/chats");
const User=require("../models/users");
// const {Sequelize}=require("sequelize");

exports.send_msg = async (req, res, next) => {
try{
    await req.user.createChat({
        message:req.body.msg
    })

    res.status(200).json({message:"Msg Sent"});
    
}
catch(err){
    console.log(err);
    res.status(500).json({message:err});
}
   
}
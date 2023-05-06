const User = require("../models/user");
const GroupMember = require("../models/groupmember");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {

    try {
        const token = req.header("Authorization");
        const { id, name, groupId } = jwt.verify(token, process.env.JWT_KEY);
        const userFound = await User.findOne({ where: { id: id, name: name },
        attributes:["id","name","email","phone"] });
        // userFound.dataValues.groupId = req.params.groupId || groupId;
        // console.log(userFound);
        req.user = userFound;
        // if (groupId != 0) {
        //     const gId = await GroupMember.findOne({ where: { userId: userFound.id, groupGroupid: groupId } })

        //     req.user.groupId = gId.groupGroupid;
        // }
        
        req.user.dataValues.groupId = req.params.groupId || groupId;
        // console.log(req.user.dataValues);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

module.exports = authenticate;
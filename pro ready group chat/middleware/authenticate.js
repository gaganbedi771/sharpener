const User = require("../models/users");
const GroupMember = require("../models/groupmembers");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {

    try {
        const token = req.header("Authorization");
        const { id, name, groupId } = jwt.verify(token, process.env.JWT_KEY);
        const userFound = await User.findOne({ where: { id: id, name: name } });
        req.user = userFound;
        // if (groupId != 0) {
        //     const gId = await GroupMember.findOne({ where: { userId: userFound.id, groupGroupid: groupId } })

        //     req.user.groupId = gId.groupGroupid;
        // }
        req.user.dataValues.groupId = req.params.groupId || groupId;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

module.exports = authenticate;
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    console.log("authenticatipon proceiing")
    const token = req.header("Authorization");
    const { id, name } = jwt.verify(token, process.env.JWT_KEY);

    try {
        const userFound = await User.findOne({ where: { id: id, name: name } });
        req.user = userFound;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

module.exports = authenticate;